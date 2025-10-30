import { Card } from "@heroui/react";
import { PropsWithChildren } from "react";

/**
 * Props for AppendixCard.
 *
 * Displays a step indicator, a title and an optional detail paragraph
 * together with arbitrary child content.
 */
type AppendixCardProps = {
  /** Short step label (e.g., "1", "A", or "Step 1"). */
  step: string;
  /** Section title. */
  title: string;
  /** Optional descriptive text shown under the title. */
  detail?: string;
};

/**
 * Card container used to present a single appendix step.
 *
 * It renders a circular step badge on the left, the section title and detail,
 * and then any provided children for custom content (inputs, lists, etc.).
 */
export const AppendixCard = ({
  step,
  title,
  detail,
  children
}: PropsWithChildren<AppendixCardProps>): React.JSX.Element => (
  <Card className="p-6 md:p-8">
    {/*
      Nota de layout: este contenedor es un flex-row con dos hijos: el badge y el cuerpo.
      Para evitar que contenidos anchos (por ejemplo, una tabla con min-width: max-content)
      fuercen el ensanchamiento del Card y generen desbordes horizontales, agregamos
      `min-w-0` al segundo hijo (el contenedor del contenido). En Flexbox, los items
      tienen `min-width: auto` por defecto, lo que impide que reduzcan su ancho por
      debajo del tamaño de su contenido; `min-w-0` permite que el contenido haga wrap
      o se recorte dentro de su contenedor, manteniendo el layout intacto.
    */}
    <div className="flex items-start gap-4">
      {/* Circular step badge */}
      <div className="hidden w-10 h-10 rounded-full bg-primary/10 lg:flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-primary font-bold">{step}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        {detail && <p>{detail}</p>}
        {/* Custom content area */}
        {children}
      </div>
    </div>
  </Card>
);
