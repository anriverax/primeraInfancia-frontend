import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const UpdatedProfileData = {
  isOk: false,
  msg: ""
};

type UpdatedProfileState = typeof UpdatedProfileData;

type UpdatedProfileProps = {
  formStatus: UpdatedProfileState;
  setFormStatus: (_data: UpdatedProfileState) => void;
};

export const useUpdatedProfileStore = create<UpdatedProfileProps>()(
  persist(
    (set) => ({
      formStatus: UpdatedProfileData,
      setFormStatus: (data): void =>
        set((state) => ({
          formStatus: { ...state.formStatus, ...data }
        }))
    }),
    {
      name: "updated-profile-storage", // key in localStorage
      storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
);
