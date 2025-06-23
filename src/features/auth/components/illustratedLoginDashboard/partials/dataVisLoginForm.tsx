import { DataVisLoginFormResponse } from "@/features/auth/type";
import { Check, X } from "lucide-react";
import { memo, MemoExoticComponent } from "react";

const TodoList: MemoExoticComponent<() => React.JSX.Element> = memo(() => (
  <>
    <div className="flex items-center mb-4">
      <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center mr-3">
        <Check size={14} className="text-white" />
      </div>
      <div className="w-20 h-2 bg-blue-400 rounded"></div>
    </div>
    <div className="flex items-center mb-4">
      <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center mr-3">
        <Check size={14} className="text-white" />
      </div>
      <div className="w-16 h-2 bg-blue-400 rounded"></div>
    </div>

    <div className="flex items-center mb-4">
      <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center mr-3">
        <X size={14} className="text-white" />
      </div>
      <div className="w-20 h-2 bg-blue-400 rounded"></div>
    </div>
  </>
));

const CheckList: MemoExoticComponent<() => React.JSX.Element> = memo(() => (
  <>
    <div className="flex items-center mb-4">
      <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center mr-3">
        <Check size={14} className="text-white" />
      </div>
      <div className="w-20 h-2 bg-blue-300 rounded"></div>
    </div>
    <div className="flex items-center mb-4">
      <div className="w-16 h-2 bg-blue-300 rounded mb-1"></div>
      <div className="w-12 h-2 bg-blue-300 rounded ml-2"></div>
    </div>
    <div className="flex items-center mb-4">
      <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center mr-3">
        <Check size={14} className="text-white" />
      </div>
      <div className="w-16 h-2 bg-blue-300 rounded"></div>
    </div>
    <div className="w-24 h-12 bg-blue-100 rounded mt-4"></div>
    <div className="w-20 h-2 bg-blue-300 rounded mt-2"></div>
  </>
));

const Dashboard: MemoExoticComponent<() => React.JSX.Element> = memo(() => (
  <>
    {/* Small calendar representation */}
    <div className="mb-4">
      <div className="w-full h-5 bg-blue-500 rounded-t-sm flex items-center justify-between px-2">
        <div className="w-4 h-1 bg-white rounded-full"></div>
        <div className="w-4 h-1 bg-white rounded-full"></div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-blue-50 p-1 rounded-b-sm">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-4 ${i % 3 === 0 ? "bg-blue-200" : "bg-white"} rounded-sm flex items-center justify-center`}
          >
            {i === 4 && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>

    {/* Chart representation */}
    <div className="w-full h-16 bg-blue-50 rounded-sm p-1 mb-4">
      <div className="flex items-end h-full space-x-1 justify-around">
        <div className="w-3 bg-blue-300 rounded-t-sm" style={{ height: "30%" }}></div>
        <div className="w-3 bg-blue-400 rounded-t-sm" style={{ height: "50%" }}></div>
        <div className="w-3 bg-blue-500 rounded-t-sm" style={{ height: "80%" }}></div>
        <div className="w-3 bg-blue-600 rounded-t-sm" style={{ height: "60%" }}></div>
        <div className="w-3 bg-blue-400 rounded-t-sm" style={{ height: "40%" }}></div>
      </div>
    </div>

    {/* Task list representation */}
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-sm border border-blue-400 mr-2 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
        </div>
        <div className="w-20 h-1.5 bg-blue-300 rounded-full"></div>
      </div>
    </div>
  </>
));

TodoList.displayName = "MemorizedTodoList";
CheckList.displayName = "MemorizedCheckList";
Dashboard.displayName = "MemorizedDashboard";

export const DataVisLoginForm: DataVisLoginFormResponse[] = [
  { id: "todoList", Component: TodoList },
  { id: "checkList", Component: CheckList },
  { id: "dashboard", Component: Dashboard }
];
