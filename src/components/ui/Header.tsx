export default function Header() {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-60 h-16">
                        <img
                            src="/logo-coltanques.png"
                            alt="Coltanques Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <p className="text-sm text-gray-500">COLTANQUES</p>
                        <p className="text-xs text-gray-400">Ebitda Service Optimization (ESO)</p>
                    </div>
                    <div className="w-10 h-16">
                        <img
                            src="/cincuenta.png"
                            alt="Logo 50 años"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}