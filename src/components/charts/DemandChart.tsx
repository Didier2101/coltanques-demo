import { demandData } from "../../data/demandData";

export default function DemandChart() {
    // Calcular demanda por tipo de carga
    const demandaPorTipo = demandData.reduce((acc, item) => {
        acc[item.tipoCarga] = (acc[item.tipoCarga] || 0) + item.volumen;
        return acc;
    }, {} as Record<string, number>);

    // Calcular demanda por ubicación (separada por tipo)
    const demandaPorUbicacion = demandData.reduce((acc, item) => {
        if (!acc[item.destino]) {
            acc[item.destino] = { Seca: 0, Líquida: 0 };
        }
        acc[item.destino][item.tipoCarga] += item.volumen;
        return acc;
    }, {} as Record<string, Record<string, number>>);

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
                                <span className="font-medium">
                                    {volumen.toLocaleString()} {tipo === "Líquida" ? "L" : "TPM"}
                                </span>
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
                <div className="space-y-3">
                    {Object.entries(demandaPorUbicacion)
                        .sort((a, b) => (b[1].Seca + b[1].Líquida) - (a[1].Seca + a[1].Líquida))
                        .map(([ciudad, tipos]) => (
                            <div key={ciudad} className="border-l-2 border-gray-200 pl-3">
                                <div className="font-medium text-sm text-gray-700 mb-1">{ciudad}</div>
                                {tipos.Seca > 0 && (
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>• Carga Seca</span>
                                        <span>{tipos.Seca.toLocaleString()} TPM</span>
                                    </div>
                                )}
                                {tipos.Líquida > 0 && (
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>• Carga Líquida</span>
                                        <span>{tipos.Líquida.toLocaleString()} L</span>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}