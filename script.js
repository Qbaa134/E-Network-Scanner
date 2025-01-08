// Bluetooth scanning
document.getElementById('scan-bluetooth').addEventListener('click', async () => {
    try {
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        displayOutput(`Bluetooth Device: ${device.name}`);
    } catch (error) {
        displayOutput('Bluetooth scan failed: ' + error);
    }
});

// Radio station scanning based on location
document.getElementById('scan-radio').addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            displayOutput(`Your location: Lat ${lat}, Lon ${lon}`);
            
            // Fetch radio stations from the API
            const response = await fetch(`https://fr1.api.radio-browser.info/json/stations/bygeo?lat=${lat}&lon=${lon}`);
            const stations = await response.json();
            displayOutput("Nearby Radio Stations:");
            stations.forEach(station => {
                displayOutput(`- ${station.name} (${station.country}): ${station.url_resolved}`);
            });
        });
    } else {
        displayOutput("Geolocation is not available.");
    }
});

// Function to display output
function displayOutput(data) {
    const output = document.getElementById('output');
    if (typeof data === "string") {
        output.innerHTML += `<p>${data}</p>`;
    } else {
        output.innerHTML += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
}
