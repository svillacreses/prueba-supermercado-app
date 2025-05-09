import Link from "next/link";
import PageSubtitle from "@/components/ui/PageSubtitle";
import CustomImage from "@/components/ui/CustomImage";
import CustomButton from "@/components/ui/CustomButton";

export default function Home() {
  return (
    <>
      <div className="flex gap-4 items-center flex-col">
        <div className="w-[80%] h-[20vh] md:h-[40vh] relative">
          <CustomImage
            priority
            objecFit="contain"
            maxHeight="20vh"
            alt="Diagrama ER"
            src="https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2FPrueba%20Supermercado%20BD.svg?alt=media&token=33aa232f-251f-4f44-82f5-923bcbe1dce5"
          />
        </div>
        <PageSubtitle>
          Prueba Técnica
          <br />
          Full-Stack Developer
        </PageSubtitle>
        <Link href={`/tiendas`}>
          <CustomButton>Ver Tiendas</CustomButton>
        </Link>
      </div>
    </>
  );
}
