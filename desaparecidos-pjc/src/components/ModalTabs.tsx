import { useState, useEffect } from "react";
import Detalhes from "../pages/Detalhes";
import EnviarInformacoes from "../pages/EnviarInformacoes";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

interface PessoaResponse {
  vivo: boolean;
}

export default function ModalTabs() {
  const { id } = useParams();
  const [abaAtiva, setAbaAtiva] = useState<"detalhes" | "informacoes">("detalhes");
  // const [vivo, setVivo] = useState<boolean>(true);

  // useEffect(() => {
  //   async function buscarSituacao() {
  //     if (!id) return;
  //     try {
  //       const res = await api.get<PessoaResponse>(`/v1/pessoas/${id}`);
  //       // setVivo(res.data.vivo);
  //     } catch (err) {
  //       console.error("Erro ao buscar situacao da pessoa:", err);
  //     }
  //   }
  //   buscarSituacao();
  // }, [id]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow-lg max-w-4xl w-full p-4">
      <div className="flex justify-between border-b mb-4">
        <button
          onClick={() => setAbaAtiva("detalhes")}
          className={`px-4 py-2 ${
            abaAtiva === "detalhes"
              ? "border-b-2 border-blue-500 dark:border-amber-300 font-bold dark:text-white"
              : "text-gray-500"
          }`}
        >
          Detalhes
        </button>

        <button
          onClick={() => setAbaAtiva("informacoes")}
          // disabled={!vivo}
          className={`px-4 py-2 ${
            abaAtiva === "informacoes"
              ? "border-b-2 border-blue-500 dark:border-amber-300 font-bold dark:text-white"
              : "text-gray-500"
          }
           
        
          `}
        >
          Enviar Informações
        </button>
      </div>

      <div>
        {abaAtiva === "detalhes" && <Detalhes />}
        {abaAtiva === "informacoes" && 
        id 
        // && vivo 
        && <EnviarInformacoes />}
      </div>
    </div>
  );
}
