document.getElementById('scan-wifi').addEventListener('click', async () => {
    const result = await fetch('/scan-wifi');
    const data = await result.json();
    displayOutput(data);
});

document.getElementById('scan-bluetooth').addEventListener('click', async () => {
    const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
    displayOutput(`Bluetooth Device: ${device.name}`);
});

function displayOutput(data) {
    const output = document.getElementById('output');
    output.innerHTML = JSON.stringify(data, null, 2);
}
