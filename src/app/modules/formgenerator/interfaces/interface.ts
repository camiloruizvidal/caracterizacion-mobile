export interface IHttpResponse<T> {
  data: T;
  msj: string;
  code: number;
}
export interface IGrupalCard {
  version: string;
  dateLastVersion: Date;
  individualNombre: string;
  grupalNombre: string;
  grupalData: IStepers[];
  individualData: IStepers[];
}

export interface IStepers {
  title: string;
  subtitle?: string;
  table: string;
  values: ISteperValues[];
}

export interface ISteperValues {
  id?: number;
  columnName: string;
  orden: number;
  label: string;
  description: string;
  type: ESteperType;
  options: IOptionsCheck | IOptionsSelect[] | IOptionsSelectFilter;
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
  CheckSiNo = 'checkSiNo',
  Email = 'email',
  Filter = 'filter',
  GPS = 'gps',
  Numbers = 'numbers',
  Phone = 'phone',
  Relationship = 'relationship',
  Select = 'select',
  SelectFilter = 'selectFilter',
  SelectDependiente = 'selectDependiente',
  Text = 'text',
  TextArea = 'textarea',
  Title = 'title',
  SubTitle = 'subtitle',
  Ruta = 'ruta_atencion',
  selectMultiple = 'select_multiple'
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
export interface IGrupalCardSave {
  version: string;
  dateLastVersion: Date;
  dateRegister?: Date;
  code: number;
  userId?: number;
  data: IDataGrupalCard;
}
export interface IDataGrupalCard {
  grupalData: IStepers[];
  individualData: IStepers[][];
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

export interface IPaginationResult<T> {
  data: T;
  page: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPaciente {
  id: number;
  nombre_primero: string;
  nombre_segundo?: string;
  apellido_primero: string;
  apellido_segundo?: string;
  documento: string;
  sexo?: string;
  fecha_nacimiento?: Date;
  parentesco?: string;
  ocupacion?: string;
  aporta_ingresos?: boolean;
  nivel_escolaridad?: string;
  afiliacion_salud_tipo?: string;
  grupo_atencion_especial?: string;
  tiene_discapacidad?: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IOptionsSelectFilter {
  label: string;
  tabla_destino: string;
  item_busqueda: string;
  relaciones: IOptionsSelectFilterRelaciones[];
  formato_listado_mostrar: string;
  create_new: boolean;
  label_no_exist?: string;
}

export interface IOptionsSelectFilterRelaciones {
  origen: string;
  destino: string;
}

export interface IEventSteper {
  data: IStepers[];
  status: IEventSteperStatus;
}

export enum IEventSteperStatus {
  salir = 'Salir',
  nuevo = 'Nuevo'
}

export interface IRutasAtencion {
  genero: string;
  edad_inicial: number;
  edad_final: number;
  categoria: string;
  descripcion: string;
  examenes_medicos_recomendados: string[];
}
