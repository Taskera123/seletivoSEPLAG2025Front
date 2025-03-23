import { useNavigate } from "react-router-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded shadow-lg w-full max-w-2xl p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
