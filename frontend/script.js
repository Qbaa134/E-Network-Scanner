document.getElementById('scanBtn').addEventListener('click', () => {
    fetch('https://twoj-backend.herokuapp.com/scan')
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<h2>Devices Found:</h2>';
            data.devices.forEach(device => {
                resultsDiv.innerHTML += `<p>${device.name} - ${device.mac}</p>`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
