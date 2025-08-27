import { demandData } from "../../data/demandData";

export default function DemandChart() {
    // Calcular demanda por tipo de carga
    const demandaPorTipo = demandData.reduce((acc, item) => {
        acc[item.tipoCarga] = (acc[item.tipoCarga] || 0) + item.volumen;
        return acc;
    }, {} as Record<string, number>);

    // Calcular demanda por ubicación
    const demandaPorUbicacion = demandData.reduce((acc, item) => {
        acc[item.destino] = (acc[item.destino] || 0) + item.volumen;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Distribución de Demanda</h3>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Por Tipo de Carga</h4>
                <div className="space-y-2">
                    {Object.entries(demandaPorTipo).map(([tipo, volumen]) => (
                        <div key={tipo}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">{tipo}</span>
                                <span className="font-medium">{volumen.toLocaleString()} L</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${tipo === "Líquida" ? "bg-blue-500" : "bg-amber-500"}`}
                                    style={{ width: `${(volumen / Object.values(demandaPorTipo).reduce((a, b) => a + b, 0)) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Por Ubicación de Destino</h4>
                <div className="space-y-2">
                    {Object.entries(demandaPorUbicacion)
                        .sort((a, b) => b[1] - a[1])
                        .map(([ciudad, volumen]) => (
                            <div key={ciudad} className="flex justify-between text-sm">
                                <span className="text-gray-600">{ciudad}</span>
                                <span className="font-medium">{volumen.toLocaleString()} L</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}