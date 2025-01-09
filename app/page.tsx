import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/dashboard");
  return null;
  // return (
  //   <Protected>
  //     <section>
  //       <form
  //         action={async () => {
  //           "use server";
  //           await logout();
  //           redirect("/login");
  //         }}
  //       >
  //         <button type="submit">Logout</button>
  //       </form>
  //       <pre>{JSON.stringify(session, null, 2)}</pre>
  //     </section>
  //   </Protected>
  // );
}
