import { Card, CardBody } from "@heroui/react";

import UserAvatar from "@/shared/ui/topbar/partials/userAvatar";

type AppendixByInscription = {
  title: string;
  answer_count: number;
  color: string;
};
type TeacherViewProps = {
  fullName: string;
  appendixByInscription: AppendixByInscription[];
};

const TeacherView = ({ fullName, appendixByInscription }: TeacherViewProps): React.JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 w-full h-full">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/20">
          <CardBody className="pt-3">
            <div className="flex items-start justify-between mb-6">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200`}
              ></div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className={`p-2 rounded-lg shrink-0`}>
                <UserAvatar />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground text-balance leading-tight mb-2">
                  {fullName}
                </h3>
                {appendixByInscription?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-surface px-3 py-2 rounded-md border border-muted"
                  >
                    <span className="text-sm font-medium text-default-700">{item.title}</span>
                    <span className="text-sm text-default-500">{item.answer_count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TeacherView;
