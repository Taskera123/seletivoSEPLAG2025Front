import { useEffect, useState } from "react";
import logo from "../assets/logo-pjc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFiltro } from "./FiltroContext";

export default function TopoInstitucional() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mostrarFiltros, alternarFiltros } = useFiltro();
  const isHome = location.pathname === "/";
  const isDetalhes = location.pathname.startsWith("/detalhes/");
  const isEnviar = location.pathname.startsWith("/enviar-informacoes/");
  const mostrarBotoes = isDetalhes || isEnviar;

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow">
      <div className="w-full border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center text-sm">
          <div className="flex gap-4 md:flex-row  items-center">
            <span>MT.GOV.BR</span>
            <Link to="#" className="hover:underline">Contatos</Link>
            <span className="hidden md:inline">Alternar modo escuro/claro:</span>
            <button
              onClick={() => setDark((prev) => !prev)}
              className="text-lg hover:text-yellow-300 transition"
              title="Alternar modo escuro/claro"
            >
              {dark ? "☀" : "🌙"}
            </button>
          </div>
        </div>
      </div>
      

      <div className="w-full border-b border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} alt="PJC" className="h-16" />
            <div>
              <h1 className="text-xl font-bold leading-tight text-right">
              QUADRO DE PESSOAS DESAPARECIDAS - PJC-MT 
              </h1>
            </div>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-lg font-bold">
              Denuncie: <span className="text-blue-400">197/181</span>
            </p>
            <p className="text-sm">3613-6981</p>
          </div>
        </div>
      </div>

      <nav className="w-full bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-4 text-sm font-semibold">
          {/* <Link to="#">INSTITUCIONAL</Link>
          <Link to="#">LEGISLAÇÃO</Link>
          <Link to="#">IMPRENSA</Link>
          <Link to="#">SERVIDOR</Link>
          <Link to="#">UNIDADES</Link>
          <Link to="#">ESTATÍSTICA</Link>
          <Link to="#">OUVIDORIA</Link>
          <Link to="#">TRANSPARÊNCIA</Link>
          <Link to="#">PERGUNTAS FREQUENTES</Link> */}

          {isHome && (
            <button onClick={alternarFiltros} className="hover:underline text-white">
              {mostrarFiltros ? "ESCONDER FILTROS" : "MOSTRAR FILTROS DE BUSCA"}
            </button>
          )}

          {mostrarBotoes && (
            <>
              <Link to="/?pagina=1" className="hover:underline text-white">
                TELA INICIAL
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="hover:underline text-white"
              >
                VOLTAR
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
