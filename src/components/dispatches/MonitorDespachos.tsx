import { useState } from "react";
import { demandData } from "../../data/demandData";

export default function MonitorDespachos() {
    const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
    const [filtroPrioridad, setFiltroPrioridad] = useState<string>("Todos");

    const estados = ["Todos", "Pendiente", "En proceso", "Completado"];
    const prioridades = ["Todos", "Alta", "Media", "Baja"];

    const despachosFiltrados = demandData.filter(despacho => {
        const cumpleEstado = filtroEstado === "Todos" || despacho.estado === filtroEstado;
        const cumplePrioridad = filtroPrioridad === "Todos" || despacho.prioridad === filtroPrioridad;
        return cumpleEstado && cumplePrioridad;
    });

    // Calcular métricas de desempeño
    const despachosCompletados = demandData.filter(d => d.estado === "Completado").length;
    const despachosOntiempo = demandData.filter(d => d.entregadoATiempo).length;
    const tasaCumplimiento = despachosCompletados > 0 ? (despachosOntiempo / despachosCompletados) * 100 : 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Monitor de Despachos</h2>
                <p className="text-gray-600">
                    Monitorea el estado de todos tus despachos en tiempo real y gestiona excepciones.
                </p>
            </div>

            {/* KPIs de desempeño */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{demandData.length}</div>
                    <div className="text-sm text-gray-600">Total Despachos</div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{despachosCompletados}</div>
                    <div className="text-sm text-gray-600">Completados</div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{despachosOntiempo}</div>
                    <div className="text-sm text-gray-600">Entregados a Tiempo</div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{tasaCumplimiento.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Tasa de Cumplimiento</div>
                </div>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Prioridad</label>
                        <select
                            className="w-full border border-gray-100 border border-gray-100-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border border-gray-100-blue-500"
                            value={filtroPrioridad}
                            onChange={e => setFiltroPrioridad(e.target.value)}
                        >
                            {prioridades.map(prioridad => (
                                <option key={prioridad} value={prioridad}>{prioridad}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Resumen</label>
                        <div className="bg-gray-50 rounded-md p-3">
                            <div className="text-sm text-gray-600">
                                Mostrando {despachosFiltrados.length} de {demandData.length} despachos
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de despachos */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cliente
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ruta
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prioridad
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Entrega
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {despachosFiltrados.map(despacho => (
                                <tr key={despacho.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{despacho.id}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {despacho.cliente}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${despacho.tipoCarga === "Líquida"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-amber-100 text-amber-800"
                                            }`}>
                                            {despacho.tipoCarga}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {despacho.origen} → {despacho.destino}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${despacho.prioridad === "Alta"
                                            ? "bg-red-100 text-red-800"
                                            : despacho.prioridad === "Media"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                            }`}>
                                            {despacho.prioridad}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${despacho.estado === "Completado"
                                            ? "bg-green-100 text-green-800"
                                            : despacho.estado === "En proceso"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-gray-100 text-gray-800"
                                            }`}>
                                            {despacho.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {despacho.entregadoATiempo !== undefined && (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${despacho.entregadoATiempo
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}>
                                                {despacho.entregadoATiempo ? "A tiempo" : "Retrasado"}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {despachosFiltrados.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500">No se encontraron despachos con los filtros seleccionados.</p>
                </div>
            )}
        </div>
    );
}