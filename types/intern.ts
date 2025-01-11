export interface Reference {
  name: string;
  phone: string;
  relationship: string;
}

export interface Direction {
  street: string;
  zone: string;
  city: string;
}

export interface Adicction {
  name: string;
  consumption_time: string;
}

export interface Education {
  primary: boolean;
  secondary: boolean;
  university: boolean;
}

export interface OutProperties {
  reason: string;
  observations: string;
}

export interface BornPlace {
  departamento: string;
  ciudad: string;
}
