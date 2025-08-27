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

export const vehicles: Vehicle[] = [
    {
        id: 1,
        placa: "XYZ-123",
        tipo: "Tractomula",
        capacidad: 35,
        consumo: 3,
        licenciaRequerida: "A2",
        año: 2020,
        estado: "Excelente",
        ubicacion: "Bogotá",
        proximoMantenimiento: "2023-11-15",
        disponible: true
    },
    {
        id: 2,
        placa: "TPQ-456",
        tipo: "Tractomula",
        capacidad: 30,
        consumo: 3,
        licenciaRequerida: "A2",
        año: 2019,
        estado: "Bueno",
        ubicacion: "Cali",
        proximoMantenimiento: "2023-10-25",
        disponible: true
    },
    {
        id: 3,
        placa: "LMN-789",
        tipo: "Mini mula",
        capacidad: 18,
        consumo: 4,
        licenciaRequerida: "B1",
        año: 2021,
        estado: "Excelente",
        ubicacion: "Medellín",
        proximoMantenimiento: "2023-12-05",
        disponible: false
    },
    {
        id: 4,
        placa: "CDE-012",
        tipo: "Tractomula",
        capacidad: 32,
        consumo: 3,
        licenciaRequerida: "A2",
        año: 2018,
        estado: "Bueno",
        ubicacion: "Bogotá",
        proximoMantenimiento: "2023-10-30",
        disponible: true
    },
    {
        id: 5,
        placa: "RTY-567",
        tipo: "Mini mula",
        capacidad: 15,
        consumo: 4.5,
        licenciaRequerida: "B1",
        año: 2022,
        estado: "Excelente",
        ubicacion: "Barranquilla",
        proximoMantenimiento: "2024-01-15",
        disponible: true
    },
];