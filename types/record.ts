interface User {
  id: string;
  created_at: Date;
  name: string;
  cedula: number;
  email: string | null;
  password: string;
  roleId: number;
}

export interface Historial {
  id: number;
  created_at: Date;
  user_id: string;
  intern_id: string;
  notes: string;
  user: User;
}
