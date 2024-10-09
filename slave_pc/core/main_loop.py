import time
import logging
from slave_pc.core.network import check_internet
from slave_pc.core.socket_client import SocketClient
from slave_pc.utils.system import reboot
from slave_pc.config import CHECK_INTERVAL
from slave_pc.services.task_executor import execute_task

def main_loop(server_url):
    socket_client = SocketClient(server_url)
    connection_loss_time = None

    try:
        while True:
            if check_internet():
                if connection_loss_time:
                    connection_loss_time = None
                    logging.info("Internet connection restored")
                if not socket_client.connected:
                    socket_client.connect()
            else:
                logging.warning("Internet connection lost")
                if connection_loss_time is None:
                    connection_loss_time = time.time()
                elif time.time() - connection_loss_time > 300:  # 5 minutes
                    logging.error("Internet connection lost for 5 minutes. Rebooting...")
                    reboot()
            
            time.sleep(CHECK_INTERVAL)
    except KeyboardInterrupt:
        socket_client.disconnect()