interface TabNavigationProps {
    vistaActiva: string;
    setVistaActiva: (vista: string) => void;
}

export default function TabNavigation({ vistaActiva, setVistaActiva }: TabNavigationProps) {
    const tabs = [
        { id: "dashboard", label: "Dashboard" },
        { id: "rutas", label: "Planificación de Rutas" },
        { id: "flota", label: "Gestión de Flota" },
        { id: "rentabilidad", label: "Análisis de Rentabilidad" },
        { id: "despachos", label: "Monitor de Despachos" },
    ] as const;

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex space-x-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setVistaActiva(tab.id)}
                            className={`px-4 py-3 text-sm font-medium transition-colors ${vistaActiva === tab.id
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}