import { AuthToastProvider } from "@/components/auth/AuthToastProvider";

/**
 * Props for AuthLayout.
 * @property children - Child components to render within the layout.
 */
type AuthLayoutProps = {
  children: React.ReactNode;
};

/**
 * Authentication layout with centered form, gradient background, and toast notifications.
 * @param props - Layout props.
 * @returns Rendered authentication layout.
 */
const AuthLayout = ({ children }: AuthLayoutProps): React.JSX.Element => {
  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center authentication-background">
      <header className="flex mb-6 sm:mb-8">
        <h1 className="text-white">Formación Primera Infancia</h1>
      </header>
      <main className="bg-white max-w-sm w-full p-12 rounded-xl shadow-lg">
        <header className="flex flex-col mb-6 sm:mb-10">
          <h1>Iniciar Sesión</h1>
          <p className="text-[14px] font-light text-neutral-500">Hola, bienvenido de nuevo</p>
        </header>
        {children}
        <AuthToastProvider />
      </main>
    </div>
  );
};

export default AuthLayout;
