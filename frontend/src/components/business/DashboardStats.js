import { Battery, Zap, Power} from "lucide-react";

const DashboardStats = ({ stations }) => {

  const stats = [
    {
      icon: Battery,
      value: stations.length,
      label: "Total Stations",
      iconClass: "total-icon",
    },
    {
      icon: Zap,
      value: stations.filter((s) => s.status === "Active").length,
      label: "Active Stations",
      iconClass: "active-icon",
    },
    {
      icon: Power,
      value: `${stations.reduce(
        (total, station) => total + (station.powerOutput || 0),
        0
      )} kW`,
      label: "Total Power",
      iconClass: "power-icon",
    },
  ];

  return (
    <section className="dashboard-stats">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.iconClass}`}>
              <stat.icon />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
