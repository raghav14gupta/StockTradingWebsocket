New-Item -ItemType Directory -Force -Path docs | Out-Null

# STEP 1: Force stop the app so we can capture it launching fresh
Write-Host "Stopping app..."
adb shell am force-stop com.ihldmedtech
Start-Sleep -Seconds 1

# STEP 2: Start recording first (before launch) - limit to 30 seconds
Write-Host "Starting screen recording (30s limit)..."
Start-Process -NoNewWindow adb -ArgumentList "shell screenrecord --time-limit 30 --bit-rate 4000000 /sdcard/rec.mp4"
# Allow screenrecord 3 seconds to initialize
Start-Sleep -Seconds 3

# STEP 3: Launch the app fresh (shows splash screen for 4s, data populates in background)
Write-Host "Launching app..."
adb shell monkey -p com.ihldmedtech -c android.intent.category.LAUNCHER 1
Write-Host "Waiting 4 seconds for splash screen..."
Start-Sleep -Seconds 4

# STEP 4: Navigate to Chart Screen (fully populated) and let it show live rendering
Write-Host "Displaying live chart screen for 6 seconds..."
Start-Sleep -Seconds 6

# STEP 5: Toggle connection state
Write-Host "Toggling airplane mode to show disconnection/reconnection..."
adb shell cmd connectivity airplane-mode enable
Start-Sleep -Seconds 5
adb shell cmd connectivity airplane-mode disable
Start-Sleep -Seconds 5

# STEP 6: Navigate to trade history screen
Write-Host "Navigating to Trade History..."
adb shell input tap 540 2208
Start-Sleep -Seconds 2

# STEP 7: Swipe down twice to scroll trade log
Write-Host "Scrolling history..."
adb shell input swipe 540 1560 540 720 400
Start-Sleep -Seconds 1
adb shell input swipe 540 1560 540 720 400
Start-Sleep -Seconds 1.5

# STEP 8: Let the 30-second limit finish naturally
Write-Host "Waiting for recording to conclude..."
Start-Sleep -Seconds 5

# STEP 9: Pull the video from the device
Write-Host "Pulling video..."
adb pull /sdcard/rec.mp4 docs/demo.mp4
adb shell rm /sdcard/rec.mp4
Write-Host "Saved docs/demo.mp4"
