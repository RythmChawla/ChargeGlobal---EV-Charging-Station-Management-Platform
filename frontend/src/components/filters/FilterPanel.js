"use client"

const FilterPanel = ({ filters, onFilterChange, getUniqueValues, getActiveFiltersCount }) => {
  return (
    <div className="filters-panel">
      <div className="filters-grid">
        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Connector Type Filter */}
        <div className="filter-group">
          <label className="filter-label">Connector Type</label>
          <select
            value={filters.connectorType}
            onChange={(e) => onFilterChange("connectorType", e.target.value)}
            className="filter-select"
          >
            <option value="">All Connectors</option>
            {getUniqueValues("connectorType").map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Power Range Filter */}
        <div className="filter-group">
          <label className="filter-label">Power Output</label>
          <select
            value={filters.powerRange}
            onChange={(e) => onFilterChange("powerRange", e.target.value)}
            className="filter-select"
          >
            <option value="">All Power Levels</option>
            <option value="low">Low (0-50 kW)</option>
            <option value="medium">Medium (50-150 kW)</option>
            <option value="high">High (150+ kW)</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="active-filters">
          <span className="active-filters-label">Active filters:</span>
          <div className="active-filters-list">
            {filters.search && (
              <span className="filter-tag">
                Search: "{filters.search}"
                <button onClick={() => onFilterChange("search", "")} className="filter-tag-remove">
                  ×
                </button>
              </span>
            )}
            {filters.status && (
              <span className="filter-tag">
                Status: {filters.status}
                <button onClick={() => onFilterChange("status", "")} className="filter-tag-remove">
                  ×
                </button>
              </span>
            )}
            {filters.connectorType && (
              <span className="filter-tag">
                Connector: {filters.connectorType}
                <button onClick={() => onFilterChange("connectorType", "")} className="filter-tag-remove">
                  ×
                </button>
              </span>
            )}
            {filters.powerRange && (
              <span className="filter-tag">
                Power:{" "}
                {filters.powerRange === "low" ? "0-50 kW" : filters.powerRange === "medium" ? "50-150 kW" : "150+ kW"}
                <button onClick={() => onFilterChange("powerRange", "")} className="filter-tag-remove">
                  ×
                </button>
              </span>
            )}
            {filters.city && (
              <span className="filter-tag">
                City: {filters.city}
                <button onClick={() => onFilterChange("city", "")} className="filter-tag-remove">
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
