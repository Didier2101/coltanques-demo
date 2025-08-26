import { useStore } from "../store/useStore"; // ✅ importa tu store
import type { Viaje } from "../types";


export function Dashboard() {
    const viajes = useStore((s) => s.viajes);

    const ingresos = viajes.reduce((acc: number, v: Viaje) => acc + v.ingreso, 0);
    const costos = viajes.reduce((acc: number, v: Viaje) => acc + v.costoTotal, 0);
    const margen = ingresos - costos;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    Ingresos: ${ingresos.toLocaleString()}
                </div>
                <div className="bg-white p-4 rounded shadow">
                    Costos: ${costos.toLocaleString()}
                </div>
                <div className="bg-white p-4 rounded shadow">
                    Margen: ${margen.toLocaleString()}
                </div>
            </div>
        </div>
    );
}
