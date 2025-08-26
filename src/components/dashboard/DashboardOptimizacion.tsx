import { useState, useEffect } from "react";
import { vehicles } from "../../data/vehicles";
import { drivers } from "../../data/drivers";
import { demandData } from "../../data/demandData";
import MetricCard from "../ui/MetricCard";

import AlertSection from "./AlertSection";
import DemandChart from "../charts/DemandChart";
import VehicleStatusChart from "../charts/VehicleStatusChart";
import KpiSection from "./KpiSection";

export default function DashboardOptimizacion() {
    const [metricas, setMetricas] = useState({
        vehiculosDisponibles: 0,
        conductoresActivos: 0,
        despachosHoy: 0,
        nivelServicio: 0,
        costosCombustible: 0,
        ingresosTotales: 0
    });

    useEffect(() => {
        // Calcular métricas iniciales
        const vehiculosDisponibles = vehicles.filter(v => v.estado === "Excelente" || v.estado === "Bueno").length;
        const conductoresActivos = drivers.filter(d => d.activo).length;
        const despachosHoy = demandData.filter(d =>
            new Date(d.fecha).toDateString() === new Date().toDateString()
        ).length;

        // Calcular nivel de servicio (ejemplo simplificado)
        const entregasOntiempo = demandData.filter(d => d.entregadoATiempo).length;
        const nivelServicio = demandData.length > 0 ? (entregasOntiempo / demandData.length) * 100 : 0;

        setMetricas({
            vehiculosDisponibles,
            conductoresActivos,
            despachosHoy,
            nivelServicio: Math.round(nivelServicio * 10) / 10,
            costosCombustible: 0, // Se calcularían con datos reales
            ingresosTotales: 0    // Se calcularían con datos reales
        });
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard de Optimización</h2>
                <p className="text-gray-600">
                    Visualización de métricas críticas para la optimización de despachos y gestión de flota.
                </p>
            </div>

            {/* Alertas importantes */}
            <AlertSection />

            {/* KPIs principales */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <MetricCard
                    titulo="Vehículos Disponibles"
                    valor={metricas.vehiculosDisponibles}
                    subtitulo={`de ${vehicles.length} totales`}
                    tendencia={{ valor: 5, esPositivo: true }}
                />
                <MetricCard
                    titulo="Conductores Activos"
                    valor={metricas.conductoresActivos}
                    subtitulo={`de ${drivers.length} totales`}
                    tendencia={{ valor: 2, esPositivo: true }}
                />
                <MetricCard
                    titulo="Despachos Hoy"
                    valor={metricas.despachosHoy}
                    subtitulo="programados"
                    tendencia={{ valor: 3, esPositivo: false }}
                />
                <MetricCard
                    titulo="Nivel de Servicio"
                    valor={`${metricas.nivelServicio}%`}
                    subtitulo="entregas a tiempo"
                    tendencia={{ valor: 2.5, esPositivo: true }}
                />
                <MetricCard
                    titulo="Costos Combustible"
                    valor={`$${(metricas.costosCombustible / 1000000).toFixed(1)}M`}
                    subtitulo="este mes"
                    tendencia={{ valor: 8, esPositivo: false }}
                />
                <MetricCard
                    titulo="Ingresos Totales"
                    valor={`$${(metricas.ingresosTotales / 1000000).toFixed(1)}M`}
                    subtitulo="este mes"
                    tendencia={{ valor: 12, esPositivo: true }}
                />
            </div>

            {/* Gráficos y secciones adicionales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DemandChart />
                <VehicleStatusChart />
            </div>

            <KpiSection />
        </div>
    );
}