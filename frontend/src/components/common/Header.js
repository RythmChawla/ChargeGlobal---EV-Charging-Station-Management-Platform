import { Zap, LogOut, User, Menu } from "lucide-react"
import { useState } from "react"

const Header = ({ isAuthenticated, loggedInUser, onLogout, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { label: "Find Stations", href: "/find-stations", id: "find-stations" },
  ]

  const businessNavItems = [
    { label: "Map", href: "/map", id: "map" },
    { label: "Add Station", href: "/add-station", id: "add-station" },
  ]

  return (
    <header className="home-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-container" onClick={() => onNavigate("/")}>
            <div className="logo-circle">
              <Zap className="logo-icon" />
            </div>
            <span className="logo-text">ChargeGlobal</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {navigationItems.map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.href)} className="nav-link">
              {item.label}
            </button>
          ))}

          {isAuthenticated && (
            <>
              {businessNavItems.map((item) => (
                <button key={item.id} onClick={() => onNavigate(item.href)} className="nav-link">
                  {item.label}
                </button>
              ))}
            </>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="header-right">
          {isAuthenticated ? (
            <>
              <div className="user-info">
                <User className="user-icon" />
                <span className="user-name">Welcome, {loggedInUser}</span>
              </div>
              <button onClick={onLogout} className="logout-button">
                <LogOut className="logout-icon" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onNavigate("/login")} className="login-button">
                Login
              </button>
              <button onClick={() => onNavigate("/signup")} className="signup-button">
                SignUp
              </button>
            </>
          )}

          <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="menu-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.href)
                  setIsMobileMenuOpen(false)
                }}
                className="mobile-nav-link"
              >
                {item.label}
              </button>
            ))}

            {isAuthenticated && (
              <>
                <div className="mobile-menu-divider" />
                {businessNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    className="mobile-nav-link"
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
