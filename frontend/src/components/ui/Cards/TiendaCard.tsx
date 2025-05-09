import Link from "next/link";
import CustomButton from "../CustomButton";
import CustomCard from "./CustomCard";
import Tienda from "@/models/Tienda";

interface TiendaCardProps {
  tienda: Tienda;
}

const TiendaCard = ({ tienda }: TiendaCardProps) => {
  return (
    <CustomCard borderColor={`#${tienda.color_hex}`}>
      <div
        className={`w-full font-[family-name:var(--font-geist-mono)] mb-4 py-2 rounded-xl text-center text-white font-bold`}
        style={{
          background: `#${tienda.color_hex}`,
          letterSpacing: "0.2em",
        }}
      >
        {tienda.nombre}
      </div>
      <Link href={`/tiendas/${tienda.id}`}>
        <CustomButton dense>Ver Productos</CustomButton>
      </Link>
    </CustomCard>
  );
};

export default TiendaCard;
