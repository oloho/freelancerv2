import logging
from slave_pc.tasks.task_factory import TaskFactory

def execute_task(task_config):
    logging.info(f"Executing task: {task_config}")
    try:
        task_type = task_config.get('type')
        task = TaskFactory.create_task(task_type, task_config)
        task.execute()
    except Exception as e:
        logging.error(f"Error executing task: {str(e)}")