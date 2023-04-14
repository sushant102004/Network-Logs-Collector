from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from fastapi import FastAPI
import time
import json
import re

app = FastAPI()

def saveLogs(driver, pageURL):
    logs = driver.get_log("performance")

    fileName = re.compile(r'https?://(www\.)?')
    fileName = fileName.sub('', pageURL).strip().strip('/')
    fileName += '.json'
    fileName = fileName.replace('/', '.')

    # with open('logs/' + fileName, 'w', encoding='utf-8') as f:
    #     f.write("{")
    #     f.write('"logs"')
    #     f.write(':')
    #     f.write("[")
    #     for log in logs:

    #         network_log = json.loads(log['message'])['message']

    #         if('Network.response' in network_log['method']):

    #             if network_log['method'] == 'Network.responseReceived':
    #                 mimeType = network_log['params']['response']['mimeType']
    #                 log_name = network_log['params']['response']['url']
    #                 status_code = network_log['params']['response']['status']
    #                 responseTime = int(network_log['params']['response']['responseTime'])


    #                 data = {'log_name': log_name, 'status_code': status_code, 'type': mimeType, 'response_time': responseTime}
    #                 f.write(json.dumps(data) + ',')

    #     f.write('{}]}')

    # Get All Logs
    with open("network_log.json", "w", encoding="utf-8") as f:
        f.write("[")
  
        # Iterates every logs and parses it using JSON
        for log in logs:
            network_log = json.loads(log["message"])["message"]
  
            # Checks if the current 'method' key has any
            # Network related value.
            if("Network.response" in network_log["method"]
                    or "Network.request" in network_log["method"]
                    or "Network.webSocket" in network_log["method"]):
  
                # Writes the network log to a JSON file by
                # converting the dictionary to a JSON string
                # using json.dumps().
                f.write(json.dumps(network_log)+",")
        f.write("{}]")

        print('Logs Saved')       



def captureNetworkLogs(site: str, pages : list = []):

    desired_capabilities = DesiredCapabilities.CHROME
    desired_capabilities['goog:loggingPrefs'] = {'performance': 'ALL'}

    options = webdriver.ChromeOptions()
    options.add_argument('--window-size=1920,1080')

    # options.add_argument('headless')

    options.add_argument('--ignore-certificate-error')

    driver = webdriver.Chrome(options=options, desired_capabilities=desired_capabilities)

    driver.get('https://' + site)

    time.sleep(10)

    # Saving logs for intial page load
    saveLogs(driver, driver.current_url)

    action = ActionChains(driver)


    if len(pages) > 0:
        for i in range(len(pages)):
            menuLink = driver.find_element(by = By.LINK_TEXT, value = pages[i])
            menuLink.click()
            time.sleep(10)
            saveLogs(driver, driver.current_url)
    else:
        print('Pages not passed.')


    driver.quit()

    return {'result' : 'OK'}


@app.get('/capture-logs/{site}')
async def root(site: str):
    result = captureNetworkLogs(site)
    return { 'data' : result }