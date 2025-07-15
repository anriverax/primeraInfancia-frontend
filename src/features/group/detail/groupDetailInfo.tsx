import { Progress } from "@heroui/react";
import { MapPin, Users } from "lucide-react";
import { IGroupTable } from "../groupType";

const GroupDetailInfo = (props: IGroupTable) => {
  return (
    <div className="bg-white border border-blue-100 mt-6 max-h-[258px]">
      <div className="p-6 flex items-center gap-2 bg-blue-50 text-blue-500">
        <Users className="h-5 w-5" />
        <h3 className="text-2xl font-semibold">{props?.name}</h3>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-sm text-gray-600">{props?.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Zona:</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 border-blue-500 border text-blue-700">
              {props?.Zone?.name}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col justify-between text-sm">
            <Progress
              className="max-w-md"
              label="Capacidad"
              maxValue={props?.memberCount}
              showValueLabel={true}
              size="sm"
              value={props?._count?.GroupMember}
              valueLabel={
                <span>
                  <span>450</span>/<span>{props?.memberCount}</span>
                </span>
              }
            />
            {props?._count ? (
              <p className="text-xs text-gray-500">
                {Math.round((props?._count?.GroupMember / props?.memberCount) * 100)}%
                ocupado
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailInfo;
