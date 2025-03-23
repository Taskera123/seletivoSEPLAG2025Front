import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function EnviarInformacoes() {
    const url = "https://abitus-api.geia.vip";
    const { id } = useParams();
    const [informacao, setInformacao] = useState("");
    const [local, setLocal] = useState("");
    const [data, setData] = useState("");
    const [foto, setFoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [anexosBase64, setAnexosBase64] = useState<string[]>([]);
    const [ocoId, setOcoId] = useState<number | null>(null);
    const [carregando, setCarregando] = useState(false);


    useEffect(() => {
        if (id) {
            axios
                .get(`${url}/v1/pessoas/${id}`)
                .then((res) => {
                    console.log("Pessoa retornada:", res.data);
                    setOcoId(res.data?.ultimaOcorrencia?.ocoId ?? null);
                })
                .catch((err) => {
                    console.error("Erro ao buscar dados:", err);
                });
        }
    }, [id]);

    // Função para lidar com o upload da foto
    const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFoto(file);
            setPreview(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const base64 = (reader.result as string).split(",")[1]; // remove o prefixo
                    setAnexosBase64([base64]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Envio do formulário
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setCarregando(true);

        if (!ocoId) {
            setMensagem("Ocorreu um erro ao carregar os dados da ocorrência.");
            setCarregando(false);
            return;
        }

        if (informacao.trim().length < 10 || !local || !data) {
            setMensagem("Preencha todos os campos obrigatórios corretamente.");
            setCarregando(false);
            return;
        }

        const formData = new FormData();
        formData.append("ocoId", ocoId.toString());
        formData.append("informacao", informacao);
        formData.append("data", data);
        formData.append("id", id!.toString());

        // anexos base64
        anexosBase64.forEach((base64, i) => {
            formData.append(`anexos[${i}]`, base64);
        });

        try {
            await axios.post(`${url}/v1/ocorrencias/informacoes-desaparecido`, formData);
            setMensagem("Informações enviadas com sucesso!");
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao enviar as informações.");
        } finally {
            setCarregando(false);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* <div className="fixed top-4 left-4 z-50 flex flex-row gap-2">
                <Link to={`/?pagina=1`}>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400 transition">
                        Tela Inicial
                    </button>
                </Link>

                <Link to={`/detalhes/${id}`}>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400 transition">
                        Voltar
                    </button>
                </Link>
            </div> */}
            <h1 className="text-2xl font-bold mb-4  text-gray-900 dark:text-white ">Enviar Informações sobre a Pessoa</h1>
            {mensagem && (
                <div className="mb-4 p-2 bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 rounded">
                    {mensagem}
                </div>
            )}
            {carregando && (
                <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded text-center">
                    Enviando informações... aguarde
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1  text-gray-900 dark:text-white" htmlFor="informacao">
                        Informação
                    </label>
                    <textarea
                        id="informacao"
                        value={informacao}
                        onChange={(e) => setInformacao(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded p-2"
                        placeholder="Descreva as informações que você tem..."
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1  text-gray-900 dark:text-white" htmlFor="local">
                        Local onde foi visto
                    </label>
                    <input
                        
                        type="text"
                        id="local"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded p-2"
                        placeholder="Informe o local..."
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1  text-gray-900 dark:text-white" htmlFor="data">
                        Data da Ocorrência
                    </label>
                    <input
                        type="date"
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded p-2"
                        required
                    />
                </div>
                <div>
                    <div>
                        <label className="block font-semibold mb-1  text-gray-900 dark:text-white">Enviar Fotografia (opcional)</label>

                        <label
                            htmlFor="foto"
                            className="inline-block px-4 py-2  bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-white cursor-pointer transition"
                        >
                            Selecionar Imagem
                        </label>

                        <input
                            type="file"
                            id="foto"
                            accept="image/*"
                            onChange={handleFotoChange}
                            className="hidden"
                        />

                        {preview && (
                            <div className="mt-4">
                                <h2 className="font-semibold mb-1 text-center">Pré-visualização:</h2>
                                <div className="flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Preview da foto"
                                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border rounded shadow-md"
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-white disabled:opacity-50"
                    disabled={carregando}
                >
                    {carregando ? "Enviando..." : "Enviar"}
                </button>
            </form>
            {/* <div className="mt-6 text-center">
                <Link to="/?pagina=1">
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition">
                        Voltar para Tela Inicial
                    </button>
                </Link>
            </div> */}
        </div>
    );
}
