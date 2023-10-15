import moment from 'moment';
import React from 'react';

const Weather = ({day}) => {
    
    return (
        <article className='weather-forecast-item'>
         <section className='day'>{moment(day.dt * 1000).format("ddd")}</section>
         <figure>
           <img className="w-icon" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" />
        </figure>
         <section className='temp'>Nuit {(day.temp.night/10).toFixed(2)}&#176;C</section>
         <section className='temp'>Jour {(day.temp.day/10).toFixed(2)}&#176;C</section>
        </article>
    );
}

export default Weather;
