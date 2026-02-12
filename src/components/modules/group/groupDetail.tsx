// import { Button } from "@heroui/react";
import { DepartGroup } from "./group.type";

type GroupDetailProps = {
  groupData: DepartGroup;
};

const GroupDetail = ({ groupData }: GroupDetailProps): React.JSX.Element => (
  <div className="border border-neutral-200 rounded-lg p-6 backdrop-blur-sm">
    <h2 className="text-sm uppercase font-light tracking-wider mb-[5px]">Grupo</h2>
    <div className="mb-4">
      <h3 className=" text-lg font-bold mb-1 break-words text-neutral-900">{groupData.name}</h3>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b transition-colors border-neutral-200">
      <div className="rounded-lg p-4 col-span-2 transition-colors bg-primary-500/10">
        <p className="text-xs uppercase mb-2 text-neutral-600">Miembros</p>
        <p className="text-lg font-bold text-primary-500">{groupData.memberCount}</p>
      </div>
    </div>
    {/*<div className="space-y-3">
      <Button className="btn-primary w-full">Ver detalles</Button>
      <Button className="w-full btn-secondary">Editar</Button>
    </div>*/}
  </div>
);

export default GroupDetail;
