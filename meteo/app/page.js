"use client";
import PrevisionsDetails from "@/src/components/PrevisionsDetails";
import PrevisionsDuJour from "@/src/components/PrevisionsDuJour";
import Previsions from "@/src/components/Previsions";
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

      const currentDate = days[6 - day] + "," +" "+ + date + " " + months[month];
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
          <PrevisionsDetails
            currentDate={currentDateTime.currentDate}
            currentTimes={currentDateTime.currentTimes}
            ampm={currentDateTime.ampm}
            currentObject={currentObject}
          />
          <section className="current-temp">
          <Zone 
            data={data}
          />
          {
            weatherData && 
            weatherData.map((day, idx) => (
             idx === 0 && <PrevisionsDuJour day={day} key={day.dt} />
            )) 
          }
          </section>
        </section>
      </section>

      <section className="future-forecast">
       
        <section className="weather-forecast">
        {
           weatherData && 
           weatherData.map((day, idx) => (
             idx !== 0 && <Previsions day={day} key={day.dt} />
           )) 
           
        }
        </section>
      </section>
    </main>
  );
}
