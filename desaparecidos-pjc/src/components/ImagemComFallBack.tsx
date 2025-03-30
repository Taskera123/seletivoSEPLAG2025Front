import { useState, useEffect } from "react";
import imagemPadrao from "../assets/sem-foto.png";

interface ImagemComFallbackProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  destaqueStatus?: "Morto" | "Vivo";
}

export default function ImagemComFallback({
  src,
  alt,
  className = "",
  skeletonClassName = "w-full h-48 bg-gray-200 animate-pulse rounded-t-xl",
  destaqueStatus,
}: ImagemComFallbackProps) {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    if (!src) {
      setErro(true);
      setIsFallback(true);
      setCarregando(false);
    }
  }, [src]);

  const borderColor =
    // destaqueStatus === "Morto" ? "border-red-400" : destaqueStatus === "Vivo" ? "border-green-400" : "border-gray-200";
    destaqueStatus === "Morto" ? "border-red-400" : "border-green-400";
  return (
    <div className={`relative ${borderColor} border-4 rounded`}>
      {carregando && <div className={skeletonClassName} />}
      <img
        loading="lazy"
        decoding="async"
        src={!erro && src ? src : imagemPadrao}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${carregando ? "opacity-0" : "opacity-100"
          }`}
        onLoad={() => setCarregando(false)}
        onError={() => {
          setErro(true);
          setIsFallback(true);
          setCarregando(false);
        }}
      />


      {isFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
            Foto não disponível
          </div>
        </div>
      )}
    </div>
  );
}
