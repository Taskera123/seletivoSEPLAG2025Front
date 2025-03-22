import { Link } from "react-router-dom";
import TopoInstitucional from "./TopoInstitucional";
import RodapeInstitucional from "./RodapeInstitucional";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <TopoInstitucional />
      <main className="min-h-screen">{children}</main>
      <RodapeInstitucional />
    </div>
  );
}
