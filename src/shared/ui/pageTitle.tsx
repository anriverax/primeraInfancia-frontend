import dynamic from "next/dynamic";
import Image from "next/image";

const LucideIconRenderer = dynamic(
  () => import("@/shared/ui/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

type PageTitleProps = {
  title: string;
  iconName: string;
};

export const PageTitle = ({ title, iconName }: PageTitleProps): React.JSX.Element => (
  <div className="flex flex-col gap-6 w-full p-6 mb-6 rounded-xl bg-[#e9f8ff] relative">
    <div className="grid grid-col-12 items-center">
      <div className="col-span-10 flex items-center gap-2">
        <LucideIconRenderer iconName={iconName} className="h-5 w-5 text-blue-500" />
        <h2>{title}</h2>
      </div>
      <div className="col-span-2 flex justify-center -mb-7 max-h-[120px] max-w-[140px]">
        <div className="hidden sm:block absolute right-7 bottom-0">
          <Image priority src="/titles/teamwork.png" alt="logo del título" width={105} height={55} />
        </div>
      </div>
    </div>
  </div>
);
