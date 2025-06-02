"use client"

import { Search } from "lucide-react"

const SearchFilters = ({
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  onClearFilters,
  getActiveFiltersCount,
}) => {
  return (
    <section className="search-filters-section">
      <div className="search-filters-header">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search stations, cities, or connector types..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <button onClick={onToggleFilters} className={`filter-toggle ${showFilters ? "active" : ""}`}>
            <svg className="filter-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filters
            {getActiveFiltersCount() > 0 && <span className="filter-badge">{getActiveFiltersCount()}</span>}
          </button>

          {getActiveFiltersCount() > 0 && (
            <button onClick={onClearFilters} className="clear-filters">
              Clear All
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default SearchFilters
