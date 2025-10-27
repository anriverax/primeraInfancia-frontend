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

//SE TIENE QUE BORRAR ESTO
export interface AppendixDetailListResult {
  appendixDetailsList: IAppendixDetailTable;
  setAppendixDetailsList: (_appendixDetails: IAppendixDetailTable) => void;
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

interface QuestionAnswerDto {
  questionText: string;
  answer: string;
}

interface AppendixDto {
  title: string;
  questions: QuestionAnswerDto[];
}

export interface PersonAppendixDto {
  Person: {
    firstName: string;
    lastName1: string;
    lastName2: string | null;
  };
  Appendix: AppendixDto[];
}

export interface TeacherAppendixData {
  inscriptionId: number;
  appendixId?: number;
  fullName: string;
}

export interface AppendixByInscription {
  title: string;
  color: string;
  answer_count: number;
}
