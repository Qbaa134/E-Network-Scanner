// Bluetooth scanning
document.getElementById('scan-bluetooth').addEventListener('click', async () => {
    try {
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        displayOutput(`Bluetooth Device: ${device.name}`);
    } catch (error) {
        displayOutput('Bluetooth scan failed: ' + error);
    }
});

// Radio stations fetching
document.getElementById('get-radio-stations').addEventListener('click', async () => {
    try {
        const response = await fetch('https://de1.api.radio-browser.info/json/stations/bycountry/Poland');
        const stations = await response.json();
        displayRadioStations(stations);
    } catch (error) {
        displayOutput('Failed to fetch radio stations: ' + error);
    }
});

// Display radio stations
function displayRadioStations(stations) {
    let output = '<h2>Available Radio Stations:</h2><ul>';
    stations.forEach(station => {
        output += `<li>${station.name} - ${station.frequency} MHz - ${station.country}</li>`;
    });
    output += '</ul>';
    document.getElementById('output').innerHTML = output;
}

// Display output
function displayOutput(data) {
    const output = document.getElementById('output');
    output.innerHTML += `<pre>${data}</pre>`;
}
