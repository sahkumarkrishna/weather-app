import { useState } from "react";
import "./Weather.css";
import {
  TiWeatherCloudy,
  TiWeatherSunny,
  TiWeatherDownpour,
} from "react-icons/ti"; // Add more icons as needed
import axios from "axios";

function Weather() {
  const [city, setCity] = useState(""); // Initialize with an empty string
  const [weather, setWeather] = useState(null); // Initialize with null
  const [icon, setIcon] = useState(<TiWeatherCloudy />); // Default icon

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d60f59726f57a1e2d49babc8db27a03`
      );
      setWeather(response); // Set the full response object (weather data)

      // Set the appropriate weather icon based on the condition
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      if (weatherCondition.includes("clear")) {
        setIcon(<TiWeatherSunny />);
      } else if (weatherCondition.includes("rain")) {
        setIcon(<TiWeatherDownpour />);
      } else {
        setIcon(<TiWeatherCloudy />);
      }
    } catch (error) {
      console.log("Error fetching weather", error);
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  // Convert temperature from Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2); // Convert and round to 2 decimal places
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city Name"
        value={city}
        onChange={handleCityChange}
      />
      <div className="weather-icon">{icon}</div>
      <button onClick={handleClick}>Get Weather</button>
      {weather && weather.data && (
        <div className="weather-info">
          <h3>{weather.data.name}</h3>
          <p>Temperature: {kelvinToCelsius(weather.data.main.temp)}°C</p>{" "}
          {/* Display in Celsius */}
          <p>{weather.data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
