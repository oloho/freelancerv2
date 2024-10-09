from .account_creation import AccountCreationTask
from .music_streaming import MusicStreamingTask

class TaskFactory:
    @staticmethod
    def create_task(task_type, config):
        if task_type == 'account_creation':
            return AccountCreationTask(config)
        elif task_type == 'music_streaming':
            return MusicStreamingTask(config)
        else:
            raise ValueError(f"Unknown task type: {task_type}")