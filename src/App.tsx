import { useState } from "react";
import DashboardOptimizacion from "./components/dashboard/DashboardOptimizacion";
import PlanificadorRutas from "./components/routes/PlanificadorRutas";
import GestorFlota from "./components/fleet/GestorFlota";
import AnalisisRentabilidad from "./components/profitability/AnalisisRentabilidad";
import MonitorDespachos from "./components/dispatches/MonitorDespachos";
import TabNavigation from "./components/ui/TabNavigation";
import Header from "./components/ui/Header";

export default function SistemaOptimizacion() {
  const [vistaActiva, setVistaActiva] = useState<string>("dashboard");

  const renderVista = () => {
    switch (vistaActiva) {
      case "dashboard":
        return <DashboardOptimizacion />;
      case "rutas":
        return <PlanificadorRutas />;
      case "flota":
        return <GestorFlota />;
      case "rentabilidad":
        return <AnalisisRentabilidad />;
      case "despachos":
        return <MonitorDespachos />;
      default:
        return <DashboardOptimizacion />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TabNavigation vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderVista()}
      </main>
    </div>
  );
}