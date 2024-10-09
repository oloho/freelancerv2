from abc import ABC, abstractmethod

class BaseTask(ABC):
    def __init__(self, config=None):
        self.config = config or {}

    @abstractmethod
    def execute(self):
        pass

    def log(self, message):
        print(f"[{self.__class__.__name__}] {message}")