

export default function RevenueCostChart() {
    // Agrupar ingresos y costos por mes (ejemplo simplificado)
    const datosMensuales = [
        { mes: "Enero", ingresos: 12000000, costos: 8000000 },
        { mes: "Febrero", ingresos: 15000000, costos: 9500000 },
        { mes: "Marzo", ingresos: 18000000, costos: 11000000 },
        { mes: "Abril", ingresos: 16500000, costos: 10500000 },
        { mes: "Mayo", ingresos: 19500000, costos: 12500000 },
        { mes: "Junio", ingresos: 21000000, costos: 13500000 },
    ];

    const maxValor = Math.max(
        ...datosMensuales.map(d => d.ingresos),
        ...datosMensuales.map(d => d.costos)
    );

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Evolución de Ingresos vs Costos</h3>

            <div className="flex items-end justify-between h-64 mt-8">
                {datosMensuales.map((dato, index) => {
                    const alturaIngresos = (dato.ingresos / maxValor) * 100;
                    const alturaCostos = (dato.costos / maxValor) * 100;
                    const utilidad = dato.ingresos - dato.costos;

                    return (
                        <div key={index} className="flex flex-col items-center w-16">
                            <div className="flex flex-col items-center w-full">
                                <div
                                    className="w-10 bg-green-500 rounded-t"
                                    style={{ height: `${alturaIngresos}%` }}
                                ></div>
                                <div
                                    className="w-10 bg-red-500"
                                    style={{ height: `${alturaCostos}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">{dato.mes}</div>
                            <div className={`text-xs mt-1 font-medium ${utilidad >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${(utilidad / 1000000).toFixed(1)}M
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Ingresos</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Costos</span>
                </div>
            </div>
        </div>
    );
}