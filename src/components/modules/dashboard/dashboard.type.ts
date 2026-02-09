export interface SchoolList {
  id: number;
  code: number;
  name: string;
  zone: string;
  coordenates: string;
  Cohort: {
    id: number;
    name: string;
  };
  districtName: string;
  municipalityName: string;
  departmentName: string;
  region: string;
  teachersCount: number;
}

export interface GlobalStat {
  total: number;
  teachersCount: number;
  ruralPct: number;
  urbanoPct: number;
}

export interface PopupData extends Omit<SchoolList, "Cohort" | "coordenates"> {
  lat: number;
  lng: number;
}
