# Gera bttelhas-deploy.zip (conteúdo de dist/) com compressão máxima para FTP / Gerenciador de arquivos.
# Uso: .\scripts\package-hostgator.ps1 (na raiz do repositório)
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
npm run build
$zip = Join-Path (Get-Location) 'bttelhas-deploy.zip'
if (Test-Path $zip) { Remove-Item $zip -Force }
$dist = Join-Path (Get-Location) 'dist'
Compress-Archive -Path (Join-Path $dist '*') -DestinationPath $zip -CompressionLevel Optimal -Force
$mb = [math]::Round((Get-Item $zip).Length / 1MB, 2)
Write-Host "OK: $zip ($mb MB)"
