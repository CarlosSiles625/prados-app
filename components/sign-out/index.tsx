import { Button } from "../ui/button";
import { signOut } from "./action";

export function SignOut() {
  return (
    <form action={signOut} className="w-full flex justify-center">
      <Button type="submit" variant="destructive">
        Cerrar sesión
      </Button>
    </form>
  );
}
