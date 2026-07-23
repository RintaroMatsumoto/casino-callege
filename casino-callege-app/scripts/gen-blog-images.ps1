$BASE = "http://100.107.17.85:18188"
$OUT = "C:\Users\GoldRush\Documents\MyProject\CasinoCallege\casino-callege-app\public"
New-Item -ItemType Directory -Path "$OUT\blog-images" -Force | Out-Null

$CHECKPOINT = "RealVisXL_V5.0_fp16.safetensors"
$NEGATIVE = "(worst quality:1.2), (low quality:2), (normal quality:2), cartoon, anime, illustration, painting, 3d render, cgi, underage, child, big eyes, oversaturated, hdr, plastic skin, airbrushed, poor anatomy, bad hands, mutated fingers, watermark, signature, text, logo, existing celebrity"

$PROMPTS = @(
    @{name="blog-images/poker-game"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), poker table with chips and cards, texas holdem game in progress, green felt, professional casino setting, blurred background with players, warm dramatic lighting, cinematic photography, shallow depth of field"; seed=100200; w=1216; h=832}
    @{name="blog-images/english-study"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), open textbook with casino terminology, notebook and pen, study desk, warm lighting, cozy atmosphere, professional educational photography, shallow depth of field, bookshelf background"; seed=100201; w=1216; h=832}
    @{name="blog-images/casino-career-path"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), professional person in suit walking through casino floor, confident posture, luxury casino interior background, slot machines and table games, dramatic lighting, cinematic photography, professional atmosphere"; seed=100202; w=832; h=1216}
    @{name="og-image"; prompt="(masterpiece, best quality:1.2), 8k, RAW photo, (Realistic, hyper realistic, photorealistic:1.3), elegant casino interior wide shot, chandeliers, green felt tables, gold accents, luxury atmosphere, warm golden lighting, professional architectural photography, cinematic, spacious, grand entrance, no people, sharp focus"; seed=100300; w=1200; h=630}
)

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

foreach ($p in $PROMPTS) {
    Gen-One -Name $p.name -Prompt $p.prompt -Seed $p.seed -W $p.w -H $p.h
}

Write-Host "`nDone!"
