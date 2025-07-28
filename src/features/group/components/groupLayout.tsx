import dynamic from "next/dynamic";
import { GroupInput } from "../groupType";

const GroupTable = dynamic(() => import("./table").then((mod) => mod), {
  ssr: false
});

const GroupForm = dynamic(() => import("./groupForm").then((mod) => mod), {
  ssr: false
});

type GroupLayoutProps = {
  isOpen: boolean;
  onEditGroup: (_data?: GroupInput | null) => void;
};

const GroupLayout = ({ isOpen, onEditGroup }: GroupLayoutProps): React.JSX.Element => (
  <div className="space-y-4">
    <GroupTable onEditGroup={onEditGroup} />
    {isOpen && <GroupForm isOpen={isOpen} />}
  </div>
);

export default GroupLayout;
