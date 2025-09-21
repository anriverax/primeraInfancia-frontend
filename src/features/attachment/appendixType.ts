export interface AppendixInput {
  id?: null;
  instrumentName: string;
  periodicity: string;
  percentage: number;
}

export interface IAppendixTable extends AppendixInput {
  _count?: {
    Group: number;
  };
}

export interface AppendixListResult {
  appendixsList: IAppendixTable[];
  setAppendixsList: (_appendixs: IAppendixTable[]) => void;
}
