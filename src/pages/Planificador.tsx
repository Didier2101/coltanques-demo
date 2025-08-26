import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { peajesData, type Peaje } from "../data/peajes";
import { ciudades } from "../data/cities";
import { vehicles } from "../data/vehicles";
import { drivers } from "../data/drivers";
import { rutaPeajes } from "../data/routesMock";
import { MANTENIMIENTO_KM, PAGO_CONDUCTOR_AUXILIAR_DIA, PAGO_CONDUCTOR_DIA, PRECIO_ACPM, SEGURO_VIAJE } from "../data/constants";

// Iconos personalizados
const tollIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3133/3133649.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -15],
});

const originIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -30],
});

const destinationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684809.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -30],
});

export interface RutaCalculada {
    nombre: string;
    distancia: number;
    tiempo: number;
    coords: Array<{ lat: number; lng: number }>;
    peajes: Peaje[];
    costos: {
        combustible: number;
        peajes: number;
        conductores: number;
        seguro: number;
        mantenimiento: number;
        total: number;
    };
}

export default function ColtanquesOSRM() {
    const [origen, setOrigen] = useState<keyof typeof ciudades>("Bogotá");
    const [destino, setDestino] = useState<keyof typeof ciudades | "">("");
    const [vehiculoId, setVehiculoId] = useState<number | null>(null);
    const [conductorId, setConductorId] = useState<number | null>(null);
    const [conductorAuxiliarId, setConductorAuxiliarId] = useState<number | null>(null);
    const [rutaCalculada, setRutaCalculada] = useState<RutaCalculada | null>(null);
    const [calculandoRuta, setCalculandoRuta] = useState(false);
    const [mostrarAnalisisAvanzado, setMostrarAnalisisAvanzado] = useState(false);

    const vehiculo = vehicles.find(v => v.id === vehiculoId);
    const conductor = drivers.find(d => d.id === conductorId && d.activo);
    const conductorAuxiliar = drivers.find(d => d.id === conductorAuxiliarId && d.activo && d.id !== conductorId);

    const calcularDistanciaEntrePuntos = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const encontrarPeajesEnRuta = (coordenadas: Array<{ lat: number; lng: number }>, rutaKey: string): Peaje[] => {
        const peajesIds = rutaPeajes[rutaKey];
        if (peajesIds) {
            return peajesIds.map(id => peajesData.find(p => p.id === id)).filter(Boolean) as Peaje[];
        }

        const peajesEncontrados: Peaje[] = [];
        const radioKm = 15;

        peajesData.forEach(peaje => {
            for (const coord of coordenadas) {
                const distancia = calcularDistanciaEntrePuntos(peaje.lat, peaje.lng, coord.lat, coord.lng);
                if (distancia <= radioKm) {
                    peajesEncontrados.push(peaje);
                    break;
                }
            }
        });

        return peajesEncontrados;
    };

    const calcularRuta = async () => {
        if (!origen || !destino || !vehiculo) return;

        setCalculandoRuta(true);

        try {
            const origenCoord = ciudades[origen];
            const destinoCoord = ciudades[destino];

            const url = `https://router.project-osrm.org/route/v1/driving/${origenCoord.lng},${origenCoord.lat};${destinoCoord.lng},${destinoCoord.lat}?overview=full&geometries=geojson&steps=true`;

            const response = await fetch(url);
            const data = await response.json();

            if (!data.routes || data.routes.length === 0) return;

            const route = data.routes[0];
            const distanciaKm = route.distance / 1000;
            const tiempoHoras = route.duration / 3600;

            const coordenadas = route.geometry.coordinates.map((coord: [number, number]) => ({
                lng: coord[0],
                lat: coord[1]
            }));

            const rutaKey = `${origen}-${destino}`;
            const peajesRuta = encontrarPeajesEnRuta(coordenadas, rutaKey);

            const litros = distanciaKm / vehiculo.consumo;
            const galones = litros / 3.785;
            const costoCombustible = galones * PRECIO_ACPM;
            const costoPeajes = peajesRuta.reduce((acc, p) => acc + p.costo, 0);

            const necesitaRelevo = tiempoHoras > 12;
            const costoConductores = PAGO_CONDUCTOR_DIA + (necesitaRelevo ? PAGO_CONDUCTOR_AUXILIAR_DIA : 0);
            const costoMantenimiento = distanciaKm * MANTENIMIENTO_KM;
            const costoTotal = costoCombustible + costoPeajes + costoConductores + SEGURO_VIAJE + costoMantenimiento;

            const rutaFinal: RutaCalculada = {
                nombre: `${origen} → ${destino}`,
                distancia: distanciaKm,
                tiempo: tiempoHoras,
                coords: coordenadas,
                peajes: peajesRuta,
                costos: {
                    combustible: costoCombustible,
                    peajes: costoPeajes,
                    conductores: costoConductores,
                    seguro: SEGURO_VIAJE,
                    mantenimiento: costoMantenimiento,
                    total: costoTotal
                }
            };

            setRutaCalculada(rutaFinal);

        } catch (error) {
            console.error("Error al calcular ruta:", error);
        } finally {
            setCalculandoRuta(false);
        }
    };

    const formatoCOP = (valor: number) =>
        new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(valor);

    const renderStars = (rating: number) => {
        return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "☆" : "");
    };

    const necesitaRelevo = rutaCalculada ? rutaCalculada.tiempo > 12 : false;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white border-b-4 border-blue-900 rounded-lg shadow-sm mb-8">
                    <div className="px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    COLTANQUES S.A.S.
                                </h1>
                                <h2 className="text-lg text-gray-600 font-medium">
                                    Sistema de Planificación de Rutas con OSRM
                                </h2>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Tecnología</div>
                                <div className="text-lg font-semibold text-blue-900">OpenStreetMap Routing</div>
                                <div className="text-xs text-gray-400">API Integration</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                        Configuración de Viaje
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ciudad Origen
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white"
                                value={origen}
                                onChange={e => setOrigen(e.target.value as keyof typeof ciudades)}
                            >
                                {Object.entries(ciudades).map(([key, ciudad]) =>
                                    <option key={key} value={key}>
                                        {ciudad.nombre}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ciudad Destino
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white"
                                value={destino}
                                onChange={e => setDestino(e.target.value as keyof typeof ciudades)}
                            >
                                <option value="">Seleccionar destino</option>
                                {Object.entries(ciudades).filter(([key]) => key !== origen).map(([key, ciudad]) =>
                                    <option key={key} value={key}>
                                        {ciudad.nombre}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Vehículo
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white"
                                value={vehiculoId ?? ""}
                                onChange={e => setVehiculoId(Number(e.target.value))}
                            >
                                <option value="">Seleccionar Vehículo</option>
                                {vehicles.map(v =>
                                    <option key={v.id} value={v.id}>
                                        {v.placa} - {v.tipo}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Conductor Principal
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white"
                                value={conductorId ?? ""}
                                onChange={e => setConductorId(Number(e.target.value))}
                            >
                                <option value="">Asignar Conductor</option>
                                {drivers.filter(d => d.activo && (!vehiculo || d.licencia >= vehiculo.licenciaRequerida)).map(d =>
                                    <option key={d.id} value={d.id}>
                                        {d.nombre} ({d.licencia})
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>

                    {necesitaRelevo && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <div className="flex items-center mb-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                <h4 className="text-sm font-semibold text-red-800">
                                    Conductor de Relevo Obligatorio
                                </h4>
                            </div>
                            <p className="text-sm text-red-700 mb-3">
                                Esta ruta excede las 12 horas reglamentarias según normativa vigente.
                            </p>
                            <select
                                className="w-full border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500 bg-white"
                                value={conductorAuxiliarId ?? ""}
                                onChange={e => setConductorAuxiliarId(Number(e.target.value))}
                            >
                                <option value="">Seleccionar Conductor de Relevo</option>
                                {drivers.filter(d => d.activo && d.id !== conductorId && (!vehiculo || d.licencia >= vehiculo.licenciaRequerida)).map(d =>
                                    <option key={d.id} value={d.id}>
                                        {d.nombre} ({d.licencia})
                                    </option>
                                )}
                            </select>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            onClick={calcularRuta}
                            disabled={!destino || !vehiculo || calculandoRuta}
                            className="bg-blue-900 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {calculandoRuta ? "Calculando ruta..." : "Calcular Ruta con OSRM"}
                        </button>

                        {rutaCalculada && (
                            <button
                                onClick={() => setMostrarAnalisisAvanzado(!mostrarAnalisisAvanzado)}
                                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50"
                            >
                                {mostrarAnalisisAvanzado ? "Ocultar Análisis" : "Análisis Detallado"}
                            </button>
                        )}
                    </div>
                </div>

                {rutaCalculada && (
                    <>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Plan de Viaje Calculado - {rutaCalculada.nombre}
                                    </h2>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-900">{formatoCOP(rutaCalculada.costos.total)}</div>
                                        <div className="text-sm text-gray-500">Costo Total</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-4 bg-gray-50 rounded-md">
                                        <div className="text-2xl font-bold text-gray-800">{rutaCalculada.distancia.toFixed(1)}</div>
                                        <div className="text-sm text-gray-600">Kilómetros</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-md">
                                        <div className="text-2xl font-bold text-gray-800">{rutaCalculada.tiempo.toFixed(1)}</div>
                                        <div className="text-sm text-gray-600">Horas estimadas</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-md">
                                        <div className="text-2xl font-bold text-gray-800">{rutaCalculada.peajes.length}</div>
                                        <div className="text-sm text-gray-600">Peajes</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-md">
                                        <div className="text-2xl font-bold text-gray-800">{formatoCOP(rutaCalculada.costos.peajes)}</div>
                                        <div className="text-sm text-gray-600">Costo Peajes</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-800 mb-3">Desglose de Costos</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Combustible:</span>
                                                <span className="font-medium">{formatoCOP(rutaCalculada.costos.combustible)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Peajes:</span>
                                                <span className="font-medium">{formatoCOP(rutaCalculada.costos.peajes)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Conductores:</span>
                                                <span className="font-medium">{formatoCOP(rutaCalculada.costos.conductores)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Seguro:</span>
                                                <span className="font-medium">{formatoCOP(rutaCalculada.costos.seguro)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Mantenimiento:</span>
                                                <span className="font-medium">{formatoCOP(rutaCalculada.costos.mantenimiento)}</span>
                                            </div>
                                            <div className="border-t border-blue-300 pt-2 flex justify-between font-bold text-blue-800">
                                                <span>Total:</span>
                                                <span>{formatoCOP(rutaCalculada.costos.total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {vehiculo && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-green-800 mb-3">Vehículo Asignado</h4>
                                            <div className="space-y-1 text-sm">
                                                <div><span className="font-medium">Placa:</span> {vehiculo.placa}</div>
                                                <div><span className="font-medium">Tipo:</span> {vehiculo.tipo}</div>
                                                <div><span className="font-medium">Capacidad:</span> {vehiculo.capacidad}k L</div>
                                                <div><span className="font-medium">Consumo:</span> {vehiculo.consumo} km/L</div>
                                                <div><span className="font-medium">Año:</span> {vehiculo.año}</div>
                                                <div><span className="font-medium">Estado:</span> {vehiculo.estado}</div>
                                                <div><span className="font-medium">Licencia:</span> {vehiculo.licenciaRequerida}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {conductor && (
                                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-amber-800 mb-3">Conductor Asignado</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1 text-sm">
                                                <div><span className="font-medium">Nombre:</span> {conductor.nombre}</div>
                                                <div><span className="font-medium">Licencia:</span> {conductor.licencia}</div>
                                                <div><span className="font-medium">Experiencia:</span> {conductor.experiencia} años</div>
                                                <div><span className="font-medium">Calificación:</span> {renderStars(conductor.calificacion)} ({conductor.calificacion})</div>
                                            </div>
                                            {conductorAuxiliar && (
                                                <div className="space-y-1 text-sm">
                                                    <div className="font-medium text-red-700">Conductor de Relevo:</div>
                                                    <div><span className="font-medium">Nombre:</span> {conductorAuxiliar.nombre}</div>
                                                    <div><span className="font-medium">Licencia:</span> {conductorAuxiliar.licencia}</div>
                                                    <div><span className="font-medium">Experiencia:</span> {conductorAuxiliar.experiencia} años</div>
                                                    <div><span className="font-medium">Calificación:</span> {renderStars(conductorAuxiliar.calificacion)} ({conductorAuxiliar.calificacion})</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {rutaCalculada.peajes.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold text-gray-800 mb-3">Peajes en la Ruta</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {rutaCalculada.peajes.map(peaje => (
                                                <div key={peaje.id} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                                                    <div className="font-medium text-gray-800">{peaje.nombre}</div>
                                                    <div className="text-sm text-gray-600">{formatoCOP(peaje.costo)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {mostrarAnalisisAvanzado && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800">Análisis Detallado del Viaje</h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-4">Análisis de Combustible</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="bg-blue-50 p-3 rounded-md">
                                                    <div className="font-medium">Consumo Estimado</div>
                                                    <div>Litros necesarios: {(rutaCalculada.distancia / (vehiculo?.consumo || 1)).toFixed(1)} L</div>
                                                    <div>Galones necesarios: {((rutaCalculada.distancia / (vehiculo?.consumo || 1)) / 3.785).toFixed(1)} gal</div>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-md">
                                                    <div className="font-medium">Costo por Galón</div>
                                                    <div>ACPM: {formatoCOP(PRECIO_ACPM)}/gal</div>
                                                    <div>Total combustible: {formatoCOP(rutaCalculada.costos.combustible)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-4">Análisis de Tiempo</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="bg-yellow-50 p-3 rounded-md">
                                                    <div className="font-medium">Tiempo de Conducción</div>
                                                    <div>Duración estimada: {rutaCalculada.tiempo.toFixed(1)} horas</div>
                                                    <div>Velocidad promedio: {(rutaCalculada.distancia / rutaCalculada.tiempo).toFixed(0)} km/h</div>
                                                </div>
                                                {rutaCalculada.tiempo > 12 && (
                                                    <div className="bg-red-50 p-3 rounded-md border border-red-200">
                                                        <div className="font-medium text-red-800">⚠️ Normativa Vigente</div>
                                                        <div className="text-red-700">Requiere conductor de relevo</div>
                                                        <div className="text-red-700">Excede las 12 horas reglamentarias</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h4 className="font-semibold text-gray-800 mb-4">Rentabilidad del Viaje</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-purple-50 p-4 rounded-md text-center">
                                                <div className="text-2xl font-bold text-purple-800">{formatoCOP(rutaCalculada.costos.total / rutaCalculada.distancia)}</div>
                                                <div className="text-sm text-purple-600">Costo por Kilómetro</div>
                                            </div>
                                            <div className="bg-indigo-50 p-4 rounded-md text-center">
                                                <div className="text-2xl font-bold text-indigo-800">{((rutaCalculada.costos.combustible / rutaCalculada.costos.total) * 100).toFixed(1)}%</div>
                                                <div className="text-sm text-indigo-600">% del Costo en Combustible</div>
                                            </div>
                                            <div className="bg-teal-50 p-4 rounded-md text-center">
                                                <div className="text-2xl font-bold text-teal-800">{((rutaCalculada.costos.peajes / rutaCalculada.costos.total) * 100).toFixed(1)}%</div>
                                                <div className="text-sm text-teal-600">% del Costo en Peajes</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {rutaCalculada.coords && rutaCalculada.coords.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800">Mapa de la Ruta - OSRM</h3>
                                </div>
                                <div className="p-6">
                                    <div style={{ height: "500px", width: "100%" }}>
                                        <MapContainer
                                            center={[rutaCalculada.coords[0].lat, rutaCalculada.coords[0].lng]}
                                            zoom={6}
                                            style={{ height: "100%", width: "100%" }}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                            />

                                            {/* Ruta */}
                                            <Polyline
                                                positions={rutaCalculada.coords.map(coord => [coord.lat, coord.lng])}
                                                color="blue"
                                                weight={4}
                                                opacity={0.8}
                                            />

                                            {/* Marcador de Origen */}
                                            <Marker
                                                position={[ciudades[origen].lat, ciudades[origen].lng]}
                                                icon={originIcon}
                                            >
                                                <Popup>
                                                    <div className="font-semibold">ORIGEN</div>
                                                    <div>{ciudades[origen].nombre}</div>
                                                </Popup>
                                            </Marker>

                                            {/* Marcador de Destino */}
                                            {destino && (
                                                <Marker
                                                    position={[ciudades[destino].lat, ciudades[destino].lng]}
                                                    icon={destinationIcon}
                                                >
                                                    <Popup>
                                                        <div className="font-semibold">DESTINO</div>
                                                        <div>{ciudades[destino].nombre}</div>
                                                    </Popup>
                                                </Marker>
                                            )}

                                            {/* Marcadores de Peajes */}
                                            {rutaCalculada.peajes.map(peaje => (
                                                <Marker
                                                    key={peaje.id}
                                                    position={[peaje.lat, peaje.lng]}
                                                    icon={tollIcon}
                                                >
                                                    <Popup>
                                                        <div className="font-semibold">{peaje.nombre}</div>
                                                        <div>{formatoCOP(peaje.costo)}</div>
                                                    </Popup>
                                                </Marker>
                                            ))}
                                        </MapContainer>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}