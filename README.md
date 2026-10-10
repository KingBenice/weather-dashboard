# Weather Dashboard ☀️

A modern, responsive weather application that provides real-time weather data and 5-day forecasts for any location worldwide.

## Features

✨ **Real-Time Weather Data**
- Current temperature, humidity, wind speed, and more
- Detailed weather descriptions with dynamic icons
- Feels-like temperature and pressure information

🌍 **Location Support**
- Search weather by city name
- Get weather for your current location using geolocation
- Add multiple cities to favorites for quick access

📅 **5-Day Forecast**
- Visual forecast cards for the next 5 days
- Temperature and weather conditions for each day

🌙 **Dark Mode**
- Toggle between light and dark themes
- Preferences saved in local storage

🌡️ **Temperature Units**
- Switch between Celsius and Fahrenheit
- All values update dynamically

💾 **Favorites System**
- Save your favorite cities
- Quick access to saved locations
- Data persisted in browser local storage

📱 **Fully Responsive**
- Works seamlessly on desktop, tablet, and mobile
- Optimized layout for all screen sizes

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **JavaScript ES6+** - Dynamic functionality and API integration
- **OpenWeatherMap API** - Real-time weather data
- **Font Awesome** - Beautiful weather icons

## Getting Started

### Live Demo
🚀 [View Live Weather Dashboard](https://KingBenice.github.io/weather-dashboard/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KingBenice/weather-dashboard.git
cd weather-dashboard
```

2. Open `index.html` in your browser or use a local server:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## How to Use

1. **Search for a City**
   - Type a city name in the search bar
   - Click the search button or press Enter
   - Weather data for that city will be displayed

2. **Use Your Location**
   - Click the "My Location" button
   - Allow browser permission to access your location
   - Weather for your current location will load

3. **Add to Favorites**
   - Click "Add to Favorites" button
   - Your favorite cities appear as quick access buttons

4. **Toggle Temperature Units**
   - Select °C or °F from the dropdown
   - All temperatures update instantly

5. **Dark Mode**
   - Click the moon/sun icon to toggle dark mode
   - Theme preference is saved

## API Key

This project uses the free tier of [OpenWeatherMap API](https://openweathermap.org/api).

**Note:** The API key in this project is for demonstration purposes. For production use:
1. Get your own free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the `API_KEY` variable in `script.js`

## Project Structure

```
weather-dashboard/
├── index.html          # HTML structure
├── style.css          # Styling and animations
├── script.js          # JavaScript logic and API calls
└── README.md          # Project documentation
```

## Features Breakdown

### Current Weather Display
- City name and country code
- Current date
- Large temperature display
- Weather icon and description
- Detailed metrics: feels-like temp, humidity, wind speed, pressure, visibility
- Favorites button

### Forecast Cards
- Next 5 days forecast
- Temperature for each day
- Weather condition
- Weather icon

### Local Storage
- Saves favorite cities
- Persists theme preference
- Data remains after page refresh

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Hourly forecast view
- [ ] Weather alerts and warnings
- [ ] Historical weather data
- [ ] Air quality index (AQI)
- [ ] Multiple language support
- [ ] PWA installation support
- [ ] Map view integration

## Performance Optimizations

- Lazy loading of forecast data
- Efficient DOM updates
- CSS animations using GPU acceleration
- Minimal API calls with smart caching

## Troubleshooting

**Weather data not showing?**
- Check your internet connection
- Verify the city name is spelled correctly
- Check that the API key is valid

**Geolocation not working?**
- Make sure your browser has permission to access location
- HTTPS is required for geolocation (on deployed sites)
- Some browsers may block location access

**Favorites not saving?**
- Check if local storage is enabled in your browser
- Clear browser cache and try again

## License

This project is open source and available under the MIT License.

## Author

👨‍💻 **KingBenice**
- GitHub: [KingBenice](https://github.com/KingBenice)
- Portfolio: [View Portfolio](https://KingBenice.github.io/portfolio/)

## Support

If you have any questions or suggestions, feel free to:
- Open an issue on GitHub
- Create a pull request with improvements
- Contact me through my portfolio

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!
