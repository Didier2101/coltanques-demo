export interface City {
    lat: number;
    lng: number;
    nombre: string;
    region: string;
}

export const ciudades: Record<string, City> = {
    Bogotá: { lat: 4.60971, lng: -74.08175, nombre: "Bogotá D.C.", region: "Cundinamarca" },
    Cali: { lat: 3.43722, lng: -76.5225, nombre: "Santiago de Cali", region: "Valle del Cauca" },
    Medellín: { lat: 6.2442, lng: -75.5812, nombre: "Medellín", region: "Antioquia" },
    Bucaramanga: { lat: 7.119, lng: -73.1198, nombre: "Bucaramanga", region: "Santander" },
    Barranquilla: { lat: 10.963, lng: -74.795, nombre: "Barranquilla", region: "Atlántico" },
    Cartagena: { lat: 10.3910, lng: -75.4794, nombre: "Cartagena", region: "Bolívar" },
    Manizales: { lat: 5.0700, lng: -75.5138, nombre: "Manizales", region: "Caldas" },
    Pereira: { lat: 4.8133, lng: -75.6961, nombre: "Pereira", region: "Risaralda" },
};