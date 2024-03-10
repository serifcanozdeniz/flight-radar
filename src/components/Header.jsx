import { useSelector } from "react-redux";

const Header = () => {
  const flightState = useSelector((store) => store.flightReducer);
  console.log(flightState);
  return (
    <header>
      <div>
        <img src="/plane-logo.png" />
        <h3>Uçuş Radarı</h3>
      </div>
      <p>
        {flightState.isLoading
          ? "Uçuşlar Hesaplanıyor"
          : flightState.isError
          ? "Hata Oluştu"
          : flightState.flights.length + " Uçuş Bulundu"}
      </p>
    </header>
  );
};

export default Header;
