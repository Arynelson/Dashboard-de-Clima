const API_KEY = 'a2b778c3a9dc90266decefe4cc0598f4'; // Your Weatherstack API key

// Asynchronous function to fetch weather data
async function buscarClima() {
    // Get the city name from the input field and trim whitespace
    const cidade = document.getElementById('cidade').value.trim();

    // If no city name is provided, display an alert and stop the execution
    if (!cidade) {
        alert('Please enter the name of a city.');
        return;
    }

    // Construct the API URL with the city name and API key
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${cidade}&units=m`;

    try {
        // Send a GET request to the API and wait for the response
        const response = await fetch(url);
        // Parse the JSON data from the response
        const data = await response.json();

        // If the API returns an error, throw an exception with the error message
        if (data.error) {
            throw new Error(data.error.info);
        }

        // Update the UI with the fetched weather data
        atualizarDados(data);
    } catch (error) {
        // If any error occurs, display an alert with the error message
        alert(`Error: ${error.message}`);
    }
}

// Function to update the UI with weather data
function atualizarDados(data) {
    // Update the city name in the UI
    document.getElementById('cidadeNome').textContent = data.location.name;

    // Update the temperature in the UI
    document.getElementById('temperatura').textContent = `Temperature: ${data.current.temperature}°C`;

    // Update the weather condition description
    document.getElementById('condicao').textContent = `Conditions: ${data.current.weather_descriptions[0]}`;

    // Update the weather icon and its alt text
    document.getElementById('iconeClima').src = data.current.weather_icons[0];
    document.getElementById('iconeClima').alt = data.current.weather_descriptions[0];

    // Update the humidity value in the UI
    document.getElementById('humidade').textContent = `Humidity: ${data.current.humidity}%`;

    // Update the wind speed value in the UI
    document.getElementById('vento').textContent = `Wind: ${data.current.wind_speed} km/h`;
}