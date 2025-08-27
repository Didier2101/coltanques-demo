import { vehicles } from "../../data/vehicles";
import { drivers } from "../../data/drivers";

export default function AlertSection() {
    // Vehículos que requieren mantenimiento pronto
    const vehiculosMantenimiento = vehicles.filter(v => {
        const proximoMaint = new Date(v.proximoMantenimiento);
        const hoy = new Date();
        const diffTime = Math.abs(proximoMaint.getTime() - hoy.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7; // Mantenimiento en los próximos 7 días
    });

    // Conductores con poco tiempo de descanso
    const conductoresPocoDescanso = drivers.filter(d => d.tiempoDescanso < 8);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Alertas del Sistema</h3>

            <div className="space-y-3">
                {vehiculosMantenimiento.length > 0 && (
                    <div className="flex items-start p-3 bg-yellow-50 border border-gray-100 border border-gray-100-yellow-200 rounded-md">
                        <div className="flex-shrink-0 w-5 h-5 text-yellow-600 mt-0.5">⚠️</div>
                        <div className="ml-3">
                            <h4 className="text-sm font-medium text-yellow-800">Mantenimiento Requerido</h4>
                            <p className="text-sm text-yellow-700">
                                {vehiculosMantenimiento.length} vehículo(s) requiere(n) mantenimiento en los próximos 7 días.
                            </p>
                        </div>
                    </div>
                )}

                {conductoresPocoDescanso.length > 0 && (
                    <div className="flex items-start p-3 bg-red-50 border border-gray-100 border border-gray-100-red-200 rounded-md">
                        <div className="flex-shrink-0 w-5 h-5 text-red-600 mt-0.5">⏱️</div>
                        <div className="ml-3">
                            <h4 className="text-sm font-medium text-red-800">Tiempo de Descanso Insuficiente</h4>
                            <p className="text-sm text-red-700">
                                {conductoresPocoDescanso.length} conductor(es) tiene(n) menos de 8 horas de descanso.
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex items-start p-3 bg-blue-50 border border-gray-100 border border-gray-100-blue-200 rounded-md">
                    <div className="flex-shrink-0 w-5 h-5 text-blue-600 mt-0.5">ℹ️</div>
                    <div className="ml-3">
                        <h4 className="text-sm font-medium text-blue-800">Optimización de Rutas</h4>
                        <p className="text-sm text-blue-700">
                            El sistema ha identificado oportunidades de optimización en 3 rutas frecuentes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}