import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { useFiltro } from "../../components/FiltroContext";
import CardDesaparecido from "../../components/CardDesaparecido";

interface PessoaDesaparecida {
    id: number;
    nome: string;
    idade: number;
    sexo: string;
    vivo: boolean;
    urlFoto: string;
    ultimaOcorrencia: {
        dtDesaparecimento: string;
        localDesaparecimentoConcat: string;
    };
}

export default function Home() {
    const [searchParams] = useSearchParams();
    const paginaInicial = Number(searchParams.get("pagina")) || 1;
    const [numeroPagina, setNumeroPagina] = useState(paginaInicial - 1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalElementos, setTotalElementos] = useState(0);
    const itensPorPagina = 10;
    const url = "https://abitus-api.geia.vip";
    const [lista, setLista] = useState<PessoaDesaparecida[]>([]);
    const { mostrarFiltros, alternarFiltros } = useFiltro();
    const [filtros, setFiltros] = useState({
        nome: "",
        sexo: "",
        vivo: "",
        idadeMin: "",
        idadeMax: "",
    });

    useEffect(() => {
        const carregarDesaparecidos = async () => {
            try {
                const res = await api.get(`${url}/v1/pessoas/aberto/filtro`, {
                    params: {
                        pagina: numeroPagina,
                        quantidade: itensPorPagina,
                        ...filtros,
                    },
                });

                setLista(res.data.content || []);
                setTotalPaginas(res.data.totalPages || 0);
                setTotalElementos(res.data.totalElements || 0);
            } catch (err) {
                console.error("Erro ao carregar desaparecidos:", err);
            }
        };

        carregarDesaparecidos();
    }, [numeroPagina, filtros]);

    return (
        <div className="p-4 max-w-7xl mx-auto">

            <div className="mb-6 flex flex-col sm:flex-row items-center gap-2">
                <input
                    type="text"
                    placeholder="Nome"
                    className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto flex-1"
                    value={filtros.nome}
                    onChange={(e) =>
                        setFiltros((prev) => ({ ...prev, nome: e.target.value }))
                    }
                />
                <button
                    onClick={() => setNumeroPagina(0)}
                    className="bg-gray-400 dark:bg-gray-800 rounded hover:bg-gray-600 dark:hover:bg-gray-400 dark:text-white text-black px-4 py-2 transition"
                >
                    Buscar
                </button>
                <button
                    onClick={() => {
                        setFiltros({ nome: "", sexo: "", vivo: "", idadeMin: "", idadeMax: "" });
                        setNumeroPagina(0);
                    }}
                    className="bg-gray-400 dark:bg-gray-800 rounded hover:bg-gray-600 dark:hover:bg-gray-400 dark:text-white text-black px-4 py-2 transition"
                >
                    Limpar Filtros
                </button>
            </div>

            {mostrarFiltros && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 backdrop-blur-sm bg-black/30">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl relative z-50">
                        <h2 className="text-xl font-bold mb-4">Filtros</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="border rounded px-3 py-2 col-span-2"
                                value={filtros.nome}
                                onChange={(e) =>
                                    setFiltros((prev) => ({ ...prev, nome: e.target.value }))
                                }
                            />
                            <select
                                className="border rounded px-3 py-2"
                                value={filtros.sexo}
                                onChange={(e) =>
                                    setFiltros((prev) => ({ ...prev, sexo: e.target.value }))
                                }
                            >
                                <option value="">Sexo</option>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMININO">Feminino</option>
                            </select>
                            <select
                                className="border rounded px-3 py-2"
                                value={filtros.vivo}
                                onChange={(e) =>
                                    setFiltros((prev) => ({ ...prev, vivo: e.target.value }))
                                }
                            >
                                <option value="">Situação</option>
                                <option value="true">Desaparecido</option>
                                <option value="false">Localizado</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Idade mínima"
                                className="border rounded px-3 py-2"
                                value={filtros.idadeMin}
                                onChange={(e) =>
                                    setFiltros((prev) => ({ ...prev, idadeMin: e.target.value }))
                                }
                            />
                            <input
                                type="number"
                                placeholder="Idade máxima"
                                className="border rounded px-3 py-2"
                                value={filtros.idadeMax}
                                onChange={(e) =>
                                    setFiltros((prev) => ({ ...prev, idadeMax: e.target.value }))
                                }
                            />
                        </div>
                        <div className="mt-6 flex gap-2 flex-wrap">
                            <button
                                onClick={() => setNumeroPagina(0)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Buscar
                            </button>
                            <button
                                onClick={() => {
                                    setFiltros({ nome: "", sexo: "", vivo: "", idadeMin: "", idadeMax: "" });
                                    setNumeroPagina(0);
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Limpar Filtros
                            </button>
                            <button
                                onClick={alternarFiltros}
                                className="ml-auto text-sm text-gray-500 hover:text-red-500"
                            >
                                Fechar Filtros ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {lista.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">Carregando dados...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {lista.map((d) => (
                        <CardDesaparecido
                            key={d.id}
                            id={d.id}
                            nome={d.nome}
                            foto={d.urlFoto}
                            situacao={d.vivo ? "Desaparecido" : "Localizado"}
                            dataDesaparecimento={d.ultimaOcorrencia?.dtDesaparecimento ?? ""}
                            paginaAtual={numeroPagina + 1}
                        />
                    ))}
                </div>
            )}

            {/* Paginação */}
            <div className="mt-6 flex flex-col items-center gap-2">
                <div className="flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white"
                        disabled={numeroPagina === 0}
                        onClick={() => setNumeroPagina((p) => p - 1)}
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 font-semibold text-gray-800 dark:text-white">
                        Página {numeroPagina + 1} de {totalPaginas}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white"
                        disabled={numeroPagina + 1 >= totalPaginas}
                        onClick={() => setNumeroPagina((p) => p + 1)}
                    >
                        Próxima
                    </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    Exibindo {numeroPagina * itensPorPagina + 1} a {Math.min((numeroPagina + 1) * itensPorPagina, totalElementos)} de {totalElementos} registros
                </div>
            </div>
        </div>
    );
}