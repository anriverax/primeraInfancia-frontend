import { Button, Divider } from "@heroui/react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, PropsWithChildren } from "react";

type AppendixFormProps = {
  onSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
};

export const AppendixForm = ({
  onSubmit,
  children
}: PropsWithChildren<AppendixFormProps>): React.JSX.Element => (
  <form className="space-y-6" onSubmit={onSubmit}>
    {children}
    <Divider className="my-8" />
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
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

      <Button type="submit" size="lg" color="primary" startContent={<Send className="w-4 h-4 mr-2" />}>
        Enviar formulario
      </Button>
    </div>
  </form>
);
