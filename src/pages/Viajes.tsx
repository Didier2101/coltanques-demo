import { useStore } from "../store/useStore";

export function Viajes() {
    const viajes = useStore((s) => s.viajes);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 Viajes</h2>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Origen</th>
                            <th className="px-6 py-3">Destino</th>
                            <th className="px-6 py-3">Vehículo</th>
                            <th className="px-6 py-3">Conductor</th>
                            <th className="px-6 py-3">Ruta</th>
                            <th className="px-6 py-3">Margen</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viajes.map((v, i) => (
                            <tr
                                key={i}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-3">{v.origen}</td>
                                <td className="px-6 py-3">{v.destino}</td>
                                <td className="px-6 py-3">{v.vehiculo}</td>
                                <td className="px-6 py-3">{v.conductor}</td>
                                <td className="px-6 py-3">{v.nombre}</td>
                                <td className="px-6 py-3 font-semibold text-green-700">
                                    ${v.margen.toLocaleString()}
                                </td>
                                <td className="px-6 py-3 flex gap-3 justify-center">
                                    {/* Google Maps con ruta completa */}
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&origin=${v.origenLat},${v.origenLng}&destination=${v.destinoLat},${v.destinoLng}${v.waypoints && v.waypoints.length > 0
                                                ? "&waypoints=" +
                                                v.waypoints.map((w) => `${w.lat},${w.lng}`).join("|")
                                                : ""
                                            }`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700 transition"
                                    >
                                        Maps
                                    </a>

                                    {/* Waze (acepta solo origen/destino, no múltiples waypoints en URL pública) */}
                                    <a
                                        href={`https://waze.com/ul?ll=${v.destinoLat},${v.destinoLng}&from=${v.origenLat},${v.origenLng}&navigate=yes`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg shadow hover:bg-green-700 transition"
                                    >
                                        Waze
                                    </a>
                                </td>

                            </tr>
                        ))}
                        {viajes.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-6 text-center text-gray-500 italic"
                                >
                                    No hay viajes registrados aún 🚚
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
