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

export type InternsType = {
  id: string;
  interned_at: string;
  name: string;
  cedula: string;
  birthdate: string;
  born_place: BornPlace;
  user: {
    name: string;
  };
  status: "Activo" | "Alta" | "Baja";
};

export interface InternForExport {
  id?: string;
  created_at?: string;
  name: string;
  birthdate: string;
  born_place: {
    ciudad: string;
    departamento: string;
  };
  isRural: boolean;
  cedula: string;
  phone: string;
  references: Array<{
    name: string;
    phone: string;
    relationship: string;
  }>;
  marital_status: string;
  direction: {
    city: string;
    zone: string;
    street: string;
  };
  adiccions: Array<{
    name: string;
    consumption_time: string;
  }>;
  education: {
    primary: boolean;
    secondary: boolean;
    university: boolean;
  };
  profession: string;
  ocupation: string;
  talents: string[];
  guarantor_name: string | null;
  guarantor_phone: string | null;
  guarantor_address: string | null;
  guarantor_cedula: string | null;
  career: string | null;
  gender: string;
  interned_at: string;
  out_at: string | null;
  status: string;
  finished_program: boolean;
  out_properties: string | null;
  user?: {
    connect: {
      id: string;
    };
  };
}
