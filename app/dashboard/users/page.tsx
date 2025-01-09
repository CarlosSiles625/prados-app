import { CreateUser } from "./_components/create-user";
import { Users } from "./_components/users";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 container mx-auto p-2">
      <h1 className="font-semibold text-xl">Gestión de usuarios</h1>
      {/* Registro de ususario buton */}
      <div>
        <CreateUser />
      </div>
      {/* Lista de usuarios registrados */}
      <Users />
    </div>
  );
}
