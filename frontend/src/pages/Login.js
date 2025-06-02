import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../utils"
import { Zap, ArrowLeft, Mail, Lock } from "lucide-react"
import "react-toastify/dist/ReactToastify.css"
import "./login.css"

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = loginInfo
    if (!email || !password) return handleError("Email and password are required")

    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login`
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      })

      const result = await response.json()
      const { success, message, jwtToken, name, error } = result

      if (success) {
        handleSuccess(message)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", name)
        setTimeout(() => navigate("/home"), 1000)
      } else {
        const errMsg = error?.details?.[0]?.message || message
        handleError(errMsg)
      }
    } catch (err) {
      handleError("Login failed. Please try again.")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card-wrapper">
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="back-link">
            <ArrowLeft className="back-icon" />
            <span>Back to home</span>
          </Link>

          <div className="logo-container">
            <div className="logo-circle">
              <Zap className="logo-icon" />
            </div>
          </div>

          <h1 className="welcome-text">Welcome back</h1>
          <p className="welcome-subtext">Sign in to your ChargeGlobal account</p>
        </div>

        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Sign In</h2>
            <p className="login-card-description">Enter your credentials to access your account</p>
          </div>

          <div className="login-card-content">
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-container">
                  <Mail className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={loginInfo.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>


              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <div className="divider">
              <span className="divider-text">Or continue with</span>
            </div>

            <div className="social-login">
              <button className="social-button" >
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </div>

            <div className="signup-link-container">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign up for free
              </Link>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
