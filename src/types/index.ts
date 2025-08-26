export interface Vehicle {
    id: number;
    placa: string;
    tipo: string;
    capacidad: number;
    consumo: number;
    licenciaRequerida: "A1" | "A2" | "B1" | "B2";
    año: number;
    estado: "Excelente" | "Bueno" | "Regular";
    ubicacion: string;
    proximoMantenimiento: string;
    disponible: boolean;
}

export interface Driver {
    id: number;
    nombre: string;
    licencia: "A1" | "A2" | "B1" | "B2";
    activo: boolean;
    experiencia: number;
    calificacion: number;
    tiempoConduccionSemanal: number;
    tiempoDescanso: number;
    ubicacion: string;
}

export interface Peaje {
    id: number;
    nombre: string;
    costo: number;
    lat: number;
    lng: number;
    km?: number;
}

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

export interface Demanda {
    id: number;
    cliente: string;
    tipoCarga: "Seca" | "Líquida";
    volumen: number;
    origen: string;
    destino: string;
    fecha: string;
    fechaEntregaPrometida: string;
    fechaEntregaReal?: string;
    entregadoATiempo: boolean;
    prioridad: "Alta" | "Media" | "Baja";
    estado: "Pendiente" | "En proceso" | "Completado";
    ingresosEstimados: number;
}
