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
    type:        ESteperType;
    options:     IOptionsCheck | null;
    default:     boolean | string;
    visibility:  IOptionsVisibility;
    required:    IOptionsRequired;
}

export enum ESteperType {
    Address = 'address',
    Calendar = 'calendar',
    Check = 'check',
    Email = 'email',
    Filter = 'filter',
    Numbers = 'numbers',
    Phone = 'phone',
    Relationship = 'relationship',
    Select = 'select',
    SelectFilter = 'selectFilter',
    Text = 'text',
    TextArea = 'textarea',
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