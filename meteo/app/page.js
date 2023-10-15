"use client";
import CurrentInfo from "@/src/components/CurrentInfo";
import CurrentTemp from "@/src/components/CurrentTemp";
import Weather from "@/src/components/Weather";
import Zone from "@/src/components/Zone";
import { useState, useEffect } from "react";

//code Api
const API_KEY = "3c780ff6824fb40662843628e2d06723"
export default function Home() {
  const days = [
    "lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Ju",
    "Jui",
    "Au",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [currentDateTime, setCurrentDateTime] = useState({
    currentDate: "",
    currentTimes: "",
    ampm: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const d = new Date();
      const month = d.getMonth();
      const date = d.getDate();
      const day = d.getDay();
      const hour = d.getHours();
      const minute = d.getMinutes();
      const hoursIn24HrFormat = hour >= 13 ? hour % 24 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const currentTimes =
        (hoursIn24HrFormat < 10 ? "0" + hoursIn24HrFormat : hoursIn24HrFormat) +
        ":" +
        (minute < 10 ? "0" + minute : minute);

      const currentDate = days[6 - day] + "," + date + " " + months[month];
      setCurrentDateTime({ currentDate, currentTimes, ampm });
    };

    const interval = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //les requeque api
  const [weatherData, setWeatherData] = useState([]);
  const [currentObject, setCurrentObject] = useState([])
  const [data , setData] = useState('')

  useEffect(()=>{
     const getWeatherData =()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
        let { latitude, longitude } = position.coords
        if(latitude && longitude){
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&appid=${API_KEY}`)
        .then((res)=> res.json())
        .then((data) => {
          setData(data)
         setWeatherData(data.daily)
         setCurrentObject(data.current)
        })
      }
     })
     };
     getWeatherData()
  },[])


  return (
    <main className="app">
      <section className="container">
        <section className="current-info">
          <CurrentInfo
            currentDate={currentDateTime.currentDate}
            currentTimes={currentDateTime.currentTimes}
            ampm={currentDateTime.ampm}
            currentObject={currentObject}
          />
          <Zone 
            data={data}
          />
        </section>
      </section>

      <section className="future-forecast">
        {
          weatherData && 
          weatherData.map((day, idx) => (
           idx === 0 && <CurrentTemp day={day} key={day.dt} />
          )) 
        }
        <section className="weather-forecast">
        {
           weatherData && 
           weatherData.map((day, idx) => (
             idx !== 0 && <Weather day={day} key={day.dt} />
           )) 
           
        }
        </section>
      </section>
    </main>
  );
}
