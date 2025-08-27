interface MetricCardProps {
    titulo: string;
    valor: string | number;
    subtitulo: string;
    tendencia?: {
        valor: number;
        esPositivo: boolean;
    };
}

export default function MetricCard({ titulo, valor, subtitulo, tendencia }: MetricCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="text-gray-500 text-sm font-medium mb-1">{titulo}</div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{valor}</div>
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{subtitulo}</span>
                {tendencia && (
                    <span className={`text-xs font-medium ${tendencia.esPositivo ? 'text-green-600' : 'text-red-600'}`}>
                        {tendencia.esPositivo ? '↑' : '↓'} {tendencia.valor}%
                    </span>
                )}
            </div>
        </div>
    );
}