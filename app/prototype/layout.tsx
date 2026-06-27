import { ToastProvider } from '@/components/prototype/Toast';
import { FavoritesProvider } from '@/components/prototype/FavoritesContext';

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FavoritesProvider>
      <ToastProvider>{children}</ToastProvider>
    </FavoritesProvider>
  );
}