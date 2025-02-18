import Image from "next/image";

export function Profile({ image }: { image: string | null }) {
  if (!image) return <p>Sin Imagen</p>;
  return (
    <Image
      src={`${process.env.SITE_URL}/api/image?filename=${image}`}
      alt="Inter Profile Image"
      width={150}
      height={150}
      className="aspect-w-1 aspect-h-1"
    />
  );
}
