import { IGroupInscriptionTable } from "@/features/grade/components/type"
import { create, StoreApi, UseBoundStore } from "zustand";

type GroupInscriptionListStoreProps = {
    groupInscriptionsList: IGroupInscriptionTable[];
    setGradeInscriptionsList: (
        _groupInscriptions: IGroupInscriptionTable[] | ((_prev: IGroupInscriptionTable[]) => IGroupInscriptionTable[])
    ) => void;
};

export const useGroupInscriptionListStore: UseBoundStore<StoreApi<GroupInscriptionListStoreProps>> =
    create<GroupInscriptionListStoreProps>()((set) => ({
        groupInscriptionsList: [],
        setGradeInscriptionsList: (groupInscriptions: IGroupInscriptionTable[] | ((_prev: IGroupInscriptionTable[]) => IGroupInscriptionTable[])) =>
            set((state) => ({
                groupInscriptionsList: typeof groupInscriptions === "function" ? groupInscriptions(state.groupInscriptionsList) : groupInscriptions
            }))
    }));
