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

export const demandData: Demanda[] = [
    {
        id: 1,
        cliente: "Refinería Costa S.A.",
        tipoCarga: "Líquida",
        volumen: 28000,
        origen: "Bogotá",
        destino: "Barranquilla",
        fecha: "2023-10-15",
        fechaEntregaPrometida: "2023-10-16",
        fechaEntregaReal: "2023-10-16",
        entregadoATiempo: true,
        prioridad: "Alta",
        estado: "Completado",
        ingresosEstimados: 8500000
    },
    {
        id: 2,
        cliente: "Alimentos Polar",
        tipoCarga: "Seca",
        volumen: 18000,
        origen: "Cali",
        destino: "Medellín",
        fecha: "2023-10-15",
        fechaEntregaPrometida: "2023-10-16",
        fechaEntregaReal: "2023-10-17",
        entregadoATiempo: false,
        prioridad: "Media",
        estado: "Completado",
        ingresosEstimados: 5200000
    },
    {
        id: 3,
        cliente: "Químicos Andinos",
        tipoCarga: "Líquida",
        volumen: 32000,
        origen: "Bogotá",
        destino: "Bucaramanga",
        fecha: "2023-10-16",
        fechaEntregaPrometida: "2023-10-17",
        entregadoATiempo: false,
        prioridad: "Alta",
        estado: "En proceso",
        ingresosEstimados: 9200000
    },
    {
        id: 4,
        cliente: "Acerías Nacionales",
        tipoCarga: "Seca",
        volumen: 15000,
        origen: "Medellín",
        destino: "Bogotá",
        fecha: "2023-10-16",
        fechaEntregaPrometida: "2023-10-17",
        entregadoATiempo: false,
        prioridad: "Media",
        estado: "Pendiente",
        ingresosEstimados: 4800000
    }
];