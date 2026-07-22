# deploy.ps1 - Redeploy Beyond Numbers to the AWS server in one command.
# Usage:  .\deploy.ps1   (run from C:\Users\AI.SN\Desktop\sAI\beyond_numbers)

$ErrorActionPreference = 'Stop'

# --- Config ------------------------------------------------------------------
$KeyPath   = "C:\Users\AI.SN\Desktop\sAI\moneypenny-key.pem"
$Server    = "ubuntu@3.107.206.82"
$LocalDist = "C:\Users\AI.SN\Desktop\sAI\beyond_numbers\dist"
$Staging   = "/home/ubuntu/bn-dist"
$WebRoot   = "/var/www/beyond-numbers"
$SiteUrl   = "http://3.107.206.82:8080"

# Remote deploy commands (run over SSH, in order).
$RemoteCmd = "sudo rm -rf $WebRoot/* && sudo cp -r $Staging/. $WebRoot/ && sudo chown -R www-data:www-data $WebRoot && sudo chmod -R a+rX $WebRoot"

# --- 1. Build ----------------------------------------------------------------
Write-Host ""
Write-Host "Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed - aborting." -ForegroundColor Red
    exit 1
}

# --- 2. Clean remote staging -------------------------------------------------
# Remove any existing staging folder first so scp recreates it cleanly with the
# files at the root (otherwise scp nests it as bn-dist/dist and serves old files).
Write-Host ""
Write-Host "Cleaning remote staging..." -ForegroundColor Cyan
ssh -i $KeyPath $Server "rm -rf $Staging"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote staging cleanup (ssh) failed - aborting." -ForegroundColor Red
    exit 1
}

# --- 3. Upload ---------------------------------------------------------------
Write-Host ""
Write-Host "Uploading..." -ForegroundColor Cyan
scp -i $KeyPath -r $LocalDist "${Server}:${Staging}"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Upload (scp) failed - aborting." -ForegroundColor Red
    exit 1
}

# --- 4. Deploy on server -----------------------------------------------------
Write-Host ""
Write-Host "Deploying on server..." -ForegroundColor Cyan
ssh -i $KeyPath $Server $RemoteCmd
if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote deploy (ssh) failed - aborting." -ForegroundColor Red
    exit 1
}

# --- Done --------------------------------------------------------------------
Write-Host ""
Write-Host "Done! Hard-refresh http://3.107.206.82:8080 with Ctrl+F5" -ForegroundColor Green
