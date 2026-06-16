New-Item -ItemType Directory -Force -Path src/assets | Out-Null
$urls = @{
  'logo.png' = 'https://sc01.alicdn.com/kf/Sbbe01334cdea4ef4a206247c4ece57c6w.png'
  'hero-eye-precision.png' = 'https://sc01.alicdn.com/kf/S050c89d7be8542659df5f35725292220V.png'
  'hero-eye-3d.png' = 'https://sc01.alicdn.com/kf/S8e2da023e51e4dad985c3eb3b0bddfc2T.png'
  'hero-elder.png' = 'https://sc01.alicdn.com/kf/S3857d578b6504e3bba4a67e4234939f5J.png'
  'hero-surgery.png' = 'https://sc01.alicdn.com/kf/Sebf5417ce43344deb38a4331e23cfa2bB.png'
  'hero-mountains.png' = 'https://sc01.alicdn.com/kf/Sf985fc1becac472e94a67eb5b1aa471bv.png'
  'hero-retina.png' = 'https://sc01.alicdn.com/kf/Sa25656755a43478d8a946907bb06f5faJ.png'
}
foreach ($k in $urls.Keys) {
  Write-Host "Downloading $k..."
  Invoke-WebRequest -Uri $urls[$k] -OutFile "src/assets/$k" -UseBasicParsing
}
Get-ChildItem src/assets | Format-Table Name,Length
