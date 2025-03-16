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
  grupalData: ICategoria[];
  individualData: ICategoria[];
}

export interface ICategoria {
  title: string;
  subtitle?: string;
  table: string;
  values: IPregunta[];
}

export interface IPregunta {
  id?: number;
  columnName?: string;
  orden?: number;
  label: string;
  description?: string | null;
  type: ETipoPregunta | string;
  options?:
    | IOptionsCheck
    | IOptionsSelect[]
    | IOptionsSelectFilter
    | IOptionsSelectDependient
    | null
    | any;
  default: boolean | string | null;
  visibility: IOptionsVisibility | boolean | null;
  required: IOptionsRequired | boolean | null;
  value?: any;
  ficha_grupo_id?: string | number | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  nombrePadreDependiente?: string;
  alerta?: IAlertaConfig;
}

export enum ETipoPregunta {
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

export interface IOptionsSelectDependient {
  valueDependiente: string;
  value: string;
  option: string;
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
export interface ICodigos {
  id?: number;
  user_id?: number;
  start: number;
  finish: number;
}
export interface IGuardarFormularioGrupal {
  version: string;
  dateLastVersion: Date;
  dateRegister?: Date;
  code: number;
  userId?: number;
  data: IDatosFormularioGrupal;
}
export interface IDatosFormularioGrupal {
  grupalData: ICategoria[];
  individualData: ICategoria[][];
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
  codes: ICodigos[];
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
  data: ICategoria[];
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

export interface IAlertaConfig {
  genera_alerta: boolean;
  valores_alerta?: {
    [key: string]: number; // Para select/options: {"1": 3, "2": 2, "3": 1}
  };
  peso?: number; // Por si algunas preguntas pesan más que otras en el cálculo
}
