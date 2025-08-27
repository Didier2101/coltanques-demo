import { useState } from "react";
import { vehicles } from "../../data/vehicles";

export default function GestorFlota() {
    const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
    const [filtroTipo, setFiltroTipo] = useState<string>("Todos");

    const estados = ["Todos", "Excelente", "Bueno", "Regular"];
    const tipos = ["Todos", ...new Set(vehicles.map(v => v.tipo))];

    const vehiculosFiltrados = vehicles.filter(vehicle => {
        const cumpleEstado = filtroEstado === "Todos" || vehicle.estado === filtroEstado;
        const cumpleTipo = filtroTipo === "Todos" || vehicle.tipo === filtroTipo;
        return cumpleEstado && cumpleTipo;
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Flota</h2>
                <p className="text-gray-600">
                    Monitorea el estado de tu flota, programa mantenimientos y optimiza la utilización de vehículos.
                </p>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Estado</label>
                        <select
                            className="w-full border border-gray-100 border border-gray-100-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border border-gray-100-blue-500"
                            value={filtroEstado}
                            onChange={e => setFiltroEstado(e.target.value)}
                        >
                            {estados.map(estado => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Tipo</label>
                        <select
                            className="w-full border border-gray-100 border border-gray-100-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border border-gray-100-blue-500"
                            value={filtroTipo}
                            onChange={e => setFiltroTipo(e.target.value)}
                        >
                            {tipos.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Resumen</label>
                        <div className="bg-gray-50 rounded-md p-3">
                            <div className="text-sm text-gray-600">
                                Mostrando {vehiculosFiltrados.length} de {vehicles.length} vehículos
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tarjetas de vehículos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehiculosFiltrados.map(vehicle => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold text-gray-800">{vehicle.placa}</h3>
                                <p className="text-sm text-gray-600">{vehicle.tipo}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${vehicle.estado === "Excelente"
                                ? "bg-green-100 text-green-800"
                                : vehicle.estado === "Bueno"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {vehicle.estado}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="text-sm">
                                <div className="text-gray-500">Capacidad</div>
                                <div className="font-medium">{vehicle.capacidad}K L</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-gray-500">Consumo</div>
                                <div className="font-medium">{vehicle.consumo} km/L</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-gray-500">Año</div>
                                <div className="font-medium">{vehicle.año}</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-gray-500">Licencia</div>
                                <div className="font-medium">{vehicle.licenciaRequerida}</div>
                            </div>
                        </div>

                        <div className="text-sm mb-3">
                            <div className="text-gray-500">Próximo mantenimiento</div>
                            <div className="font-medium">{vehicle.proximoMantenimiento}</div>
                        </div>

                        <div className="text-sm">
                            <div className="text-gray-500">Ubicación</div>
                            <div className="font-medium">{vehicle.ubicacion}</div>
                        </div>
                    </div>
                ))}
            </div>

            {vehiculosFiltrados.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500">No se encontraron vehículos con los filtros seleccionados.</p>
                </div>
            )}
        </div>
    );
}