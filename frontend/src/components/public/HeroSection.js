import { Search, Globe } from "lucide-react"

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <Globe className="badge-icon" />
            Global Network
          </div>
          <h1 className="hero-title">
            Power Your Journey
            <span className="hero-title-gradient">Anywhere</span>
          </h1>
          <p className="hero-description">
            Discover and access over 500,000 charging stations worldwide. Fast, reliable, and always available when you
            need them most.
          </p>

          <div className="hero-search">
            <div className="search-container">
              <Search className="search-icon" />
              <input type="text" placeholder="Search by city, address, or station name..." className="search-input" />
            </div>
            <button className="search-button" onClick={() => onNavigate("/find-stations")}>
              Find Stations
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Charging Points</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">180+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://www.evcglobal.in/assets/img/Charger1.png"
            alt="Electric vehicle charging station"
            className="hero-img"
          />
          <div className="availability-indicator">
            <div className="indicator-dot"></div>
            <span>Available Now</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
