@echo off
SETLOCAL

echo Starting cleanup process...

REM Remove build and cache directories
IF EXIST .next (
    echo Removing .next directory...
    rmdir /s /q .next
)

IF EXIST node_modules\.cache (
    echo Removing node_modules/.cache...
    rmdir /s /q node_modules\.cache
)

IF EXIST .swc (
    echo Removing .swc directory...
    rmdir /s /q .swc
)

REM Remove TypeScript build info files
FOR /R %%i IN (*.tsbuildinfo) DO (
    echo Removing %%i...
    del /q "%%i" 2>nul
)

echo ✅ Cleanup completed successfully
ENDLOCAL
