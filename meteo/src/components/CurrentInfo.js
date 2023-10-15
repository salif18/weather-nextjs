import React from "react";
import moment from "moment";

const CurrentInfo = ({ currentTimes, currentDate, ampm, currentObject }) => {
  const { humidity, pressure, sunrise, sunset, wind_speed } = currentObject;
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
          <div>Pression</div>
          <div>{pressure}%</div>
        </div>
        <div className="weather-item">
          <div>Vitesse du vent</div>
          <div>{wind_speed}%</div>
        </div>
        <div className="weather-item">
          <div>Lever du soleil</div>
          <div>{moment(sunrise * 1000).format("HH:mm a")}</div>
        </div>
        <div className="weather-item">
          <div>Coucher du soleil</div>
          <div> {moment(sunset * 1000).format("HH:mm a")}</div>
        </div>
      </section>
    </article>
  );
};

export default CurrentInfo;
