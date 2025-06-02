import { handleSuccess, handleError } from "../utils"
import { ToastContainer } from "react-toastify"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Zap, ArrowLeft, MapPin, Battery, Plug, Power, Save, Building, Navigation } from "lucide-react"
import "react-toastify/dist/ReactToastify.css"
import "./station-form.css"

function StationForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    status: "Active",
    powerOutput: "",
    connectorType: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isEdit) {
      const fetchStation = async () => {
        setIsLoading(true)
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/stations/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          const data = await res.json()
          setFormData({
            name: data.name,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            powerOutput: data.powerOutput,
            connectorType: data.connectorType,
            status: data.status,
          })
        } catch (err) {
          handleError("Failed to fetch station")
        } finally {
          setIsLoading(false)
        }
      }
      fetchStation()
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      const url = isEdit
        ? `${process.env.REACT_APP_API_URL}/stations/${id}`
        : `${process.env.REACT_APP_API_URL}/stations`

      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          location: {
            latitude: Number.parseFloat(formData.latitude),
            longitude: Number.parseFloat(formData.longitude),
          },
          status: formData.status,
          powerOutput: Number.parseFloat(formData.powerOutput),
          connectorType: formData.connectorType,
        }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Failed to save station")

      handleSuccess(isEdit ? "Station updated successfully" : "Station added successfully")
      navigate("/home")
    } catch (err) {
      handleError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const connectorTypes = [
    "Type 1 (J1772)",
    "Type 2 (Mennekes)",
    "CCS1",
    "CCS2",
    "CHAdeMO",
    "Tesla Supercharger",
    "GB/T",
  ]

  return (
    <div className="station-form-container">
      {/* Header */}
      <header className="form-header">
        <div className="header-content">
          <button onClick={() => navigate("/home")} className="back-button">
            <ArrowLeft className="back-icon" />
            <span>Back to Stations</span>
          </button>

          <div className="logo-container">
            <div className="logo-circle">
              <Zap className="logo-icon" />
            </div>
            <span className="logo-text">ChargeGlobal</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="form-main">
        <div className="form-wrapper">
          <div className="form-card">
            <div className="form-card-header">
              <div className="form-title-section">
                <h1 className="form-title">{isEdit ? "Edit" : "Add"} Charging Station</h1>
                <p className="form-subtitle">
                  {isEdit ? "Update the charging station information" : "Add a new charging station to your network"}
                </p>
              </div>
            </div>

            <div className="form-card-content">
              <form onSubmit={handleSubmit} className="station-form">
                {/* Station Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <Building className="label-icon" />
                    Station Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter station name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                {/* Location Section */}
                <div className="form-section">
                  <h3 className="section-title">
                    <MapPin className="section-icon" />
                    Location
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="latitude" className="form-label">
                        Latitude
                      </label>
                      <input
                        id="latitude"
                        type="number"
                        name="latitude"
                        placeholder="e.g., 28.6139"
                        value={formData.latitude}
                        onChange={handleChange}
                        className="form-input"
                        step="any"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="longitude" className="form-label">
                        Longitude
                      </label>
                      <input
                        id="longitude"
                        type="number"
                        name="longitude"
                        placeholder="e.g., 77.2090"
                        value={formData.longitude}
                        onChange={handleChange}
                        className="form-input"
                        step="any"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="form-section">
                  <h3 className="section-title">
                    <Power className="section-icon" />
                    Technical Specifications
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="powerOutput" className="form-label">
                        <Battery className="label-icon" />
                        Power Output (kW)
                      </label>
                      <input
                        id="powerOutput"
                        type="number"
                        name="powerOutput"
                        placeholder="e.g., 50"
                        value={formData.powerOutput}
                        onChange={handleChange}
                        className="form-input"
                        min="1"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="connectorType" className="form-label">
                        <Plug className="label-icon" />
                        Connector Type
                      </label>
                      <select
                        id="connectorType"
                        name="connectorType"
                        value={formData.connectorType}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select connector type</option>
                        {connectorTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="form-group">
                  <label htmlFor="status" className="form-label">
                    <Navigation className="label-icon" />
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange} 
                    className="form-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="cancel-button"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? (
                      <div className="loading-spinner" />
                    ) : (
                      <>
                        <Save className="button-icon" />
                        {isEdit ? "Update Station" : "Add Station"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer />
    </div>
  )
}

export default StationForm
