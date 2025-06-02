import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useNavigate } from "react-router-dom"
import L from "leaflet"
import { Zap, ArrowLeft, MapPin, Plug, Power, Edit, Trash2, Plus } from "lucide-react"
import { handleError, handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"
import "leaflet/dist/leaflet.css"
import "react-toastify/dist/ReactToastify.css"
import "./map-view.css"

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

// Custom marker icons for different statuses
const createCustomIcon = (status) => {
  const color = status === "Active" ? "#10b981" : status === "Inactive" ? "#ef4444" : "#f59e0b"

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

function MapView() {
  const [stations, setStations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStation, setSelectedStation] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true)
      try {
        const url = `${process.env.REACT_APP_API_URL}/stations`
        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        const response = await fetch(url, headers)
        const data = await response.json()
        setStations(data)
      } catch (err) {
        console.error("Error fetching stations", err)
        handleError("Failed to load stations")
      } finally {
        setIsLoading(false)
      }
    }
    fetchStations()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    try {
      const url = `${process.env.REACT_APP_API_URL}/stations/${id}`
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      const response = await fetch(url, {
        method: "DELETE",
        ...headers,
      })
      const result = await response.json()
      handleSuccess(result.message || "Station deleted")

      // Remove from local state
      setStations(stations.filter((station) => station._id !== id))
      setSelectedStation(null)
    } catch (err) {
      handleError("Failed to delete station")
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "#10b981"
      case "inactive":
        return "#ef4444"
      case "maintenance":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "Available"
      case "inactive":
        return "Offline"
      case "maintenance":
        return "Maintenance"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="map-view-container">
      {/* Header */}
      <header className="map-header">
        <div className="header-content">
          <button onClick={() => navigate("/home")} className="back-button">
            <ArrowLeft className="back-icon" />
            <span>Back to Stations</span>
          </button>

          <div className="header-center">
            <div className="logo-container">
              <div className="logo-circle">
                <Zap className="logo-icon" />
              </div>
              <span className="logo-text">ChargeGlobal</span>
            </div>
            <div className="header-title">
              <h1>Station Map</h1>
              <p>{stations.length} stations found</p>
            </div>
          </div>

          <button onClick={() => navigate("/add-station")} className="add-button">
            <Plus className="button-icon" />
            <span>Add Station</span>
          </button>
        </div>
      </header>

      {/* Map Container */}
      <div className="map-container">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-spinner" />
              <p>Loading stations...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={[28.6, 77.2]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations.map((station) => (
              <Marker
                key={station._id}
                position={[station.location.latitude, station.location.longitude]}
                icon={createCustomIcon(station.status)}
                eventHandlers={{
                  click: () => setSelectedStation(station),
                }}
              >
                <Popup className="custom-popup">
                  <div className="popup-content">
                    <div className="popup-header">
                      <h3 className="popup-title">{station.name}</h3>
                      <span
                        className="popup-status"
                        style={{
                          backgroundColor: `${getStatusColor(station.status)}20`,
                          color: getStatusColor(station.status),
                        }}
                      >
                        {getStatusText(station.status)}
                      </span>
                    </div>

                    <div className="popup-details">
                      <div className="detail-item">
                        <Power className="detail-icon" />
                        <span>{station.powerOutput} kW</span>
                      </div>
                      <div className="detail-item">
                        <Plug className="detail-icon" />
                        <span>{station.connectorType}</span>
                      </div>
                      <div className="detail-item">
                        <MapPin className="detail-icon" />
                        <span>
                          {station.location.latitude.toFixed(4)}, {station.location.longitude.toFixed(4)}
                        </span>
                      </div>
                    </div>

                    <div className="popup-actions">
                      <button onClick={() => navigate(`/edit-station/${station._id}`)} className="popup-button edit">
                        <Edit className="popup-button-icon" />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(station._id, station.name)} className="popup-button delete">
                        <Trash2 className="popup-button-icon" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Legend */}
      <div className="map-legend">
        <h4 className="legend-title">Station Status</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: "#10b981" }}></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: "#ef4444" }}></div>
            <span>Offline</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: "#f59e0b" }}></div>
            <span>Maintenance</span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default MapView
