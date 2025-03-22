import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Detalhes = lazy(() => import("../pages/Detalhes"));
const EnviarInformacoes = lazy(() => import("../pages/EnviarInformacoes"));

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/detalhes/:id"
                        element={
                            <Suspense fallback={<div>Carregando...</div>}>
                                <Detalhes />
                            </Suspense>
                        }
                    />
                    <Route path="/enviar-informacoes/:id" element={<EnviarInformacoes />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
