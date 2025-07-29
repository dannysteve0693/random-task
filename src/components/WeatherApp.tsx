import React, { useState, useEffect } from "react";

type WeatherDetail = {
  main: string;
  description: string;
};

type WeatherResponse = {
  main: {
    temp: number;
  };
  name: string;
  weather: WeatherDetail[];
};

function WeatherApp() {
  const API_GEOCODING: string = "http://api.openweathermap.org/geo/1.0/direct";
  const API_WEATHER: string = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY: string = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [cityName, setCityName] = useState<string>("");

  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  const getLatLongGeoCoding = () => {
    fetch(API_GEOCODING + "?q=" + cityName + "&appid=" + API_KEY)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        fetch(
          API_WEATHER +
            "?lat=" +
            data[0].lat +
            "&lon=" +
            data[0].lon +
            "&appid=" +
            API_KEY
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            console.log("weather data");
            setWeatherData(data);
          });
      });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button
          onClick={() => {
            getLatLongGeoCoding();
          }}
        >
          Search
        </button>
      </div>
      <div>
        <h5>Display current weather</h5>
        <>
          {weatherData ? (
            <div>
              <ul>
                <li>Name: {weatherData?.name}</li>
                <li>Temperature: {weatherData?.main?.temp}</li>
                <li>Status: {weatherData?.weather?.[0]?.description}</li>
              </ul>
            </div>
          ) : (
            "-"
          )}
        </>
      </div>
    </div>
  );
}

export default WeatherApp;
