import dynamic from "next/dynamic";

const LucideIconRenderer = dynamic(
  () => import("@/shared/ui/custom/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

type PageTitleProps = {
  title: string;
  iconName: string;
};

export const PageTitle = ({ title, iconName }: PageTitleProps): React.JSX.Element => (
  <div className="flex items-center gap-4">
    <LucideIconRenderer iconName={iconName} className="h-5 w-5 text-blue-500" />
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
  </div>
);
