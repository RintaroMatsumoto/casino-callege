$BASE = "http://100.107.17.85:18188"
$OUT = "C:\Users\GoldRush\Documents\MyProject\CasinoCallege\casino-callege-app\public\blog-images"
New-Item -ItemType Directory -Path "$OUT" -Force | Out-Null

$CHECKPOINT = "RealVisXL_V5.0_fp16.safetensors"
$NEGATIVE = "(worst quality:1.2), (low quality:2), (normal quality:2), cartoon, anime, illustration, painting, 3d render, cgi, underage, child, big eyes, oversaturated, hdr, plastic skin, airbrushed, poor anatomy, bad hands, mutated fingers, watermark, signature, text, logo, existing celebrity"

function Gen-One {
    param($Name, $Prompt, $Seed, $W, $H)
    Write-Host "[$Name] " -NoNewline
    $wf = @{
        prompt = @{
            "4" = @{class_type="CheckpointLoaderSimple"; inputs=@{ckpt_name=$CHECKPOINT}}
            "6" = @{class_type="CLIPTextEncode"; inputs=@{text=$Prompt; clip=@("4", 1)}}
            "7" = @{class_type="CLIPTextEncode"; inputs=@{text=$NEGATIVE; clip=@("4", 1)}}
            "5" = @{class_type="EmptyLatentImage"; inputs=@{width=$W; height=$H; batch_size=1}}
            "3" = @{class_type="KSampler"; inputs=@{seed=$Seed; steps=30; cfg=4.0; sampler_name="dpmpp_3m_sde"; scheduler="karras"; denoise=1.0; model=@("4", 0); positive=@("6", 0); negative=@("7", 0); latent_image=@("5", 0)}}
            "8" = @{class_type="VAEDecode"; inputs=@{samples=@("3", 0); vae=@("4", 2)}}
            "9" = @{class_type="SaveImage"; inputs=@{filename_prefix="gen"; images=@("8", 0)}}
        }
    }
    try {
        $r = Invoke-RestMethod -Uri "$BASE/prompt" -Method POST -Body ($wf | ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30
        $p_id = $r.prompt_id
    } catch { Write-Host "QUEUE FAIL: $_"; return }
    Write-Host "queued" -NoNewline
    for ($j = 0; $j -lt 60; $j++) {
        Start-Sleep -Seconds 3
        try {
            $h = Invoke-RestMethod -Uri "$BASE/history/$p_id" -TimeoutSec 10
            if ($h.$p_id) {
                $st = $h.$p_id.status.status_str
                if ($st -eq "success") {
                    $h.$p_id.outputs.PSObject.Properties | ForEach-Object {
                        foreach ($img in $_.Value.images) {
                            $url = "$BASE/view?filename=$($img.filename)&subfolder=$($img.subfolder)&type=$($img.type)"
                            $ext = [System.IO.Path]::GetExtension($img.filename)
                            Invoke-WebRequest -Uri $url -OutFile "$OUT/$Name$ext" -TimeoutSec 30
                            Write-Host " -> $Name$ext"
                        }
                    }; return
                } elseif ($st -eq "error") { Write-Host " -> ERROR"; return }
            }
        } catch { }
        if ($j % 10 -eq 9) { Write-Host "." -NoNewline }
    }
    Write-Host " -> TIMEOUT"
}
$PROMPTS = @(
    @{name="what-is-dealer-job"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), casino dealer in uniform working at blackjack table, professional casino employee, action shot, green felt, chips and cards, warm dramatic lighting, cinematic photography, shallow depth of field, sharp focus"; seed=200000; w=1216; h=832}
    @{name="casino-dealer-guide-2026"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), person studying casino dealing at desk, books and cards scattered, laptop open showing casino guide, educational atmosphere, warm cozy lighting, professional study scene"; seed=200001; w=1216; h=832}
    @{name="dealer-is-it-tough"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), casino dealer wiping forehead after long shift, tired expression, late night casino scene, dramatic shadows, empty casino background, intense atmosphere"; seed=200002; w=1216; h=832}
    @{name="dealer-women-career"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), female casino dealer smiling while dealing cards, professional and confident, inclusive workplace, elegant casino interior, warm golden lighting"; seed=200003; w=1216; h=832}
    @{name="dealer-english-necessity"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), open English textbook and casino chips on desk, language dictionary, study materials for casino dealer, educational scene, warm lighting"; seed=200004; w=1216; h=832}
    @{name="dealer-career-change-30s"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), person in suit standing at crossroads between office building and casino entrance, career change concept, dramatic golden hour lighting"; seed=200005; w=1216; h=832}
    @{name="dealer-salary-million-myth"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), stack of US dollars and casino chips on table, salary and money concept, financial planning theme, professional still life, warm lighting"; seed=200006; w=1216; h=832}
    @{name="dealer-hourly-wage-comparison"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), world map with casino chips placed on different countries, global salary comparison, analytical business concept, professional photography"; seed=200007; w=1216; h=832}
    @{name="dealer-career-path-statistics"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), casino career progression visualized as stairway, dealer to pit boss to manager, chips on each step, warm dramatic lighting"; seed=200008; w=1216; h=832}
    @{name="dealer-learning-time-analysis"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), wall clock and study materials on desk, progress chart, casino dealer training books, educational scene, focused atmosphere"; seed=200009; w=1216; h=832}
    @{name="dealer-interview-secrets"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), job interview at casino, manager in suit interviewing candidate, professional office setting, warm professional lighting, confident atmosphere"; seed=200010; w=1216; h=832}
    @{name="dealer-no-experience-guide"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), beginner practicing card dealing at home, learning materials scattered, playing cards on table, self-study scene, warm home lighting"; seed=200011; w=1216; h=832}
    @{name="dealer-personality-guide"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), confident person with warm smile, casino background blurred, professional portrait, traits of successful dealer, professional photography"; seed=200012; w=1216; h=832}
    @{name="dealer-salary-guide"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), paycheck and casino chips on table, salary slip and calculator, financial planning for dealer career, professional still life"; seed=200013; w=1216; h=832}
    @{name="dealer-school-certification-guide"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), diploma certificate and casino chips on desk, professional certification achievement, warm congratulatory lighting"; seed=200014; w=1216; h=832}
    @{name="dealer-certification-faq"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), official documents and casino license application, papers on desk, professional legal documents, organized desk scene"; seed=200015; w=1216; h=832}
    @{name="dealer-blackjack"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), blackjack dealer in action, dealing cards across green felt table, casino chips visible, professional casino employee, warm dramatic lighting"; seed=200016; w=1216; h=832}
    @{name="blackjack-dealer-basics"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), close-up of dealer hands demonstrating blackjack dealing technique, cards held professionally, green felt background, sharp focus on hands"; seed=200017; w=1216; h=832}
    @{name="blackjack-basic-strategy"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), blackjack strategy chart on green felt table, playing cards arranged by hand values, educational casino scene, warm lighting"; seed=200018; w=1216; h=832}
    @{name="basic-strategy-japan-data"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), data analytics screen showing blackjack statistics graphs, casino chips in foreground, analytical business technology scene"; seed=200019; w=1216; h=832}
    @{name="card-counting-for-beginners"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), card player concentrating intensely at blackjack table, counting cards, casino surveillance camera visible above, tense dramatic atmosphere"; seed=200020; w=1216; h=832}
    @{name="blackjack-hand-signals-complete"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), close-up of dealer hand signals on blackjack table, hand gestures for hit stand double, professional dealer demonstration, clear sharp focus"; seed=200021; w=1216; h=832}
    @{name="roulette-payout-master"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), roulette wheel close-up with ball in pocket, green felt layout with chips below, casino game action, warm dramatic lighting, sharp focus"; seed=200022; w=1216; h=832}
    @{name="roulette-winning-strategy-truth"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), roulette table with betting layout, chips placed on various numbers, casino scene, dramatic lighting, strategic atmosphere"; seed=200023; w=1216; h=832}
    @{name="craps-basics-complete"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), craps table with dice and chips, green felt betting layout, casino action shot, players around table, warm dramatic lighting"; seed=200024; w=1216; h=832}
    @{name="craps-rules-simple"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), craps table layout close-up, pass line and odds bets visible, dice in focus, casino felt texture, professional game photography"; seed=200025; w=1216; h=832}
    @{name="dealer-sees-everything"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), surveillance camera in casino ceiling overlooking table games, security monitoring, dramatic low angle shot, mysterious atmosphere, neon lights"; seed=200026; w=1216; h=832}
    @{name="baccarat-tableau-master"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), baccarat table with shoe and cards, elegant casino setting, luxury atmosphere, warm golden lighting, professional photographic composition"; seed=200027; w=1216; h=832}
    @{name="casino-rules-complete-guide"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), collection of casino table games visible on grand casino floor, multiple games, elegant interior, warm dramatic lighting, wide angle shot"; seed=200028; w=1216; h=832}
    @{name="casino-terminology-100"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), open glossary book with casino terms, chips and cards beside open book, study desk scene, warm educational lighting"; seed=200029; w=1216; h=832}
    @{name="casino-glossary-complete"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), dictionary and reference books about casino industry, reading glasses on book, professional study desk, warm cozy library lighting"; seed=200030; w=1216; h=832}
    @{name="chip-counting-practice"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), hands counting casino chips of various denominations, chip stacks arranged neatly, green felt background, professional dealer practice"; seed=200031; w=1216; h=832}
    @{name="card-shuffling-methods"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), dealer hands performing riffle shuffle, cards arcing between hands, dynamic action shot, casino table background, professional dealing technique"; seed=200032; w=1216; h=832}
    @{name="dealer-speed-training"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), dealer dealing cards rapidly, motion blur showing speed, focus on fast-moving hands, professional action shot, casino practice room"; seed=200033; w=1216; h=832}
    @{name="osaka-ir-dealer-demand"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), osaka city skyline at night with waterfront construction, yumeshima island development, futuristic cityscape, dramatic evening lighting"; seed=200034; w=1216; h=832}
    @{name="japan-ir-reality"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), architectural rendering model of mgm osaka resort, modern casino building design, luxury hotel complex, professional architectural photography"; seed=200035; w=1216; h=832}
    @{name="casino-revenue-structure"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), casino counting room with money counting machines, stacks of bills and chips, secure vault atmosphere, professional business photography"; seed=200036; w=1216; h=832}
    @{name="casino-industry-japan-vs-world"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), japan and world map with casino chips representing different markets, global gaming industry concept, professional business photography"; seed=200037; w=1216; h=832}
    @{name="dealer-school-curriculum-inside"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), educational whiteboard with dealer curriculum written, classroom for casino dealer training, learning environment, bright professional lighting"; seed=200038; w=1216; h=832}
    @{name="casino-first-time-experience"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), person entering las vegas casino for first time, amazed expression, bright lights and slot machines, overwhelming visual experience, cinematic shot"; seed=200039; w=1216; h=832}
    @{name="casino-high-roller-story"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), high roller betting large stacks of black chips at exclusive table, private casino room, elegant luxury setting, dramatic lighting, cinematic composition"; seed=200040; w=1216; h=832}
    @{name="casino-superstitions-and-legends"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), mysterious casino scene with lucky charms on table, rabbit foot and four leaf clover, atmospheric fog and neon lights, cinematic moody shot"; seed=200041; w=1216; h=832}
    @{name="casino-inside-after-hours"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), empty casino floor after closing time, dimmed lights, chairs up on tables, cleaning crew in distance, mysterious quiet atmosphere, dramatic shadows"; seed=200042; w=1216; h=832}
    @{name="dealers-mind-one-hand"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), close-up of casino dealer face with intense concentration, cards in hands, casino background blurred, dramatic portrait lighting, cinematic composition"; seed=200043; w=1216; h=832}
    @{name="rookie-dealer-first-day"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), nervous new dealer in uniform at first table, senior dealer observing nearby, casino training moment, supportive atmosphere, warm lighting"; seed=200044; w=1216; h=832}
    @{name="house-edge-complete-comparison"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), casino table with house edge percentages overlaid digitally, analytical concept, chips and cards, business intelligence theme, blue and gold lighting"; seed=200045; w=1216; h=832}
)
foreach ($p in $PROMPTS) {
    Gen-One -Name $p.name -Prompt $p.prompt -Seed $p.seed -W $p.w -H $p.h
}

Write-Host "
Done! Generated $($PROMPTS.Count) images."
