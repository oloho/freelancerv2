import os

SERVER_URL = os.getenv("SERVER_URL", "http://localhost:3000")
CHECK_INTERVAL = 300  # 5 minutes
REBOOT_COMMAND = "shutdown /r /t 0"
ANTY_PATH = r"C:\Program Files\Anty\Anty.exe"  # Update this path as needed