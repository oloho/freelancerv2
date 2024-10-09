from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def setup_anty_browser():
    options = Options()
    options.add_argument("--user-data-dir=/path/to/anty/profile")  # Update this path
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(options=options)