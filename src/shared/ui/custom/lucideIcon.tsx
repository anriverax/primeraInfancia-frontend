import * as Icons from "lucide-react";

interface LucideIconRendererProps {
  iconName: string; // restringe a las keys exportadas por lucide-react
  className?: string | undefined;
}

export const LucideIconRenderer = ({
  iconName,
  ...props
}: LucideIconRendererProps): React.JSX.Element => {
  const IconComponent = (Icons[iconName as keyof typeof Icons] || Icons.HelpCircle) as Icons.LucideIcon;

  return <IconComponent {...props} />;
};
