import { useState } from "react";
import { vehicles } from "../../data/vehicles";

export default function GestorFlota() {
    const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
    const [filtroTipo, setFiltroTipo] = useState<string>("Todos");
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const VEHICULOS_POR_PAGINA = 10;

    // Estados simplificados
    const estados = ["Todos", "Operativo", "Mantenimiento"];
    const tipos = ["Todos", ...new Set(vehicles.map(v => v.tipo))];

    // Normalización de estado
    const normalizarEstado = (estado: string) => {
        if (estado === "Excelente" || estado === "Bueno") return "Operativo";
        return "Mantenimiento"; // "Regular"
    };

    // Filtrado
    const vehiculosFiltrados = vehicles.filter(vehicle => {
        const estadoNormalizado = normalizarEstado(vehicle.estado);
        const cumpleEstado = filtroEstado === "Todos" || estadoNormalizado === filtroEstado;
        const cumpleTipo = filtroTipo === "Todos" || vehicle.tipo === filtroTipo;
        return cumpleEstado && cumpleTipo;
    });

    // Calcular paginación
    const totalPaginas = Math.ceil(vehiculosFiltrados.length / VEHICULOS_POR_PAGINA);
    const inicio = (paginaActual - 1) * VEHICULOS_POR_PAGINA;
    const vehiculosPagina = vehiculosFiltrados.slice(inicio, inicio + VEHICULOS_POR_PAGINA);

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
                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={filtroEstado}
                            onChange={e => {
                                setFiltroEstado(e.target.value);
                                setPaginaActual(1); // reset al cambiar filtro
                            }}
                        >
                            {estados.map(estado => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Tipo</label>
                        <select
                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={filtroTipo}
                            onChange={e => {
                                setFiltroTipo(e.target.value);
                                setPaginaActual(1); // reset al cambiar filtro
                            }}
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
                                Mostrando {vehiculosPagina.length} de {vehiculosFiltrados.length} vehículos (total {vehicles.length})
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tarjetas de vehículos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehiculosPagina.map(vehicle => {
                    const estadoNormalizado = normalizarEstado(vehicle.estado);
                    return (
                        <div key={vehicle.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{vehicle.placa}</h3>
                                    <p className="text-sm text-gray-600">{vehicle.tipo}</p>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${estadoNormalizado === "Operativo"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-orange-100 text-orange-800"
                                        }`}
                                >
                                    {estadoNormalizado}
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
                    );
                })}
            </div>

            {/* Paginación */}
            {vehiculosFiltrados.length > VEHICULOS_POR_PAGINA && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
                        disabled={paginaActual === 1}
                        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    >
                        ← Anterior
                    </button>
                    <span className="text-sm text-gray-600">
                        Página {paginaActual} de {totalPaginas}
                    </span>
                    <button
                        onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
                        disabled={paginaActual === totalPaginas}
                        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    >
                        Siguiente →
                    </button>
                </div>
            )}

            {vehiculosFiltrados.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500">No se encontraron vehículos con los filtros seleccionados.</p>
                </div>
            )}
        </div>
    );
}
