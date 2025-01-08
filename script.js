// Skanowanie urządzeń Bluetooth
document.getElementById('scan-bluetooth').addEventListener('click', async () => {
    try {
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        displayOutput(`Bluetooth Device: ${device.name}`);
    } catch (error) {
        displayOutput('Bluetooth scan failed: ' + error);
    }
});

// Geolokalizacja
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        displayOutput(`GPS Position: Lat ${position.coords.latitude}, Lon ${position.coords.longitude}`);
    });
} else {
    displayOutput("Geolocation is not available.");
}

// Skanowanie sieci Wi-Fi (tylko dla niektórych przeglądarek)
document.getElementById('scan-wifi').addEventListener('click', async () => {
    if (navigator.wifi) {
        try {
            const networks = await navigator.wifi.getNetworks();
            displayOutput(`Available Wi-Fi networks: ${networks.join(', ')}`);
        } catch (error) {
            displayOutput('Wi-Fi scan failed: ' + error);
        }
    } else {
        displayOutput("Wi-Fi scanning is not supported in your browser.");
    }
});

// Funkcja do wyświetlania danych
function displayOutput(data) {
    const output = document.getElementById('output');
    output.innerHTML += `<pre>${data}</pre>`;
}
