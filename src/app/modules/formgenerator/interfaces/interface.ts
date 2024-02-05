export interface IHttpResponse<T> {
  data: T;
  msj: string;
  code: number;
}
export interface IFamilyCard {
  version: string;
  dateLastVersion: Date;
  familyCard: IStepers[];
  personCard: IStepers[];
}

export interface IStepers {
  title: string;
  subtitle?: string;
  values: ISteperValues[];
}

export interface ISteperValues {
  columnName: string;
  order: number;
  label: string;
  description: string;
  type: ESteperType;
  options: IOptionsCheck | IOptionsSelect[];
  default: boolean | string;
  visibility: IOptionsVisibility | boolean | null;
  required: IOptionsRequired | boolean | null;
  value?: any;
}

export enum ESteperType {
  Address = 'address',
  Calendar = 'calendar',
  Photo = 'photo',
  Check = 'check',
  Email = 'email',
  Filter = 'filter',
  GPS = 'gps',
  Numbers = 'numbers',
  Phone = 'phone',
  Relationship = 'relationship',
  Select = 'select',
  SelectFilter = 'selectFilter',
  Text = 'text',
  TextArea = 'textarea'
}

export interface IOptionsCheck {
  valueTrue: string;
  valueFalse: string;
}

export interface IOptionsSelect {
  value: string;
  option: string;
}

export interface IOptionsRequired {
  isDepend: boolean;
  rules: any;
  required: boolean;
}

export interface IOptionsVisibility {
  isDepent: boolean;
  rules: Array<IOptionsRule[]> | null;
  isShow: boolean;
}

export interface IOptionsRule {
  columnDepend: string;
  rule: string;
  value: string;
}
export interface ICodes {
  id?: number;
  user_id?: number;
  start: number;
  finish: number;
}
export interface IFamilyCardSave {
  version: string;
  dateLastVersion: Date;
  dateRegister?: Date;
  code: number;
  userId?: number;
  data: IDataFamilyCard;
}
export interface IDataFamilyCard {
  familyCard: IStepers[];
  personCard: IStepers[][];
}

export interface IUser {
  id: number;
  username: string;
  nombrePrimero: string;
  nombreSegundo: null;
  apellidoPrimero: string;
  apellidoSegundo: null;
  documento: string;
  documentoTipoId: number;
  codes: ICodes[];
  currentCode: number;
}
