'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

export default function FullScreenLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Escuchar cambios de ruta
  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    handleRouteChangeStart();
    
    // Al cambiar a una nueva ruta, se activa la carga
    const timeout = setTimeout(() => {
      handleRouteChangeComplete();
    }, 1000); // Simula un retraso en la carga, ajusta según sea necesario

    // Limpiar el timeout
    return () => {
      clearTimeout(timeout);
      handleRouteChangeComplete();
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
      <ClipLoader color="red" size={80} />
    </div>
  );
}
