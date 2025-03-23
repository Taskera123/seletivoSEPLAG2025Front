import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import { FiltroProvider } from "../components/FiltroContext";
import Modal from "../components/Modal";
import ModalTabs from "../components/ModalTabs";

const Home = lazy(() => import("../pages/Home"));
const Detalhes = lazy(() => import("../pages/Detalhes"));
const EnviarInformacoes = lazy(() => import("../pages/EnviarInformacoes"));

function AppRoutesContent() {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            {/* Roteamento principal */}
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/detalhes/:id" element={<Layout><Detalhes /></Layout>} />
                <Route path="/enviar-informacoes/:id" element={<Layout><EnviarInformacoes /></Layout>} />
            </Routes>

            {/* Se o usuário veio de outra página (ex: Home), renderiza Detalhes como Modal */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/detalhes/:id" element={<Modal><ModalTabs /></Modal>} />
                    <Route path="/enviar-informacoes/:id" element={<Modal><ModalTabs /></Modal>} />
                </Routes>
            )}
        </>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <FiltroProvider>
                <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
                    <AppRoutesContent />
                </Suspense>
            </FiltroProvider>
        </BrowserRouter>
    );
}
