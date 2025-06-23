import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import offices from '../../assets/warehouses.json'
import { useState } from "react";

// Example icon (optional custom styling)
const officeIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});



const ZoomTo = ({lat, lng}) => {
  const map = useMap()
  if (lat && lng) {
    map.flyTo([lat, lng], 10, {
      duration:2,
    })
    
  }
  
  return null
}



export default function DistrictMap() {
  const [search, setSearch] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  
  const handleSearch = e => {
    e.preventDefault();
    const result = offices.find(d =>  d.district.toLowerCase().includes(search.toLowerCase()))
    if (result) {
      setSelectedDistrict(result)
    }
  }
  console.log(search)
  console.log(selectedDistrict)
  
  
  
  return (
    <div className="">
      <div className="py-4 text-center">
        <form action="">
          <input type="text" className="input" onChange={(e)=>setSearch(e.target.value)} />
          <button className="btn btn-primary ml-1" onClick={handleSearch}>Search</button>
        </form>
      </div>
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={true}
      className=" z-0 "
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {offices.map((office, index) => (
        <Marker
          key={index}
          position={[office.latitude, office.longitude]}
          icon={officeIcon}
        >
          <Popup>
            <strong>{office.district}</strong>
            <br />
            City: {office.city}
            <br />
            Areas: {office.covered_area.join(", ")}

          </Popup>
        </Marker>
        
      ))}
        {selectedDistrict && (
          
          <ZoomTo
            lat={selectedDistrict.latitude}
            lng={selectedDistrict.longitude}
          >
            
            </ZoomTo>
          )
        }
      </MapContainer>
      </div>
  );
}
