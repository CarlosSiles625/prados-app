import { AddInterForm } from "../_components/add-intern-form";

export default function Page() {
  return (
    <div className="p-5 container mx-auto flex flex-col gap-2 justify-center items-center">
      <p className="text-center text-xl font-semibold">Registrar un Interno</p>
      <AddInterForm />
    </div>
  );
}
