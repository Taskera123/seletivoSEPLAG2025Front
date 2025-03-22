import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";


interface DetalhesPessoa {
    id: number;
    nome: string;
    idade: number;
    sexo: string;
    vivo: boolean;
    urlFoto: string;
    ultimaOcorrencia: {
        dtDesaparecimento: string;
        localDesaparecimentoConcat: string;
        ocoId: number;
        dataLocalizacao: string;
        encontradoVivo: boolean;
        ocorrenciaEntrevDesapDTO: {
            informacao: string;
            vestimentasDesaparecido: string;
        };
        listaCartaz: {
            urlCartaz: string;
            tipoCartaz: string;
        }[];
    };
}

export default function Detalhes() {
    const { id } = useParams();
    const location = useLocation();
    const paginaAnterior = location.state?.paginaAtual || 1;
    const [dados, setDados] = useState<DetalhesPessoa | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            api.get(`/v1/pessoas/${id}`)
                .then((res) => {
                    if (!res.data || !res.data.id) {
                        setErro("Pessoa não encontrada.");
                    } else {
                        setDados(res.data);
                        setErro(null);
                    }
                })
                .catch((err) => {
                    console.error("Erro ao buscar pessoa:", err);
                    setErro("Ocorreu um erro ao carregar os dados.");
                });
        }
    }, [id]);


    if (!dados) {
        return <div className="p-4">Carregando informações...</div>;
    }

    if (erro) {
        useEffect(() => {
            const timeout = setTimeout(() => {
                window.location.href = "/";
            }, 5000); // redireciona após 5 segundos

            return () => clearTimeout(timeout);
        }, []);

        return (
            <div className="p-6 text-center">
                <p className="text-red-600 font-semibold text-lg mb-4">
                    ❌ {erro}
                </p>
                <p className="text-gray-500 mb-6">
                    Você será redirecionado automaticamente em 5 segundos...
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    🏠 Voltar para a página inicial
                </Link>
            </div>
        );
    }


    const {
        nome,
        idade,
        sexo,
        vivo,
        urlFoto,
        ultimaOcorrencia
    } = dados;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalhes de {nome}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={urlFoto || "https://via.placeholder.com/300x400?text=Sem+Foto"}
                    alt={nome}
                    className="w-full md:w-64 h-auto object-cover rounded shadow"
                />
                <div className="flex-1 space-y-2">
                    <p><strong>Idade:</strong> {idade}</p>
                    <p><strong>Sexo:</strong> {sexo}</p>
                    <p>
                        <strong>Situação:</strong>{" "}
                        <span className={`px-2 py-1 rounded text-white ${vivo ? "bg-red-500" : "bg-green-500"}`}>
                            {vivo ? "Desaparecido" : "Localizado"}
                        </span>
                    </p>
                    <p><strong>Data do desaparecimento:</strong> {new Date(ultimaOcorrencia.dtDesaparecimento).toLocaleDateString("pt-BR")}</p>
                    <p><strong>Local:</strong> {ultimaOcorrencia.localDesaparecimentoConcat}</p>
                    <p><strong>Vestimentas:</strong> {ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido}</p>
                    <p><strong>Informações:</strong> {ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao}</p>

                    {ultimaOcorrencia.listaCartaz?.length > 0 && (
                        <div className="mt-4">
                            <h2 className="font-semibold">Cartaz:</h2>
                            {ultimaOcorrencia.listaCartaz.map((cartaz, i) => (
                                <a
                                    key={i}
                                    href={cartaz.urlCartaz}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block underline text-blue-600"
                                >
                                    {cartaz.tipoCartaz}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    {vivo ? (
                        <Link to={`/enviar-informacoes/${id}`}>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Enviar Informações
                            </button>
                        </Link>
                    ) : (
                        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded text-center shadow">
                            <p className="font-semibold">Agradecemos pela colaboração 🙏</p>
                            <p className="text-sm">Esta pessoa já foi localizada.</p>
                        </div>
                    )}

                </div>
            </div>
            <Link
                to="/?pagina=1"
                className="inline-block mt-4 mr-2 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
                🏠 Tela Inicial
            </Link>

            <Link
                to={`/?pagina=${paginaAnterior}`}
                className="inline-block mt-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
                Voltar ao quadro de pessoas na pagina {paginaAnterior}
            </Link>

        </div>
    );
}
