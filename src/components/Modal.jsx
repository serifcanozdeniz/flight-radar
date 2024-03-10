import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { headerOpt } from "../constants";
import formatDate from "../utils/formatDate";
import { setPath } from "../redux/slices/flightSlice";
import { useDispatch } from "react-redux";

const Modal = ({ detailId, close }) => {
  // uçuş detay verisini sadece bu modal içerisinde kullanacağımız için başka bir bileşenede ihtiyacımız olmadığı için state olarak tuttuk
  const [d, setDetail] = useState();

  const dispatch = useDispatch();

  //   id her güncellendiğinde çalışır
  useEffect(() => {
    // önceki uçuşun verilerini temizle
    setDetail(null);

    // yeni uçuşun detay verilerini al
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        headerOpt
      )
      .then((res) => {
        dispatch(setPath(res.data.trail));
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [detailId]);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <button onClick={close}>X</button>
        </p>

        {!d ? (
          <div className="wrapper">
            <div className="loader">
              <span></span>
            </div>
          </div>
        ) : !d.aircraft?.model || !d.airport.origin ? (
          <div>
            <p>Bu uçuşun verileri gizlidir.</p>
          </div>
        ) : (
          <>
            <h2>{d.aircraft.model.text}</h2>
            <h2>{d.aircraft.model.code}</h2>

            <p>
              <span>Kuyruk Kodu:</span>
              <span>{d.aircraft.registration}</span>
            </p>

            <img src={d.aircraft.images.large[0].src} />

            <p>
              <span>Şirket:</span>
              <span>{d.airline.short}</span>
            </p>

            <p>
              <span>Kalkış:</span>
              <a target="_blank" href={d.airport.origin?.website}>
                {d.airport.origin.name}({d.airport.origin.position.country.name}
                )
              </a>
            </p>

            <p>
              <span>İniş:</span>
              <a target="_blank" href={d.airport.destination?.website}>
                {d.airport.destination.name}(
                {d.airport.destination.position.country.name})
              </a>
            </p>

            <p>
              <span>Kalkış Zamanı:</span>
              {d.time.scheduled.departure ? (
                <span>{formatDate(d.time.scheduled.departure)}</span>
              ) : (
                <span>Bilinmiyor</span>
              )}
            </p>
            <p>
              <span>İniş Zamanı:</span>
              {d.time.scheduled.arrival ? (
                <span>{formatDate(d.time.scheduled.arrival)}</span>
              ) : (
                <span>Bilinmiyor</span>
              )}
            </p>

            <p className={d.status.icon}>
              <span>{d.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
