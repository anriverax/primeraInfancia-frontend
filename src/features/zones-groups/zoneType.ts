export interface IZoneList {
  id: number;
  name: string;
}

export type IZoneColumnKey = "name" | "actions";

export interface formState {
  visible: boolean;
  data?: IZoneList | null;
  state: "Z" | "G";
}
