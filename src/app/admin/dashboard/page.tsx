"use client";

import { ChartSkeleton } from "@/features/dashboard/components/skeleton/chartSkeleton";
import { PieChartSkeleton } from "@/features/dashboard/components/skeleton/pieChartSkeleton";
import { StatsSkeleton } from "@/features/dashboard/components/skeleton/statsSkeleton";

const DashboardPage = (): React.JSX.Element => {
  return (
    <div>
      <h1 className="font-bold text-4xl text-primary-500 mb-6 text-center">
        Bienvenido al Sistema de Información
      </h1>
      <div className="space-y-2">
        <p className="text-lg">
          Este sistema ha sido diseñado para{" "}
          <b>almacenar, gestionar y consultar notas, asistencia y seguimientos académicos</b>,
          garantizando la organización y el acceso oportuno a la información.
        </p>
        <p>
          Su finalidad es <b>apoyar a las instituciones educativas en la toma de decisiones</b> y en el
          seguimiento integral del proceso formativo de los estudiantes.
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
