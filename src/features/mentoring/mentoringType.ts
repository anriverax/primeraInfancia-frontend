export interface AppendixDetailInput {
  id?: null;
  title: string;
  subTitle: string;
  description: number;
  Section: SectionInput[];
}

export interface SectionInput {
  id?: null;
  title: string;
  summary: string;
  orderBy: number;
  Question: QuestionInput[];
}

export interface QuestionInput {
  id?: null;
  text: string;
  questionType: string;
  orderBy: number;
  subSection: string;
  isRequired: boolean;
}

export interface IAppendixDetailTable extends AppendixDetailInput {
  _count?: {
    Group: number;
  };
}

export interface AppendixDetailListResult {
  appendixDetailsList: IAppendixDetailTable[];
  setAppendixDetailsList: (_appendixDetails: IAppendixDetailTable[]) => void;
}

export interface AppendixInput {
  id?: null;
  instrumentName: string;
  periodicity: string;
  percentage: number;
}

export interface IAppendixTable {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  periodicity: string;
  iconName: string;
  color: string;
}

export interface AppendixListResult {
  appendixsList: IAppendixTable[];
  setAppendixsList: (_appendixs: IAppendixTable[]) => void;
}
