import logging
from slave_pc.core.main_loop import main_loop
from slave_pc.config import SERVER_URL

logging.basicConfig(filename='slave_pc.log', level=logging.INFO, 
                    format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')

if __name__ == "__main__":
    main_loop(SERVER_URL)