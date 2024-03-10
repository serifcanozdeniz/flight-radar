import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { icon } from "leaflet";
import { useDispatch } from "react-redux";
import { clearPath } from "../redux/slices/flightSlice";

const MapView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store.flightReducer);

  const dispatch = useDispatch();

  // marker iconu oluştur
  const planeIcon = icon({
    iconUrl: "/plane-icon.png",
    iconSize: [30, 30],
  });
  return (
    <MapContainer
      center={[38.948771, 35.425597]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* uçuş verisi kadar ekrana imleç bas */}
      {flightState.flights.map((flight) => (
        <Marker
          icon={planeIcon}
          key={flight.id}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="d-flex flex-column gap-2">
              <span>Kod: {flight.code}</span>
              <button onClick={() => setDetailId(flight.id)} className="w-100">
                Detay
              </button>
              {/* rota varsa temizle butonu koy  */}
              {flightState.path.length > 0 && (
                <button onClick={() => dispatch(clearPath())}>
                  Rotayı Temzile
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* uçağın rotasını bas */}
      <Polyline positions={flightState?.path} />
    </MapContainer>
  );
};

export default MapView;
