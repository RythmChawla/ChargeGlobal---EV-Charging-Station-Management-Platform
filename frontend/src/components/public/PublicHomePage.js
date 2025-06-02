import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

const PublicHomePage = ({ onNavigate }) => {
  return (
    <div className="public-home">
      <HeroSection onNavigate={onNavigate} />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};

export default PublicHomePage;
