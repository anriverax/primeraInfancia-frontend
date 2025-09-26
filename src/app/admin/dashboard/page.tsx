"use client";

import { ChartSkeleton } from "@/features/dashboard/components/skeleton/chartSkeleton";
import { PieChartSkeleton } from "@/features/dashboard/components/skeleton/pieChartSkeleton";
import { StatsSkeleton } from "@/features/dashboard/components/skeleton/statsSkeleton";

const DashboardPage = (): React.JSX.Element => {
  return (
    <div>
      <h1 className="font-bold text-4xl text-primary-500 mb-6 text-center">Sistema de información</h1>
      <div className="space-y-2">
        <p className="text-lg">
          Este sistema ha sido diseñado para <b>almacenar, gestionar y consultar notas ó asistencia</b>,
          garantizando la organización y el acceso oportuno a la información.
        </p>
        <p>
          Los datos buscan <b>apoyar a las instituciones en la toma de decisiones oportunas</b> y en el
          seguimiento integral del proceso formativo al cuerpo docente de Primera Infancia.
        </p>
      </div>
      <div className="mx-auto px-4 py-8 my-6">
        <StatsSkeleton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartSkeleton />
        <PieChartSkeleton />
      </div>
    </div>
  );
};

export default DashboardPage;
