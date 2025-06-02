"use client"

import { Clock, Zap, Shield, TrendingUp, Users, Smartphone } from "lucide-react"

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Check station availability, pricing, and connector types in real-time before you arrive",
      iconClass: "realtime-icon",
    },
    {
      icon: Zap,
      title: "Ultra-Fast Charging",
      description: "Access ultra-fast charging stations with speeds up to 350kW for minimal wait times",
      iconClass: "fast-icon",
    },
    {
      icon: Shield,
      title: "Universal Compatibility",
      description: "Support for all major connector types and vehicle brands worldwide",
      iconClass: "compatible-icon",
    },
    {
      icon: TrendingUp,
      title: "Smart Route Planning",
      description: "AI-powered route planning that factors in your vehicle's range and charging needs",
      iconClass: "smart-icon",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join millions of EV drivers sharing reviews, tips, and real-time updates",
      iconClass: "community-icon",
    },
    {
      icon: Smartphone,
      title: "Seamless Payment",
      description: "One app, one account - pay at any station with contactless payment options",
      iconClass: "payment-icon",
    },
  ]

  return (
    <section className="features-section">
      <div className="section-header">
        <div className="section-badge">Features</div>
        <h2 className="section-title">Why Choose ChargeGlobal?</h2>
        <p className="section-description">
          Experience the future of electric vehicle charging with our comprehensive platform
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className={`feature-icon ${feature.iconClass}`}>
              <feature.icon />
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
