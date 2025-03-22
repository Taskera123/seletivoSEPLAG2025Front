import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
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
    const [pagina, setPagina] = useState(paginaInicial);
    const url = "https://abitus-api.geia.vip";
    const [lista, setLista] = useState<PessoaDesaparecida[]>([]);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [filtros, setFiltros] = useState({
        nome: "",
        sexo: "",
        vivo: "",
        idadeMin: "",
        idadeMax: "",
    });

    const carregarDesaparecidos = async () => {
        try {
            const res = await api.get(`${url}/v1/pessoas/aberto/filtro`, {
                params: {
                    pagina: pagina - 1, // começa em 0
                    quantidade: 10,
                },
            });

            setLista(res.data.content || []);
        } catch (err) {
            console.error("Erro ao carregar desaparecidos:", err);
        }
    };
    // console.log(lista)

    useEffect(() => {
        const carregarDesaparecidos = async () => {
            const res = await api.get(`${url}/v1/pessoas/aberto/filtro`, {
                params: {
                    pagina: pagina - 1,
                    quantidade: 10,
                    ...filtros,  // filtro por nome
                },
            });

            setLista(res.data.content || []);
        };

        carregarDesaparecidos();
    }, [pagina, filtros]);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">QUADRO DE PESSOAS</h1>
            <div className="mb-4 z-50 relative">
                <button
                    onClick={() => setMostrarFiltros(true)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                    {mostrarFiltros ? "Esconder Filtros" : "Mostrar Filtros"}
                </button>
            </div>
            {/* <div className="mb-6 flex flex-col sm:flex-row items-center gap-2">
                <input
                    type="text"
                    placeholder="Não funciona pois na data de criação deste codigo o endpoint https://abitus-api.geia.vip/v1/pessoas/aberto/filtro ta com erro ao passar o nome "
                    className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto flex-1"
                    value={filtros.nome}
                    onChange={(e) =>
                      setFiltros((prev) => ({ ...prev, nome: e.target.value }))
                    }
                />
                <button
                    onClick={() => setPagina(1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Buscar
                </button>
                <button
                   onClick={() => {
                    setFiltros({
                      nome: "",
                      sexo: "",
                      vivo: "",
                      idadeMin: "",
                      idadeMax: "",
                    });
                    setPagina(1);
                  }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Limpar Filtros
                </button>
            </div> */}
            {mostrarFiltros && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 backdrop-blur-sm bg-black/30">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl relative z-50">

                        <h2 className="text-xl font-bold mb-4">Filtros</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Campo Nome */}
                            <input
                                type="text"
                                placeholder="Nome"
                                className="border rounded px-3 py-2 col-span-2"
                                value={filtros.nome}
                                onChange={(e) =>
                                    setFiltros((prev) => ({ ...prev, nome: e.target.value }))
                                }
                            />

                            {/* Campo Sexo */}
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

                            {/* Situação */}
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

                            {/* Idade Min */}
                            <input
                                type="number"
                                placeholder="Idade mínima"
                                className="border rounded px-3 py-2"
                                value={filtros.idadeMin}
                                onChange={(e) =>
                                    setFiltros((prev) => ({ ...prev, idadeMin: e.target.value }))
                                }
                            />

                            {/* Idade Max */}
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
                                onClick={() => setPagina(1)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Buscar
                            </button>

                            <button
                                onClick={() => {
                                    setFiltros({
                                        nome: "",
                                        sexo: "",
                                        vivo: "",
                                        idadeMin: "",
                                        idadeMax: "",
                                    });
                                    setPagina(1);
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Limpar Filtros
                            </button>

                            <button
                                onClick={() => setMostrarFiltros(false)}
                                className="ml-auto text-sm text-gray-500 hover:text-red-500"
                            >
                                Fechar Filtros ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lista.map((d) => (
                    <CardDesaparecido
                        key={d.id}
                        id={d.id}
                        nome={d.nome}
                        foto={d.urlFoto}
                        situacao={d.vivo ? "Desaparecido" : "Localizado"}
                        dataDesaparecimento={d.ultimaOcorrencia?.dtDesaparecimento ?? ""}
                        paginaAtual={pagina}
                    />
                ))}
            </div>

            {/* Paginação */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    disabled={pagina === 1}
                    onClick={() => setPagina((p) => p - 1)}
                >
                    Anterior
                </button>
                <span className="px-4 py-2">{pagina}</span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setPagina((p) => p + 1)}
                >
                    Próxima
                </button>
            </div>
        </div>
    );

}
