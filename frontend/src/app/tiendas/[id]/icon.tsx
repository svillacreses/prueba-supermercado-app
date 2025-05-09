import { getTienda } from "@/lib/tiendas";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default async function Icon({ params }: { params: { id: string } }) {
  const tienda = await getTienda(params.id);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          borderRadius: "10px",
          background: `#${tienda.color_hex}`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {params.id}
      </div>
    ),
    {
      ...size,
    }
  );
}
