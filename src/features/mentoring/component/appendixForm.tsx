import { Button, Divider } from "@heroui/react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, PropsWithChildren } from "react";

/**
 * Props for AppendixForm.
 *
 * Exposes an onSubmit callback compatible with a native form submit event.
 */
type AppendixFormProps = {
  /** Submit handler invoked by the form element. */
  onSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
};

/**
 * Presentation form wrapper used across mentoring appendices.
 *
 * Renders its children as form content, followed by a divider and two actions:
 * - A secondary-styled "Regresar" button that navigates to the parent route
 * - A primary-styled submit button labeled "Enviar formulario inicial"
 *
 * UI strings remain in Spanish to match the existing application language.
 */
export const AppendixForm = ({
  onSubmit,
  children
}: PropsWithChildren<AppendixFormProps>): React.JSX.Element => (
  <form className="space-y-6" onSubmit={onSubmit}>
    {children}
    <Divider className="my-8" />
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
      {/* Navigate back to the previous level (parent directory) */}
      <Button
        as={Link}
        href="../"
        type="submit"
        color="secondary"
        size="lg"
        startContent={<ArrowLeft className="w-4 h-4 mr-2" />}
      >
        Regresar
      </Button>

      {/* Primary submit action for the initial form */}
      <Button type="submit" size="lg" color="primary" startContent={<Send className="w-4 h-4 mr-2" />}>
        Enviar formulario inicial
      </Button>
    </div>
  </form>
);
