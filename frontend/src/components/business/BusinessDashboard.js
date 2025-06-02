import { useState } from "react";
import { Map, Plus } from "lucide-react";
import DashboardStats from "./DashboardStats";
import SearchFilters from "../filters/SearchFilters";
import FilterPanel from "../filters/FilterPanel";
import StationGrid from "./StationGrid";

const BusinessDashboard = ({
  stations,
  isLoading,
  onEdit,
  onDelete,
  onNavigate,
}) => {
  const [filters, setFilters] = useState({
    status: "",
    connectorType: "",
    powerRange: "",
    city: "",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter stations based on current filters
  const filteredStations = stations.filter((station) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        station.name?.toLowerCase().includes(searchTerm) ||
        station.location?.city?.toLowerCase().includes(searchTerm) ||
        station.location?.address?.toLowerCase().includes(searchTerm) ||
        station.connectorType?.toLowerCase().includes(searchTerm);

      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && station.status !== filters.status) {
      return false;
    }

    // Connector type filter
    if (
      filters.connectorType &&
      station.connectorType !== filters.connectorType
    ) {
      return false;
    }

    // Power range filter
    if (filters.powerRange) {
      const power = station.powerOutput || 0;
      switch (filters.powerRange) {
        case "low":
          if (power >= 50) return false;
          break;
        case "medium":
          if (power < 50 || power >= 150) return false;
          break;
        case "high":
          if (power < 150) return false;
          break;
        default:
          break;
      }
    }

    // City filter
    if (filters.city && station.location?.city !== filters.city) {
      return false;
    }

    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      connectorType: "",
      powerRange: "",
      city: "",
      search: "",
    });
  };

  const getUniqueValues = (field) => {
    if (!Array.isArray(stations)) return [];

    const values = stations
      .map((station) => {
        if (field.includes(".")) {
          const keys = field.split(".");
          return keys.reduce((obj, key) => obj?.[key], station);
        }
        return station[field];
      })
      .filter(Boolean);

    return [...new Set(values)].sort();
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value !== "").length;
  };

  return (
    <div className="dashboard">
      <DashboardStats stations={stations} />

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

      {/* Page Title and Actions */}
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Charging Stations</h1>
          <p className="page-subtitle">
            {filteredStations.length} of {stations.length} stations
            {getActiveFiltersCount() > 0 && " (filtered)"}
          </p>
        </div>

        <div className="action-buttons">
          <button
            onClick={() => onNavigate("/map")}
            className="action-button secondary"
          >
            <Map className="button-icon" />
            View Map
          </button>
          <button
            onClick={() => onNavigate("/add-station")}
            className="action-button primary"
          >
            <Plus className="button-icon" />
            Add Station
          </button>
        </div>
      </div>

      <div className="stations-section">
        <StationGrid
          stations={filteredStations}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
          onNavigate={onNavigate}
          getActiveFiltersCount={getActiveFiltersCount}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default BusinessDashboard;
