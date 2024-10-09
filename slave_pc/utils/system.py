import socket
import subprocess
from slave_pc.config import REBOOT_COMMAND

def get_pc_id():
    return f"PC-{socket.gethostname()}"

def reboot():
    subprocess.run(REBOOT_COMMAND, shell=True)