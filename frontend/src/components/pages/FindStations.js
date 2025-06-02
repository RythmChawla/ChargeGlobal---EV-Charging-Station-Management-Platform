"use client"

import { useState, useEffect } from "react"
import { Map, List } from "lucide-react"
import SearchFilters from "../filters/SearchFilters"
import FilterPanel from "../filters/FilterPanel"
import StationGrid from "../business/StationGrid"

const FindStations = ({ onNavigate }) => {
  const [stations, setStations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState("list") // 'list' or 'map'

  const [filters, setFilters] = useState({
    status: "",
    connectorType: "",
    powerRange: "",
    city: "",
    search: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchPublicStations()
  }, [])

  const fetchPublicStations = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/stations`
      const response = await fetch(url)
      const result = await response.json()
      setStations(result)
    } catch (err) {
      console.error("Error fetching stations:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter stations based on current filters
  const filteredStations = stations.filter((station) => {
    // Only show active stations for public users
    if (station.status !== "Active") return false

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const matchesSearch =
        station.name?.toLowerCase().includes(searchTerm) ||
        station.location?.city?.toLowerCase().includes(searchTerm) ||
        station.location?.address?.toLowerCase().includes(searchTerm) ||
        station.connectorType?.toLowerCase().includes(searchTerm)

      if (!matchesSearch) return false
    }

    // Connector type filter
    if (filters.connectorType && station.connectorType !== filters.connectorType) {
      return false
    }

    // Power range filter
    if (filters.powerRange) {
      const power = station.powerOutput || 0
      switch (filters.powerRange) {
        case "low":
          if (power >= 50) return false
          break
        case "medium":
          if (power < 50 || power >= 150) return false
          break
        case "high":
          if (power < 150) return false
          break
        default:
          break
      }
    }

    // City filter
    if (filters.city && station.location?.city !== filters.city) {
      return false
    }

    return true
  })

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      status: "",
      connectorType: "",
      powerRange: "",
      city: "",
      search: "",
    })
  }

  const getUniqueValues = (field) => {
    if (!Array.isArray(stations)) return []

    const values = stations
      .filter((station) => station.status === "Active") // Only active stations
      .map((station) => {
        if (field.includes(".")) {
          const keys = field.split(".")
          return keys.reduce((obj, key) => obj?.[key], station)
        }
        return station[field]
      })
      .filter(Boolean)

    return [...new Set(values)].sort()
  }

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value !== "").length
  }

  return (
    <div className="find-stations-page">
      {/* Hero Section */}
      <section className="find-stations-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Charging Stations
            <span className="text-gradient"> Near You</span>
          </h1>
          <p className="hero-description">
            Discover available charging stations with real-time information on pricing, connector types, and
            availability.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="find-stations-search">
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={clearFilters}
          getActiveFiltersCount={getActiveFiltersCount}
        />

        {showFilters && (
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            getUniqueValues={getUniqueValues}
            getActiveFiltersCount={getActiveFiltersCount}
          />
        )}
      </section>

      {/* View Toggle and Results */}
      <section className="find-stations-results">
        <div className="results-header">
          <div className="results-info">
            <h2 className="results-title">Available Charging Stations</h2>
            <p className="results-count">
              {filteredStations.length} stations found
              {getActiveFiltersCount() > 0 && " (filtered)"}
            </p>
          </div>

          <div className="view-controls">
            <button
              className={`view-button ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="view-icon" />
              List
            </button>
            <button className={`view-button ${viewMode === "map" ? "active" : ""}`} onClick={() => setViewMode("map")}>
              <Map className="view-icon" />
              Map
            </button>
          </div>
        </div>

        {/* Results Content */}
        <div className="results-content">
          {viewMode === "list" ? (
            <StationGrid
              stations={filteredStations}
              isLoading={isLoading}
              onEdit={() => {}} // No edit for public users
              onDelete={() => {}} // No delete for public users
              onNavigate={onNavigate}
              getActiveFiltersCount={getActiveFiltersCount}
              onClearFilters={clearFilters}
              isPublic={true} // Hide edit/delete buttons
            />
          ) : (
            <div className="map-placeholder">
              <div className="map-placeholder-content">
                <Map className="map-placeholder-icon" />
                <h3>Map View Coming Soon</h3>
                <p>Interactive map view will be available in the next update</p>
                <button onClick={() => onNavigate("/map")} className="action-button primary">
                  View Full Map
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default FindStations
