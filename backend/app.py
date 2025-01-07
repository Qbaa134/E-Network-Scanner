from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/scan')
def scan_devices():
    devices = [
        {'name': 'Wi-Fi Network 1', 'mac': '00:1A:2B:3C:4D:5E'},
        {'name': 'Bluetooth Device 1', 'mac': '00:1A:2B:3C:4D:5F'}
    ]
    return jsonify({'devices': devices})

if __name__ == '__main__':
    app.run(debug=True)
