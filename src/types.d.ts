// types.ts

export interface Punto {
    lat: number;
    lng: number;
}

export interface Vehiculo {
    id: number;
    placa: string;
    tipo: string;
    capacidad?: number; // opcional, toneladas
    consumo?: number;   // opcional, km por litro
    licenciaRequerida?: "A1" | "A2" | "B1" | "B2";
}

export interface Conductor {
    id: number;
    nombre: string;
    licencia?: "A1" | "A2" | "B1" | "B2";
    activo?: boolean;
    telefono?: string;
    email?: string;
}

export interface RutaMock {
    id: number;
    nombre: string;
    distancia: number;
    tiempo: number;
    peajes: number[];
    combustible: number;
    origenLat: number;
    origenLng: number;
    destinoLat: number;
    destinoLng: number;
    coords: Punto[];
    waypoints?: Punto[];
}

export interface Viaje extends RutaMock {
    origen: string;
    destino: string;
    vehiculo: Vehiculo | string;
    conductor: Conductor | string;
    toneladas: number;
    tarifaTon: number;
    costoTotal: number;
    ingreso: number;
    margen: number;
}
