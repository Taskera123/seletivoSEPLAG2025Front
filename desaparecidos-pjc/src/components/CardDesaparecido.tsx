import { Link } from "react-router-dom";

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
      paginaAtual
    }: Props) {
    
    console.log("FOTO:", foto);
    const imagemValida = foto && foto.startsWith("http");
    const imagemPadrao = "https://via.placeholder.com/300x200?text=Sem+Foto";
  
    return (
      <Link  to={`/detalhes/${id}`} state={{ paginaAtual }}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
          <img
            src={imagemValida ? foto : imagemPadrao}
            alt={nome}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">{nome}</h2>
            <p className="text-sm text-gray-600">
              Desaparecido desde:{" "}
              {new Date(dataDesaparecimento).toLocaleDateString("pt-BR")}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                situacao === "Desaparecido"
                  ? "bg-red-200 text-red-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {situacao}
            </span>
          </div>
        </div>
      </Link>
    );
  }
  