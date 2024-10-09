import pyautogui
import time
import logging

def check_for_anty_updates():
    update_button = pyautogui.locateOnScreen('update_button.png', confidence=0.9)
    return update_button is not None

def perform_anty_update():
    logging.info("Performing Anty update")
    update_button = pyautogui.locateOnScreen('update_button.png', confidence=0.9)
    if update_button:
        pyautogui.click(update_button)
        time.sleep(60)  # Wait for update to complete, adjust as needed