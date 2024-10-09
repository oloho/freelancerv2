import socketio
import logging
from slave_pc.utils.system import get_pc_id, reboot
from slave_pc.services.update_service import perform_update
from slave_pc.services.task_executor import execute_task

class SocketClient:
    def __init__(self, server_url):
        self.server_url = server_url
        self.sio = socketio.Client()
        self.setup_events()

    def setup_events(self):
        @self.sio.event
        def connect():
            logging.info("Connected to server")
            self.sio.emit('register', {'id': get_pc_id(), 'name': socket.gethostname()})

        @self.sio.event
        def disconnect():
            logging.info("Disconnected from server")

        @self.sio.on('update')
        def on_update():
            logging.info("Received update command")
            perform_update()

        @self.sio.on('reboot')
        def on_reboot():
            logging.info("Received reboot command")
            reboot()

        @self.sio.on('newTask')
        def on_new_task(data):
            logging.info(f"Received new task: {data}")
            execute_task(data['task'])

    def connect(self):
        self.sio.connect(self.server_url)

    def disconnect(self):
        self.sio.disconnect()

    @property
    def connected(self):
        return self.sio.connected