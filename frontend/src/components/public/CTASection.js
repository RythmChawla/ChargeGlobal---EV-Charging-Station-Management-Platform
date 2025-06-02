import { Play, CheckCircle } from "lucide-react"

const CTASection = ({ onNavigate }) => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Start Your Electric Journey?</h2>
        <p className="cta-description">Join millions of drivers who trust ChargeGlobal for their charging needs</p>
        <div className="cta-buttons">
          <button onClick={() => onNavigate("/signup")} className="cta-button primary">
            Get Started Free
          </button>
          <button className="cta-button secondary">
            <Play className="button-icon" />
            Watch Demo
          </button>
        </div>
        <div className="cta-features">
          <div className="cta-feature">
            <CheckCircle className="feature-check" />
            <span>Free to join</span>
          </div>
          <div className="cta-feature">
            <CheckCircle className="feature-check" />
            <span>No monthly fees</span>
          </div>
          <div className="cta-feature">
            <CheckCircle className="feature-check" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
