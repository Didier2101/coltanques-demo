export interface Peaje {
    id: number;
    nombre: string;
    costo: number;
    lat: number;
    lng: number;
    km?: number;
}

export const peajesData: Peaje[] = [
    // Bogotá - Cali
    { id: 1, nombre: "Chusacá", costo: 42000, lat: 4.49, lng: -74.24 },
    { id: 2, nombre: "Chinauta", costo: 52000, lat: 4.16, lng: -74.45 },
    { id: 3, nombre: "Chicoral", costo: 45000, lat: 4.17, lng: -74.96 },
    { id: 4, nombre: "Gualanday", costo: 55000, lat: 4.30, lng: -75.05 },
    { id: 5, nombre: "Túnel de La Línea", costo: 48000, lat: 4.51, lng: -75.52 },
    { id: 6, nombre: "Corozal", costo: 46000, lat: 4.47, lng: -75.64 },
    { id: 7, nombre: "La Uribe", costo: 41000, lat: 4.30, lng: -76.01 },
    { id: 8, nombre: "Betania", costo: 41000, lat: 4.09, lng: -76.19 },
    { id: 9, nombre: "Rozo", costo: 39000, lat: 3.63, lng: -76.38 },
    { id: 10, nombre: "Estambul", costo: 38000, lat: 3.51, lng: -76.45 },

    // Bogotá - Medellín
    { id: 11, nombre: "Siberia", costo: 38000, lat: 4.90, lng: -74.12 },
    { id: 12, nombre: "El Korán", costo: 45000, lat: 5.61, lng: -74.74 },
    { id: 13, nombre: "Puerto Triunfo", costo: 43000, lat: 5.86, lng: -74.72 },
    { id: 14, nombre: "Cocorná", costo: 42000, lat: 6.00, lng: -75.06 },
    { id: 15, nombre: "Guarne - Copacabana", costo: 40000, lat: 6.20, lng: -75.48 },

    // Bogotá - Bucaramanga
    { id: 16, nombre: "El Roble", costo: 45000, lat: 5.54, lng: -73.47 },
    { id: 17, nombre: "La Esperanza", costo: 39000, lat: 5.84, lng: -73.35 },
    { id: 18, nombre: "Curití", costo: 40000, lat: 6.64, lng: -73.08 },
    { id: 19, nombre: "Los Santos", costo: 41000, lat: 6.84, lng: -73.12 },

    // Bogotá - Barranquilla
    { id: 20, nombre: "La Lizama", costo: 38000, lat: 6.94, lng: -73.80 },
    { id: 21, nombre: "Aguachica", costo: 42000, lat: 8.31, lng: -73.57 },
    { id: 22, nombre: "Morales", costo: 39000, lat: 8.84, lng: -73.59 },
    { id: 23, nombre: "Bosconia", costo: 45000, lat: 10.03, lng: -73.07 },
    { id: 24, nombre: "Pueblo Nuevo", costo: 41000, lat: 10.36, lng: -74.01 },
    { id: 25, nombre: "Sabanalarga", costo: 43000, lat: 10.63, lng: -74.91 },
];