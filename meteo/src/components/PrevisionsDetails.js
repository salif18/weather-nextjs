import React from "react";
import moment from "moment";

const PrevisionsDetails = ({ currentTimes, currentDate, ampm, currentObject }) => {
  const { humidity, pressure, sunrise, sunset, wind_speed ,visibility,temp} = currentObject;
  return (
    <article className="date-container">
      <section className="time">
        {currentTimes}
        <span className="am-pm">{ampm}</span>
      </section>
      <section className="date">{currentDate}</section>
      <section className="others">
        <div className="weather-item">
          <div>Humidité</div>
          <div>{humidity}%</div>
        </div>
        <div className="weather-item">
          <div>Préssion</div>
          <div>{pressure}%</div>
        </div>
        <div className="weather-item">
          <div>Visibilité</div>
          <div>{visibility}</div>
        </div>
        <div className="weather-item">
          <div>Temps</div>
          <div>{temp}</div>
        </div>
        <div className="weather-item">
          <div>Vitesse du vent</div>
          <div>{wind_speed}%</div>
        </div>
        <div className="weather-item">
          <div>Lévée du soleil</div>
          <div>{moment(sunrise * 1000).format("HH:mm a")}</div>
        </div>
        <div className="weather-item">
          <div>Couché du soleil</div>
          <div>{moment(sunset * 1000).format("HH:mm a")}</div>
        </div>
      </section>
    </article>
  );
};

export default PrevisionsDetails;
