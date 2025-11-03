# Set environment variables
$env:PGPASSWORD='Admin@1234'

# Try to find psql in default locations
$psqlPaths = @(
    "C:\Program Files\PostgreSQL\14\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\13\bin\psql.exe"
)

$psqlFound = $false
foreach ($path in $psqlPaths) {
    if (Test-Path $path) {
        Write-Host "Found psql at: $path"
        & $path -h localhost -p 5432 -U postgres -c "CREATE DATABASE asset_tracking"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Database asset_tracking created successfully!"
        } else {
            Write-Host "Failed to create database. It may already exist."
        }
        $psqlFound = $true
        break
    }
}

if (-not $psqlFound) {
    Write-Host "psql.exe not found in default locations."
    Write-Host "Please make sure PostgreSQL is installed."
}