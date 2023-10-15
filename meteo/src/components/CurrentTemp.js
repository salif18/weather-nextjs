import React from 'react';
import moment from 'moment';
const CurrentTemp = ({day}) => {
    return (
        <article className='today'>
            <figure>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} className='w-icon' alt='weather icon' />
            </figure>
            <section className='other'>
            <section className='day'>{moment(day.dt * 1000).format('ddd')}</section>
              <section className='temp'>Nuit {(day.temp.night/10).toFixed(2)}&#176;C</section>
              <section className='temp'>Jour {(day.temp.day/10).toFixed(2)}&#176;C</section>
            </section>
        </article>
    );
}

export default CurrentTemp;
