export interface IFamilyCard {
    version:         string;
    dateLastVersion: Date;
    familyCard:      IStepers[];
    personCard:      IStepers[];
}

export interface IStepers {
    title:  string;
    subtitle?: string;
    values: ISteperValues[];
}

export interface ISteperValues {
    columnName:  string;
    order:       number;
    label:       string;
    description: string;
    type:        string;
    options:     IOptionsCheck | null;
    default:     boolean | string;
    visibility:  IOptionsVisibility;
    required:    IOptionsRequired;
}

export enum SteperType {
    Text = 'text',
    TextArea = 'textarea',
    Check = 'check',
    Calendar = 'calendar',
    Email = 'email',
    Numbers = 'numbers',
    Phone = 'phone',
    SelectFilter = 'selectFilter',
    TextLong = 'textLong',
    TextShort = 'textShort',
    Address = 'address',
    Select = 'select',
    Relationship = 'relationship'
  }

export interface IOptionsCheck {
    valueTrue:  string;
    valueFalse: string;
}

export interface IOptionsRequired {
    isDepend: boolean;
    rules:    null;
    required: boolean;
}

export interface IOptionsVisibility {
    isDepent: boolean;
    rules:    Array<IOptionsRule[]> | null;
    isShow:   boolean;
}

export interface IOptionsRule {
    columnDepend: string;
    rule:         string;
    value:        string;
}
