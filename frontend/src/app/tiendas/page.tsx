import Link from "next/link";
import { Transition, TransitionChild } from "@headlessui/react";
import { getTiendas } from "@/lib/tiendas";
import { TiendaCard } from "@/components/ui/Cards";
import PageSubtitle from "@/components/ui/PageSubtitle";
import TextLink from "@/components/ui/TextLink";

export default async function Page() {
  const tiendas = await getTiendas();

  return (
    <>
      <Transition appear show={true}>
        <div className="flex gap-4 items-center flex-col">
          <PageSubtitle>Listado de Tiendas</PageSubtitle>
          <div className="w-full grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
            {tiendas.map((tienda: any, i: number) => (
              <TransitionChild key={i}>
                <TiendaCard tienda={tienda} />
              </TransitionChild>
            ))}
          </div>
          <Link href="/">
            <TextLink backward>Volver a la página principal</TextLink>
          </Link>
        </div>
      </Transition>
    </>
  );
}
