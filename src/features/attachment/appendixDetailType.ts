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
  Question: QuestionInput[]
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
