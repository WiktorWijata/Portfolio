<#
.SYNOPSIS
    Build and run Portfolio.Web locally in Docker
.PARAMETER Build
    Rebuild Docker image before starting
.PARAMETER Clean
    Remove containers and volumes before starting
#>

param(
    [switch]$Build,
    [switch]$Clean
)

$ErrorActionPreference = "Stop"

# Get path to docker-compose.yml (one level up from Scripts)
$ComposeFile = Join-Path $PSScriptRoot "..\docker-compose.yml"

Write-Host "Portfolio.Web - Local Docker Environment" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Check if Docker is running
    Write-Host "[CHECK] Checking Docker..." -ForegroundColor Yellow
    docker version | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Docker is not running. Please start Docker Desktop." -ForegroundColor Red
        exit 1
    }
    Write-Host "[OK] Docker is running" -ForegroundColor Green
    Write-Host ""

    # Clean if requested
    if ($Clean) {
        Write-Host "[CLEAN] Cleaning up..." -ForegroundColor Yellow
        docker compose -f $ComposeFile down -v
        docker rmi portfolio-web-local 2>$null | Out-Null
        Write-Host "[OK] Cleaned" -ForegroundColor Green
        Write-Host ""
    }

    # Build if requested
    if ($Build) {
        Write-Host "[BUILD] Building Docker image..." -ForegroundColor Yellow
        Write-Host "This may take 5-10 minutes on first build..." -ForegroundColor Gray
        Write-Host ""

        docker compose -f $ComposeFile build --no-cache
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "[ERROR] Build failed!" -ForegroundColor Red
            exit 1
        }
        Write-Host ""
        Write-Host "[OK] Build completed!" -ForegroundColor Green
        Write-Host ""
    }

    # Start container
    Write-Host "[START] Starting container..." -ForegroundColor Yellow
    docker compose -f $ComposeFile up -d

    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to start container" -ForegroundColor Red
        exit 1
    }

    Write-Host "[OK] Container started" -ForegroundColor Green
    Write-Host ""

    # Wait for app to initialize
    Write-Host "[WAIT] Waiting for app to initialize..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    Write-Host ""

    # Show status
    Write-Host "[INFO] Container Status:" -ForegroundColor Cyan
    docker compose -f $ComposeFile ps
    Write-Host ""

    # Show recent logs
    Write-Host "[LOGS] Recent logs:" -ForegroundColor Cyan
    docker compose -f $ComposeFile logs --tail=10 web
    Write-Host ""

    # Show access info
    Write-Host "[SUCCESS] Application is running!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Open in browser: " -NoNewline -ForegroundColor White
    Write-Host "http://localhost:5000" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Useful commands:" -ForegroundColor Yellow
    Write-Host "  View logs:     docker compose -f $ComposeFile logs -f web" -ForegroundColor Gray
    Write-Host "  Stop:          docker compose -f $ComposeFile down" -ForegroundColor Gray
    Write-Host "  Restart:       docker compose -f $ComposeFile restart web" -ForegroundColor Gray
    Write-Host "  Shell access:  docker exec -it portfolio-web-local sh" -ForegroundColor Gray
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}