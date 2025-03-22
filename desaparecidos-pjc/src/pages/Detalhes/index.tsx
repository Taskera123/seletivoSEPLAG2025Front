import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ImagemComFallback from "../../components/ImagemComFallBack";


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
                    Voltar para a página inicial
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
            <div className="fixed top-4 left-4 z-50 flex flex-row gap-2 ">
            {/* <Link to="/?pagina=1">
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 w-full md:w-auto">
                        Tela Inicial
                    </button>
                </Link>

                <Link to={`/?pagina=${paginaAnterior}`}>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 w-full md:w-auto">
                        Voltar para página {paginaAnterior}
                    </button>
                </Link> */}
            </div>
            <h1 className="text-2xl font-bold mb-5 gap-4 m-5">Detalhes de {nome}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                {/* <img
                    src={urlFoto || "https://via.placeholder.com/300x400?text=Sem+Foto"}
                    alt={nome}
                    className="w-full md:w-64 h-auto object-cover rounded shadow"
                /> */}
                <ImagemComFallback
                    src={urlFoto}
                    alt={nome}
                    destaqueStatus={vivo ? "Desaparecido" : "Localizado"}
                    className="w-full md:w-64 h-[300px] object-cover rounded"
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
                {/* <div className="mt-6">
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

                </div> */}
            </div>
            {/* Botão ou mensagem do topo */}
            <div className="mt-6">
                {vivo ? (
                    <Link to={`/enviar-informacoes/${id}`}>
                        <button className=" bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-white px-4 py-2 rounded transition w-full md:w-auto">
                            Enviar Informações
                        </button>
                    </Link>
                ) : (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-center shadow w-full md:w-auto">
                        <p className="font-semibold">Agradecemos pela colaboração 🙏</p>
                        <p className="text-sm">Esta pessoa já foi localizada.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
