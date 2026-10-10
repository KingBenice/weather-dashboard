const API_KEY = 'e16dc1a1c7ed4a77ba9b7a69c5a6e3c4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const elements = {
  searchInput: document.getElementById('searchInput'),
  searchBtn: document.getElementById('searchBtn'),
  geoBtn: document.getElementById('geoBtn'),
  themeToggle: document.getElementById('themeToggle'),
  tempUnit: document.getElementById('tempUnit'),
  errorMessage: document.getElementById('errorMessage'),
  currentWeather: document.getElementById('currentWeather'),
  forecastSection: document.getElementById('forecastSection'),
  favoritesList: document.getElementById('favoritesList'),
  addFavorite: document.getElementById('addFavorite'),
};

let currentCity = null;
let currentUnit = 'metric';
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let currentCityData = null;

// Initialize
function init() {
  loadTheme();
  renderFavorites();
  setupEventListeners();
}

function setupEventListeners() {
  elements.searchBtn.addEventListener('click', handleSearch);
  elements.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  elements.geoBtn.addEventListener('click', getGeolocation);
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.tempUnit.addEventListener('change', handleUnitChange);
  elements.addFavorite.addEventListener('click', handleAddFavorite);
}

function handleSearch() {
  const city = elements.searchInput.value.trim();
  if (city) {
    fetchWeatherByCity(city);
    elements.searchInput.value = '';
  }
}

function getGeolocation() {
  if (navigator.geolocation) {
    elements.geoBtn.disabled = true;
    elements.geoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting location...';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
        elements.geoBtn.disabled = false;
        elements.geoBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> My Location';
      },
      (error) => {
        showError('Unable to access your location');
        elements.geoBtn.disabled = false;
        elements.geoBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> My Location';
      }
    );
  }
}

async function fetchWeatherByCity(city) {
  try {
    showError('');
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${currentUnit}`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    currentCity = data.name;
    currentCityData = data;
    fetchForecast(data.coord.lat, data.coord.lon);
    displayCurrentWeather(data);
  } catch (error) {
    showError(error.message);
    hideWeather();
  }
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    showError('');
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`
    );

    const data = await response.json();
    currentCity = data.name;
    currentCityData = data;
    fetchForecast(lat, lon);
    displayCurrentWeather(data);
  } catch (error) {
    showError('Failed to fetch weather');
    hideWeather();
  }
}

async function fetchForecast(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`
    );

    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    console.error('Forecast error:', error);
  }
}

function displayCurrentWeather(data) {
  const { main, weather, wind, sys, clouds, visibility } = data;
  const icon = getWeatherIcon(weather[0].main);
  const tempSymbol = currentUnit === 'metric' ? '°C' : '°F';
  const speedUnit = currentUnit === 'metric' ? 'm/s' : 'mph';

  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  document.getElementById('tempDisplay').textContent = `${Math.round(main.temp)}${tempSymbol}`;
  document.getElementById('weatherIcon').innerHTML = icon;
  document.getElementById('weatherDescription').textContent = weather[0].description;
  document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}${tempSymbol}`;
  document.getElementById('humidity').textContent = `${main.humidity}%`;
  document.getElementById('windSpeed').textContent = `${Math.round(wind.speed)} ${speedUnit}`;
  document.getElementById('pressure').textContent = `${main.pressure} hPa`;
  document.getElementById('uvIndex').textContent = 'N/A';
  document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;

  updateFavoriteButton();
  elements.currentWeather.classList.remove('hidden');
}

function displayForecast(list) {
  const forecastByDay = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!forecastByDay[date]) {
      forecastByDay[date] = item;
    }
  });

  const forecastArray = Object.values(forecastByDay).slice(0, 5);
  const tempSymbol = currentUnit === 'metric' ? '°C' : '°F';

  const html = forecastArray
    .map((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const icon = getWeatherIcon(item.weather[0].main);

      return `
        <div class="forecast-card">
          <div class="forecast-date">${date}</div>
          <div class="forecast-icon">${icon}</div>
          <div class="forecast-temp">${Math.round(item.main.temp)}${tempSymbol}</div>
          <div class="forecast-desc">${item.weather[0].main}</div>
        </div>
      `;
    })
    .join('');

  document.getElementById('forecastCards').innerHTML = html;
  elements.forecastSection.classList.remove('hidden');
}

function getWeatherIcon(weatherMain) {
  const iconMap = {
    Clear: '<i class="fas fa-sun" style="color: #fbbf24;"></i>',
    Clouds: '<i class="fas fa-cloud" style="color: #9ca3af;"></i>',
    Rain: '<i class="fas fa-cloud-rain" style="color: #3b82f6;"></i>',
    Drizzle: '<i class="fas fa-cloud-rain" style="color: #60a5fa;"></i>',
    Thunderstorm: '<i class="fas fa-bolt" style="color: #f59e0b;"></i>',
    Snow: '<i class="fas fa-snowflake" style="color: #93c5fd;"></i>',
    Mist: '<i class="fas fa-smog" style="color: #d1d5db;"></i>',
    Smoke: '<i class="fas fa-smog" style="color: #9ca3af;"></i>',
    Haze: '<i class="fas fa-smog" style="color: #d1d5db;"></i>',
    Dust: '<i class="fas fa-wind" style="color: #d4a574;"></i>',
    Fog: '<i class="fas fa-smog" style="color: #bfdbfe;"></i>',
    Sand: '<i class="fas fa-wind" style="color: #d4a574;"></i>',
    Ash: '<i class="fas fa-smog" style="color: #6b7280;"></i>',
    Squall: '<i class="fas fa-wind" style="color: #9ca3af;"></i>',
    Tornado: '<i class="fas fa-tornado" style="color: #7c3aed;"></i>',
  };
  return iconMap[weatherMain] || '<i class="fas fa-cloud-sun" style="color: #667eea;"></i>';
}

function handleAddFavorite() {
  if (!currentCity) return;

  const exists = favorites.find((fav) => fav.name === currentCity);
  if (exists) {
    favorites = favorites.filter((fav) => fav.name !== currentCity);
  } else {
    favorites.push({
      name: currentCity,
      lat: currentCityData.coord.lat,
      lon: currentCityData.coord.lon,
    });
  }

  localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  updateFavoriteButton();
  renderFavorites();
}

function updateFavoriteButton() {
  const isFavorite = favorites.some((fav) => fav.name === currentCity);
  if (isFavorite) {
    elements.addFavorite.classList.add('added');
    elements.addFavorite.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
  } else {
    elements.addFavorite.classList.remove('added');
    elements.addFavorite.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
  }
}

function renderFavorites() {
  const html = favorites
    .map(
      (fav) =>
        `<button class="favorite-btn" onclick="fetchWeatherByCoords(${fav.lat}, ${fav.lon})">${fav.name}</button>`
    )
    .join('');

  elements.favoritesList.innerHTML = html || '<p style="color: #999; font-size: 0.9rem;">No favorites yet</p>';
}

function handleUnitChange(e) {
  currentUnit = e.target.value;
  if (currentCity) {
    fetchWeatherByCity(currentCity);
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('weatherTheme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeIcon();
}

function loadTheme() {
  const theme = localStorage.getItem('weatherTheme') || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark-mode');
  elements.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.classList.toggle('show', message.length > 0);
}

function hideWeather() {
  elements.currentWeather.classList.add('hidden');
  elements.forecastSection.classList.add('hidden');
}

init();