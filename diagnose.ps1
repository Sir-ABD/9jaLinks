# Error Diagnosis Script

Write-Host "=== 9jaLinks Service Diagnostics ===" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB connection string is set
Write-Host "1. Checking MongoDB Configuration..." -ForegroundColor Yellow
$authEnv = Get-Content "services\auth\.env" -Raw
if ($authEnv -match "MONGO_URI=(.+)") {
    Write-Host "   ✓ Auth Service MongoDB URI found" -ForegroundColor Green
} else {
    Write-Host "   ✗ Auth Service MongoDB URI missing!" -ForegroundColor Red
}

# Check if shared packages are built
Write-Host ""
Write-Host "2. Checking Shared Packages..." -ForegroundColor Yellow
if (Test-Path "packages\logger\dist\index.js") {
    Write-Host "   ✓ Logger package built" -ForegroundColor Green
} else {
    Write-Host "   ✗ Logger package not built!" -ForegroundColor Red
    Write-Host "   Run: npm run build --workspace=@9jalinks/logger" -ForegroundColor Yellow
}

if (Test-Path "packages\common\dist\index.js") {
    Write-Host "   ✓ Common package built" -ForegroundColor Green
} else {
    Write-Host "   ✗ Common package not built!" -ForegroundColor Red
    Write-Host "   Run: npm run build --workspace=@9jalinks/common" -ForegroundColor Yellow
}

# Check if ts-node is installed
Write-Host ""
Write-Host "3. Checking Dependencies..." -ForegroundColor Yellow
if (Test-Path "services\auth\node_modules\ts-node") {
    Write-Host "   ✓ ts-node installed in auth service" -ForegroundColor Green
} else {
    Write-Host "   ✗ ts-node not found in auth service!" -ForegroundColor Red
}

# Check Node processes
Write-Host ""
Write-Host "4. Checking Running Processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "   ✓ Found $($nodeProcesses.Count) Node.js processes running" -ForegroundColor Green
} else {
    Write-Host "   ✗ No Node.js processes found" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Diagnostic Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please share the error messages from your terminals." -ForegroundColor Yellow
Write-Host "Common errors and solutions:" -ForegroundColor Cyan
Write-Host "  - 'Cannot find module @9jalinks/logger' → Run build commands above" -ForegroundColor White
Write-Host "  - 'MongoDB connection error' → Check MongoDB Atlas is accessible" -ForegroundColor White
Write-Host "  - 'Port already in use' → Kill existing Node processes" -ForegroundColor White
