import { Progress } from "@heroui/react";
import { Info, Users } from "lucide-react";
import { GroupListRender } from "./groupInfo";
import { IGroupDetail } from "../../groupType";
import { IPerson } from "@/shared/types/globals";

const GroupDetailInfo = (props: IGroupDetail): React.JSX.Element => (
  <div className="bg-white border border-blue-100 mt-6 shadow-md rounded-lg">
    <div className="p-6 flex items-center gap-2 bg-blue-50 text-blue-500">
      <Info className="h-5 w-5" />
      <h3 className="text-2xl font-semibold">Información</h3>
    </div>

    <div className="p-6 space-y-4">
      <ul className="space-y-3">
        <GroupListRender numList={1} value={props.name} />
        <GroupListRender numList={2} value={props.department} />
        <GroupListRender numList={3} value={String(props.trainer.fullName)} />
        <li className="text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Mentores:</span>
          </div>

          {props.mentors.map((m: IPerson) => (
            <span key={m.id} className="block px-6 py-1 rounded-full">
              {m.fullName}
            </span>
          ))}
        </li>
      </ul>

      <div className="space-y-2">
        <div className="flex flex-col justify-between text-sm">
          <Progress
            className="max-w-md"
            label="Capacidad"
            maxValue={props?.memberCount}
            showValueLabel={true}
            size="sm"
            value={props?._count?.Inscription}
            valueLabel={
              <span>
                <span>{props?._count?.Inscription}</span>/<span>{props?.memberCount}</span>
              </span>
            }
          />
          {props?._count ? (
            <p className="text-xs text-gray-500">
              {Math.round((props?._count?.Inscription / props?.memberCount) * 100)}% ocupado
            </p>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

export default GroupDetailInfo;
