import { useState, useEffect } from "react";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    fetch("https://wttr.in/Chennai?format=j1")
      .then(r => r.json())
      .then(d => {
        const c = d.current_condition[0];
        setWeather({ temp: c.temp_C, desc: c.weatherDesc[0].value, humidity: c.humidity });
      }).catch(() => setWeather({ temp: "28", desc: "Partly Cloudy", humidity: "65" }));
  }, []);
  
  return weather;
}
