import { Link } from "react-router-dom";
import ImagemComFallback from "./ImagemComFallBack";

interface Props {
  id: number;
  nome: string;
  foto: string;
  situacao: string;
  dataDesaparecimento: string;
  paginaAtual: number;
}

export default function CardDesaparecido({
  id,
  nome,
  foto,
  situacao,
  dataDesaparecimento,
  paginaAtual,
}: Props) {
  console.log(foto)
  return (
    <Link to={`/detalhes/${id}`} state={{ paginaAtual }}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-[400px] flex flex-col">
        <ImagemComFallback
          src={foto}
          alt={nome}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="p-4 flex-1 flex flex-col justify-between items-center text-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{nome}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Desaparecido desde:{" "}
              {new Date(dataDesaparecimento).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <span
            className={`inline-block mt-4 px-4 py-2 text-xs font-semibold rounded-full ${situacao === "Desaparecido"
              ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-white"
              : "bg-green-200 text-green-800 dark:bg-green-800 dark:text-white"
              }`}
          >
            {situacao}

          </span>
          
        </div>
      </div>
    </Link>
  );
}
