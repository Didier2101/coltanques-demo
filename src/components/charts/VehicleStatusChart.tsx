import { vehicles } from "../../data/vehicles";

export default function VehicleStatusChart() {
    const vehiculosPorEstado = vehicles.reduce((acc, vehicle) => {
        acc[vehicle.estado] = (acc[vehicle.estado] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const vehiculosPorTipo = vehicles.reduce((acc, vehicle) => {
        acc[vehicle.tipo] = (acc[vehicle.tipo] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Estado de la Flota</h3>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Por Estado</h4>
                <div className="space-y-2">
                    {Object.entries(vehiculosPorEstado).map(([estado, cantidad]) => (
                        <div key={estado}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">{estado}</span>
                                <span className="font-medium">{cantidad} vehículos</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${estado === "Excelente"
                                        ? "bg-green-500"
                                        : estado === "Bueno"
                                            ? "bg-blue-500"
                                            : "bg-yellow-500"
                                        }`}
                                    style={{ width: `${(cantidad / vehicles.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Por Tipo de Vehículo</h4>
                <div className="space-y-2">
                    {Object.entries(vehiculosPorTipo)
                        .sort((a, b) => b[1] - a[1])
                        .map(([tipo, cantidad]) => (
                            <div key={tipo} className="flex justify-between text-sm">
                                <span className="text-gray-600">{tipo}</span>
                                <span className="font-medium">{cantidad} unidades</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}