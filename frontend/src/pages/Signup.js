import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../utils"
import { Zap, ArrowLeft, User, Mail, Lock } from "lucide-react"
import "react-toastify/dist/ReactToastify.css"
import "./signup.css"

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    const copySignupInfo = { ...signupInfo }
    copySignupInfo[name] = value
    setSignupInfo(copySignupInfo)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const { name, email, password } = signupInfo
    if (!name || !email || !password) {
      return handleError("name, email and password are required")
    }
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/signup`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      })
      const result = await response.json()
      const { success, message, error } = result
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate("/login")
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
      console.log(result)
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card-wrapper">
        {/* Header */}
        <div className="signup-header">
          <Link to="/" className="back-link">
            <ArrowLeft className="back-icon" />
            <span>Back to home</span>
          </Link>

          <div className="logo-container">
            <div className="logo-circle">
              <Zap className="logo-icon" />
            </div>
          </div>

          <h1 className="welcome-text">Join ChargeGlobal</h1>
          <p className="welcome-subtext">Create your account and start charging</p>
        </div>

        <div className="signup-card">
          <div className="signup-card-header">
            <h2 className="signup-card-title">Create Account</h2>
            <p className="signup-card-description">Fill in your details to get started</p>
          </div>

          <div className="signup-card-content">
            <form onSubmit={handleSignup} className="signup-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={signupInfo.name}
                    onChange={handleChange}
                    className="form-input"
                    autoFocus
                    required
                  />
                </div>
              </div>

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
                    placeholder="Enter your email"
                    value={signupInfo.email}
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
                    placeholder="Create a strong password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>


              <button type="submit" className="signup-button">
                Create Account
              </button>
            </form>

            <div className="divider">
              <span className="divider-text">Or sign up with</span>
            </div>

            <div className="social-login">
              <button className="social-button">
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

            <div className="login-link-container">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign in here
              </Link>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
