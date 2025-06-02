import {
  Edit,
  Trash2,
  Power,
  Plug,
  MapPin,
  Search,
  Battery,
  Plus,
} from "lucide-react";

const StationGrid = ({
  stations,
  isLoading,
  onEdit,
  onDelete,
  onNavigate,
  getActiveFiltersCount,
  onClearFilters,
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "status-available";
      case "inactive":
        return "status-occupied";
      default:
        return "status-unknown";
    }
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading stations...</p>
      </div>
    );
  }

  if (stations.length === 0) {
    if (getActiveFiltersCount() > 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-content">
            <Search className="empty-state-icon" />
            <h3 className="empty-state-title">
              No stations match your filters
            </h3>
            <p className="empty-state-description">
              Try adjusting your search criteria or clearing some filters to see
              more results.
            </p>
            <button onClick={onClearFilters} className="action-button primary">
              Clear All Filters
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <Battery className="empty-state-icon" />
          <h3 className="empty-state-title">No stations available</h3>
          <p className="empty-state-description">
            Get started by adding your first charging station to the network.
          </p>
          <button
            onClick={() => onNavigate("/add-station")}
            className="action-button primary"
          >
            <Plus className="button-icon" />
            Add Your First Station
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stations-grid">
      {stations.map((station, index) => (
        <div key={station._id || index} className="station-card">
          <div className="station-header">
            <div className="station-title">
              <h3 className="station-name">{station.name}</h3>
              <span
                className={`station-status ${getStatusColor(station.status)}`}
              >
                {station.status}
              </span>
            </div>
            <div className="station-actions">
              <button
                onClick={() => onEdit(station._id)}
                className="icon-button edit"
                title="Edit Station"
              >
                <Edit className="icon" />
              </button>
              <button
                onClick={() => onDelete(station._id)}
                className="icon-button delete"
                title="Delete Station"
              >
                <Trash2 className="icon" />
              </button>
            </div>
          </div>

          <div className="station-details">
            <div className="detail-item">
              <Power className="detail-icon" />
              <span className="detail-label">Power Output:</span>
              <span className="detail-value">{station.powerOutput} kW</span>
            </div>

            <div className="detail-item">
              <Plug className="detail-icon" />
              <span className="detail-label">Connector:</span>
              <span className="detail-value">{station.connectorType}</span>
            </div>

            <div className="detail-item">
              <MapPin className="detail-icon" />
              <span className="detail-label">Location:</span>
              <span className="detail-value">
                {station.location?.city ? `${station.location.city}, ` : ""}(
                {station.location?.latitude}, {station.location?.longitude})
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationGrid;
