import { FileText, User } from "lucide-react";
import { PropsWithChildren } from "react";

type AppendixLayoutProps = {
  title: string;
  subTitle: string;
  teacher: string;
  description: string;
};

export const AppendixLayout = ({
  title,
  subTitle,
  teacher,
  description,
  children
}: PropsWithChildren<AppendixLayoutProps>): React.JSX.Element => (
  <div className="max-w-4xl mx-auto py-6 space-y-8">
    <div className="space-y-8">
      <div className="inline-flex mr-2 items-center px-3 py-1 rounded-full text-sm border-0 bg-secondary-300 text-white">
        <FileText className="w-3 h-3 mr-1" />
        {title}
      </div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm  border-0 bg-primary-300 text-white">
        <User className="w-3 h-3 mr-1" />
        {decodeURIComponent(teacher)}
      </div>
      <h1 className="text-4xl font-bold mb-3">{decodeURIComponent(subTitle)}</h1>
      <p className="text-lg">{description}</p>
    </div>
    {children}
  </div>
);
