import Link from "next/link";
import { Transition, TransitionChild } from "@headlessui/react";
import { getProductos } from "@/lib/productos";
import { getTienda } from "@/lib/tiendas";
import { ProductoCard } from "@/components/ui/Cards";
import PageSubtitle from "@/components/ui/PageSubtitle";
import TextLink from "@/components/ui/TextLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tienda = await getTienda(id);

  return {
    title: tienda.nombre,
  };
}

const ColoredSpacer = ({ color }: { color: string }) => (
  <div
    className="flex-1 h-[10px]"
    style={{
      background: `#${color}`,
    }}
  />
);

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;
  const fechaConsulta = (await searchParams)!.fecha!;
  const tienda = await getTienda(id);
  const productos = await getProductos();

  return (
    <>
      <Transition appear show={true}>
        <div className="flex gap-4 items-center flex-col">
          <div className="w-full flex items-center gap-5">
            <ColoredSpacer color={tienda.color_hex} />
            <PageSubtitle>{tienda.nombre}</PageSubtitle>
            <ColoredSpacer color={tienda.color_hex} />
          </div>
          <div
            className="w-full px-6 grid gap-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
            style={{
              borderLeft: `7px solid #${tienda.color_hex}`,
              borderRight: `7px solid #${tienda.color_hex}`,
            }}
          >
            {productos.map((producto: any, i: number) => (
              <TransitionChild key={i}>
                <ProductoCard
                  producto={producto}
                  tiendaID={tienda.id}
                  fechaConsulta={fechaConsulta}
                />
              </TransitionChild>
            ))}
          </div>
          <div className="w-full flex mt-2">
            <ColoredSpacer color={tienda.color_hex} />
          </div>
          <Link href="/tiendas">
            <TextLink backward>Volver a la lista de tiendas</TextLink>
          </Link>
        </div>
      </Transition>
    </>
  );
}
