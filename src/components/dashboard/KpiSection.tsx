import { demandData } from "../../data/demandData";

export default function KpiSection() {
    // Calcular KPIs importantes
    const entregasOntiempo = demandData.filter(d => d.entregadoATiempo).length;
    const tasaCumplimiento = demandData.length > 0 ? (entregasOntiempo / demandData.length) * 100 : 0;

    const ingresosTotales = demandData.reduce((sum, d) => sum + d.ingresosEstimados, 0);
    const volumenTotal = demandData.reduce((sum, d) => sum + d.volumen, 0);

    const cargasLiquidas = demandData.filter(d => d.tipoCarga === "Líquida").length;
    const cargasSecas = demandData.filter(d => d.tipoCarga === "Seca").length;

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Indicadores Clave de Desempeño</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{tasaCumplimiento.toFixed(1)}%</div>
                    <div className="text-sm text-blue-600">Tasa de Cumplimiento</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">${(ingresosTotales / 1000000).toFixed(1)}M</div>
                    <div className="text-sm text-green-600">Ingresos Totales</div>
                </div>

                <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-700">{(volumenTotal / 1000).toFixed(0)}k L</div>
                    <div className="text-sm text-amber-600">Volumen Transportado</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{cargasLiquidas}:{cargasSecas}</div>
                    <div className="text-sm text-purple-600">Líquida:Seca Ratio</div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Distribución por Prioridad</h4>
                    <div className="space-y-2">
                        {["Alta", "Media", "Baja"].map(prioridad => {
                            const count = demandData.filter(d => d.prioridad === prioridad).length;
                            const percentage = (count / demandData.length) * 100;

                            return (
                                <div key={prioridad}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Prioridad {prioridad}</span>
                                        <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${prioridad === "Alta"
                                                    ? "bg-red-500"
                                                    : prioridad === "Media"
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Estado de Despachos</h4>
                    <div className="space-y-2">
                        {["Completado", "En proceso", "Pendiente"].map(estado => {
                            const count = demandData.filter(d => d.estado === estado).length;
                            const percentage = (count / demandData.length) * 100;

                            return (
                                <div key={estado}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">{estado}</span>
                                        <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${estado === "Completado"
                                                    ? "bg-green-500"
                                                    : estado === "En proceso"
                                                        ? "bg-blue-500"
                                                        : "bg-gray-500"
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}