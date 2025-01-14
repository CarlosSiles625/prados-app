/* eslint-disable @next/next/no-img-element */

export function Profile({ image }: { image: string | null }) {
  if (!image) return <p>Sin Imagen</p>;
  return (
    <img
      src={`/interns/${image}`}
      alt="Inter Profile Image"
      width={150}
      height={150}
      className="aspect-w-1 aspect-h-1"
    />
  );
}
