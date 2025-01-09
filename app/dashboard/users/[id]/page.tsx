export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; //next js 15
  return <div>Page: {id}</div>;
}
