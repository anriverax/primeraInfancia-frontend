/**
 * AuthLayout (Server Component): Main layout for authentication pages
 *
 * Architecture:
 * - Server Component by default (no "use client")
 * - Delegates client-side logic to ToastNotificationProvider
 * - Provides clean separation of concerns
 *
 * Features:
 * - Centered authentication UI with gradient background
 * - Responsive design with Tailwind CSS
 * - Notification handling delegated to client component
 *
 * @param {React.ReactNode} children - Child components (pages)
 * @returns {React.JSX.Element} The authentication layout component
 */
import { useFormStatusToast } from "@/shared/hooks/ui/useFormStatusToast";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps): React.JSX.Element => {
  useFormStatusToast();

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-background-gradient">
      <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-1 sm:mb-3">
          Bienvenidos
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl">Formación Primera Infancia</h2>
      </div>

      <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-lg">
        <div className="flex items-center justify-center md:mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Iniciar sesión</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
