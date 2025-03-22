import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import { FiltroProvider } from "../components/FiltroContext"

const Home = lazy(() => import("../pages/Home"));
const Detalhes = lazy(() => import("../pages/Detalhes"));
const EnviarInformacoes = lazy(() => import("../pages/EnviarInformacoes"));

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <FiltroProvider>
                <Layout>
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
                </Layout>
            </FiltroProvider>
        </BrowserRouter>
    );
}
