export default function Header() {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">C</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">COLTANQUES S.A.S.</h1>
                        <p className="text-sm text-gray-600">Sistema de Optimización de Despachos</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Tecnología de routing avanzado</p>
                    <p className="text-xs text-gray-400">Integración con OSRM y análisis predictivo</p>
                </div>
            </div>
        </header>
    );
}