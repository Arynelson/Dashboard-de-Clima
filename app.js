const API_KEY = 'a2b778c3a9dc90266decefe4cc0598f4'; // Sua chave da Weatherstack

async function buscarClima() {
    const cidade = document.getElementById('cidade').value.trim();

    if (!cidade) {
        alert('Por favor, digite o nome de uma cidade.');
        return;
    }

    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${cidade}&units=m`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.info);
        }

        atualizarDados(data);
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
}

function atualizarDados(data) {
    document.getElementById('cidadeNome').textContent = data.location.name;
    document.getElementById('temperatura').textContent = `Temperatura: ${data.current.temperature}°C`;
    document.getElementById('condicao').textContent = `Condições: ${data.current.weather_descriptions[0]}`;
    document.getElementById('iconeClima').src = data.current.weather_icons[0];
    document.getElementById('iconeClima').alt = data.current.weather_descriptions[0];
    document.getElementById('humidade').textContent = `Umidade: ${data.current.humidity}%`;
    document.getElementById('vento').textContent = `Vento: ${data.current.wind_speed} km/h`;
}
