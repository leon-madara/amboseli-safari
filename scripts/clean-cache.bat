@echo off
REM Clean Next.js Cache Script for Windows
REM This script removes all cached files to resolve webpack caching issues

echo.
echo ========================================
echo  Cleaning Next.js Cache and Build Artifacts
echo ========================================
echo.

REM Remove .next directory
if exist ".next" (
  echo [*] Removing .next directory...
  rmdir /s /q ".next"
  echo     Done!
) else (
  echo [i] No .next directory found
)

REM Remove node_modules\.cache
if exist "node_modules\.cache" (
  echo [*] Removing node_modules\.cache...
  rmdir /s /q "node_modules\.cache"
  echo     Done!
) else (
  echo [i] No node_modules\.cache found
)

REM Remove TypeScript build info
if exist "tsconfig.tsbuildinfo" (
  echo [*] Removing tsconfig.tsbuildinfo...
  del /f /q "tsconfig.tsbuildinfo"
  echo     Done!
)

if exist ".next\tsconfig.tsbuildinfo" (
  echo [*] Removing .next\tsconfig.tsbuildinfo...
  del /f /q ".next\tsconfig.tsbuildinfo"
  echo     Done!
)

REM Remove out directory if it exists
if exist "out" (
  echo [*] Removing out directory...
  rmdir /s /q "out"
  echo     Done!
)

echo.
echo ========================================
echo  Cache Cleanup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Run: npm install (if dependencies are missing)
echo   2. Run: npm run dev (for development)
echo   3. Run: npm run build (for production build)
echo.
pause
