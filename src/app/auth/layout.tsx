import { AuthToastProvider } from "@/components/auth/AuthToastProvider";
/**
 * AuthLayout: Main layout for authentication pages
 *
 * Architecture:
 * - Client Component (uses hooks from useFormStatusToast)
 * - Toast notifications for form status handling
 * - Centered authentication UI with gradient background
 */

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps): React.JSX.Element => {
  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-background-gradient">
      <header className="flex flex-col items-center justify-center mb-6 sm:mb-8 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-1 sm:mb-3">
          Bienvenidos
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl">Formación Primera Infancia</h2>
      </header>

      <main className="bg-white max-w-md w-full p-8 rounded-3xl shadow-lg">
        <div className="flex items-center justify-center md:mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Iniciar sesión</h2>
        </div>
        {children}
        <AuthToastProvider />
      </main>
    </div>
  );
};

export default AuthLayout;
