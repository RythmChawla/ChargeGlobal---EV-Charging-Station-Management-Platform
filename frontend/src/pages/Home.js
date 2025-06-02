import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleError, handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"
import Header from "../components/common/Header"
import PublicHomePage from "../components/public/PublicHomePage"
import BusinessDashboard from "../components/business/BusinessDashboard"
import FindStations from "../components/pages/FindStations"
import "leaflet/dist/leaflet.css"
import "react-toastify/dist/ReactToastify.css"
import "./Home.css"

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [stations, setStations] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState("home")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("loggedInUser")

    if (token && user) {
      setLoggedInUser(user)
      setIsAuthenticated(true)
      fetchStations()
    } else {
      setIsAuthenticated(false)
      setIsLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    setIsAuthenticated(false)
    setLoggedInUser("")
    setStations([])
    setCurrentPage("home")
    handleSuccess("User logged out")
  }

  const handleNavigate = (path) => {
    // Handle internal navigation
    if (path.startsWith("/")) {
      if (path === "/") {
        setCurrentPage("home")
      } else if (path === "/find-stations") {
        setCurrentPage("find-stations")
      } else {
        // External routes (login, signup, map, etc.)
        navigate(path)
      }
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this station?")) {
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
      fetchStations() // refresh the list
    } catch (err) {
      handleError(err)
    }
  }

  const fetchStations = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/stations`
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      const response = await fetch(url, headers)
      const result = await response.json()
      setStations(result)
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "find-stations":
        return <FindStations onNavigate={handleNavigate} />
      case "home":
      default:
        if (isAuthenticated) {
          return (
            <BusinessDashboard
              stations={stations}
              isLoading={isLoading}
              onEdit={(id) => navigate(`/edit-station/${id}`)}
              onDelete={handleDelete}
              onNavigate={navigate}
            />
          )
        } else {
          return <PublicHomePage onNavigate={handleNavigate} />
        }
    }
  }

  return (
    <div className="home-container">
      <Header
        isAuthenticated={isAuthenticated}
        loggedInUser={loggedInUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        <div className="content-wrapper">{renderCurrentPage()}</div>
      </main>

      <ToastContainer />
    </div>
  )
}

export default Home
