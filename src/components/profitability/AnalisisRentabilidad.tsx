import { demandData } from "../../data/demandData";
import RevenueCostChart from "../charts/RevenueCostChart";



export default function AnalisisRentabilidad() {
    // Calcular métricas de rentabilidad
    const ingresosTotales = demandData.reduce((sum, d) => sum + d.ingresosEstimados, 0);
    const costosEstimados = demandData.reduce((sum, d) => sum + (d.ingresosEstimados * 0.6), 0); // Estimación simplificada
    const utilidadEstimada = ingresosTotales - costosEstimados;
    const margenUtilidad = (utilidadEstimada / ingresosTotales) * 100;

    // Calcular rentabilidad por tipo de carga
    const rentabilidadPorTipo = demandData.reduce((acc, d) => {
        const costo = d.ingresosEstimados * 0.6; // Estimación
        const utilidad = d.ingresosEstimados - costo;

        if (!acc[d.tipoCarga]) {
            acc[d.tipoCarga] = { ingresos: 0, costos: 0, utilidad: 0 };
        }

        acc[d.tipoCarga].ingresos += d.ingresosEstimados;
        acc[d.tipoCarga].costos += costo;
        acc[d.tipoCarga].utilidad += utilidad;

        return acc;
    }, {} as Record<string, { ingresos: number; costos: number; utilidad: number }>);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Análisis de Rentabilidad</h2>
                <p className="text-gray-600">
                    Evalúa la rentabilidad de tus operaciones por tipo de carga, ruta y cliente.
                </p>
            </div>

            {/* KPIs de rentabilidad */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">${(ingresosTotales / 1000000).toFixed(1)}M</div>
                    <div className="text-sm text-gray-600">Ingresos Totales</div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">${(costosEstimados / 1000000).toFixed(1)}M</div>
                    <div className="text-sm text-gray-600">Costos Estimados</div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">${(utilidadEstimada / 1000000).toFixed(1)}M</div>
                    <div className="text-sm text-gray-600">Utilidad Estimada</div>
                </div>
            </div>

            {/* Margen de utilidad */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Margen de Utilidad</h3>
                <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="text-gray-200 stroke-current"
                                strokeWidth="10"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                            />
                            <circle
                                className="text-green-500 stroke-current"
                                strokeWidth="10"
                                strokeLinecap="round"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                strokeDasharray="251.2"
                                strokeDashoffset={251.2 - (margenUtilidad / 100) * 251.2}
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-2xl font-bold text-gray-800">{margenUtilidad.toFixed(1)}%</div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4 text-sm text-gray-600">
                    Margen de utilidad estimado sobre los ingresos
                </div>
            </div>

            {/* Rentabilidad por tipo de carga */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Rentabilidad por Tipo de Carga</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo de Carga
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ingresos
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Costos
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Utilidad
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Margen
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(rentabilidadPorTipo).map(([tipo, datos]) => {
                                const margen = (datos.utilidad / datos.ingresos) * 100;
                                return (
                                    <tr key={tipo}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {tipo}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                            ${(datos.ingresos / 1000000).toFixed(2)}M
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                            ${(datos.costos / 1000000).toFixed(2)}M
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                            ${(datos.utilidad / 1000000).toFixed(2)}M
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                                            <span className={`font-medium ${margen >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {margen.toFixed(1)}%
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Gráfico de ingresos vs costos */}
            <RevenueCostChart />
        </div>
    );
}