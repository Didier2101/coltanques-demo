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

export const drivers: Driver[] = [
    {
        id: 1,
        nombre: "Carlos Pérez",
        licencia: "A2",
        activo: true,
        experiencia: 15,
        calificacion: 4.8,
        tiempoConduccionSemanal: 45,
        tiempoDescanso: 10,
        ubicacion: "Bogotá"
    },
    {
        id: 2,
        nombre: "Juan Gómez",
        licencia: "B1",
        activo: true,
        experiencia: 8,
        calificacion: 4.5,
        tiempoConduccionSemanal: 38,
        tiempoDescanso: 12,
        ubicacion: "Cali"
    },
    {
        id: 3,
        nombre: "Ana Martínez",
        licencia: "A1",
        activo: true,
        experiencia: 12,
        calificacion: 4.9,
        tiempoConduccionSemanal: 42,
        tiempoDescanso: 9,
        ubicacion: "Medellín"
    },
    {
        id: 4,
        nombre: "Luis Torres",
        licencia: "B2",
        activo: false,
        experiencia: 5,
        calificacion: 4.2,
        tiempoConduccionSemanal: 0,
        tiempoDescanso: 24,
        ubicacion: "Bucaramanga"
    },
    {
        id: 5,
        nombre: "María Fernández",
        licencia: "A2",
        activo: true,
        experiencia: 20,
        calificacion: 5.0,
        tiempoConduccionSemanal: 48,
        tiempoDescanso: 8,
        ubicacion: "Barranquilla"
    },
    {
        id: 6,
        nombre: "Roberto Silva",
        licencia: "A2",
        activo: true,
        experiencia: 10,
        calificacion: 4.7,
        tiempoConduccionSemanal: 40,
        tiempoDescanso: 11,
        ubicacion: "Bogotá"
    },
    {
        id: 7,
        nombre: "Carmen López",
        licencia: "B1",
        activo: true,
        experiencia: 6,
        calificacion: 4.3,
        tiempoConduccionSemanal: 35,
        tiempoDescanso: 13,
        ubicacion: "Cartagena"
    },
];