import gif from '/gif/gifAlzhivida.gif';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <img
        src={gif}
        alt="Cargando..."
        className="w-40 h-40 animate-pulse"
      />
    </div>
  );
}
