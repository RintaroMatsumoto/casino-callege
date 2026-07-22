$BASE = "http://100.107.17.85:18188"
$OUT = "C:\Users\GoldRush\Documents\MyProject\CasinoCallege\casino-callege-app\public\blog-images"
New-Item -ItemType Directory -Path $OUT -Force | Out-Null

$CHECKPOINT = "RealVisXL_V5.0_fp16.safetensors"
$NEGATIVE = "(worst quality:1.2), (low quality:2), (normal quality:2), cartoon, anime, illustration, painting, 3d render, cgi, underage, child, big eyes, oversaturated, hdr, plastic skin, airbrushed, poor anatomy, bad hands, mutated fingers, watermark, signature, text, logo, existing celebrity"

$PROMPTS = @(
    @{name="dealer-blackjack"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), professional casino dealer in black vest and bow tie, standing at blackjack table, green felt table, cards in hands, smiling at camera, casino interior background, soft warm lighting, cinematic lighting, bokeh, professional atmosphere, japanese male dealer, 30 years old"; seed=100100}
    @{name="roulette-wheel"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), close up of roulette wheel spinning, green felt table, casino chips scattered, gold accents, dramatic lighting, sharp focus on wheel, luxury casino atmosphere, cinematic, bokeh background"; seed=100101}
    @{name="casino-chips-cards"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), casino chips stacked on green felt table, playing cards scattered around, poker chips in various colors red white blue black, soft overhead lighting, shallow depth of field, professional casino photography, elegant composition"; seed=100102}
    @{name="blackjack-21"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), blackjack hand showing ace and king 21, green felt table, casino atmosphere, chips nearby, dramatic lighting, shallow depth of field, professional photography, cinematic"; seed=100103}
    @{name="craps-dice"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), two white dice on green craps table, casino background blurred, dramatic lighting, sharp focus on dice, numbers visible, professional casino photography, cinematic"; seed=100104}
    @{name="casino-interior"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), wide shot of luxury casino interior, slot machines and table games, chandeliers, elegant atmosphere, warm golden lighting, professional photography, cinematic, rich colors, people playing"; seed=100105}
    @{name="baccarat-table"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), baccarat table with cards dealt, green felt, player and banker positions, squeeze cards, casino setting, soft dramatic lighting, professional photography, cinematic atmosphere"; seed=100106}
)

function Gen-One {
    param($Name, $Prompt, $Seed)
    Write-Host "[$Name] " -NoNewline

    $wf = @{
        prompt = @{
            "4" = @{class_type="CheckpointLoaderSimple"; inputs=@{ckpt_name=$CHECKPOINT}}
            "6" = @{class_type="CLIPTextEncode"; inputs=@{text=$Prompt; clip=@("4", 1)}}
            "7" = @{class_type="CLIPTextEncode"; inputs=@{text=$NEGATIVE; clip=@("4", 1)}}
            "5" = @{class_type="EmptyLatentImage"; inputs=@{width=832; height=1216; batch_size=1}}
            "3" = @{class_type="KSampler"; inputs=@{seed=$Seed; steps=30; cfg=4.0; sampler_name="dpmpp_3m_sde"; scheduler="karras"; denoise=1.0; model=@("4", 0); positive=@("6", 0); negative=@("7", 0); latent_image=@("5", 0)}}
            "8" = @{class_type="VAEDecode"; inputs=@{samples=@("3", 0); vae=@("4", 2)}}
            "9" = @{class_type="SaveImage"; inputs=@{filename_prefix="blog_$Name"; images=@("8", 0)}}
        }
    }

    try {
        $r = Invoke-RestMethod -Uri "$BASE/prompt" -Method POST -Body ($wf | ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30
        $p_id = $r.prompt_id
    } catch {
        Write-Host "QUEUE FAIL: $_"
        return
    }

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
                            Invoke-WebRequest -Uri $url -OutFile "$OUT/$Name.png" -TimeoutSec 30
                            Write-Host " -> SAVED ($Name.png)"
                        }
                    }
                    return
                } elseif ($st -eq "error") {
                    Write-Host " -> ERROR"
                    return
                }
            }
        } catch { }
        if ($j % 10 -eq 9) { Write-Host "." -NoNewline }
    }
    Write-Host " -> TIMEOUT"
}

foreach ($p in $PROMPTS) {
    Gen-One -Name $p.name -Prompt $p.prompt -Seed $p.seed
}

Write-Host "`nDone! All images in: $OUT"
