import CustomCard from "./CustomCard";
import CustomImage from "../CustomImage";
import Producto from "@/models/Producto";
import ProductPrice from "./ProductPrice";

interface ProductoCardProps {
  producto: Producto;
  tiendaID: number;
  fechaConsulta: string;
}

const ProductoCard = ({
  producto,
  tiendaID,
  fechaConsulta,
}: ProductoCardProps) => {
  return (
    <CustomCard title={producto.nombre}>
      <div className="w-full h-[100px] relative mb-5 rounded-xl overflow-hidden">
        <CustomImage
          src={producto.url_imagen}
          alt={producto.nombre}
          maxHeight="100px"
        />
      </div>
      <ProductPrice
        productoID={producto.id}
        tiendaID={tiendaID}
        fechaConsulta={fechaConsulta}
      />
    </CustomCard>
  );
};

export default ProductoCard;
