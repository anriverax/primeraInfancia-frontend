import { Spinner } from "@heroui/react";

export const Loading = (): React.JSX.Element => (
  <div className="flex items-center justify-center my-8">
    <Spinner classNames={{ label: "text-foreground mt-4" }} label="Cargando..." variant="wave" />
  </div>
);
