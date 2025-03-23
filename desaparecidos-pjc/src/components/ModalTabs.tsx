import { useState } from "react";
import Detalhes from "../pages/Detalhes";
import EnviarInformacoes from "../pages/EnviarInformacoes";
import { useParams } from "react-router-dom";

export default function ModalTabs() {
  const { id } = useParams();
  const [abaAtiva, setAbaAtiva] = useState<"detalhes" | "informacoes">("detalhes");

  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow-lg max-w-4xl w-full p-4">
      <div className="flex justify-between border-b mb-4">
        <button
          onClick={() => setAbaAtiva("detalhes")}
          className={`px-4 py-2 ${abaAtiva === "detalhes" ? "border-b-2 border-blue-500 dark:border-amber-300 font-bold dark:text-white" : "text-gray-500 dark: "}`}
        >
          Detalhes
        </button>
        <button
          onClick={() => setAbaAtiva("informacoes")}
          className={`px-4 py-2 ${abaAtiva === "informacoes" ? "border-b-2 border-blue-500 dark:border-amber-300 font-bold dark:text-white" : "text-gray-500"}`}
        >
          Enviar Informações
        </button>
      </div>

      <div>
        {abaAtiva === "detalhes" && <Detalhes />}
        {abaAtiva === "informacoes" && id && <EnviarInformacoes />}
      </div>
    </div>
  );
}
