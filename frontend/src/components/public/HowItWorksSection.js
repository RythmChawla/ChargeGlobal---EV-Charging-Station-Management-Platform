"use client"

import { Search, MapPin, Plug, Smartphone } from "lucide-react"

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Find Stations",
      description: "Search for nearby charging stations using our app or website",
      iconClass: "search-step",
    },
    {
      icon: MapPin,
      title: "2. Navigate",
      description: "Get turn-by-turn directions to your chosen charging station",
      iconClass: "navigate-step",
    },
    {
      icon: Plug,
      title: "3. Plug & Charge",
      description: "Simply plug in your vehicle and start charging immediately",
      iconClass: "charge-step",
    },
    {
      icon: Smartphone,
      title: "4. Pay Seamlessly",
      description: "Automatic payment through the app - no cards needed",
      iconClass: "pay-step",
    },
  ]

  return (
    <section className="how-it-works">
      <div className="section-header">
        <div className="section-badge">How It Works</div>
        <h2 className="section-title">Simple. Fast. Reliable.</h2>
        <p className="section-description">Get charged in just a few simple steps</p>
      </div>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div className={`step-icon ${step.iconClass}`}>
              <step.icon />
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorksSection
