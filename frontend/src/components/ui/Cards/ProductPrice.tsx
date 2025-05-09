"use client";

import useSWR from "swr";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import Promocion from "@/models/Promocion";
import {
  currencyFormat,
  fetchPrecioFinal,
  fetchPromociones,
  formatISODate,
  muiTheme,
  postToBackend,
} from "@/utils";
import CustomLoading from "../CustomLoading";
import CustomButton from "../CustomButton";
import CustomDatePicker from "../CustomDatePicker";
import CustomTextField from "../CustomTextField";

interface ProductPriceProps {
  productoID: number;
  tiendaID: number;
  fechaConsulta: string;
}

const ProductActions = (
  props: ProductPriceProps & {
    refreshPrice: () => void;
    refreshPromos: () => void;
    promociones: Promocion[];
  }
) => {
  const {
    productoID,
    tiendaID,
    fechaConsulta,
    promociones,
    refreshPrice,
    refreshPromos,
  } = props;
  const defaultDate = dayjs(fechaConsulta);
  const [precio, setPrecio] = useState(0);
  const [fechaInicio, setFechaInicio] = useState(defaultDate);
  const [fechaFin, setFechaFin] = useState(defaultDate.add(7, "day"));
  const [isLoadingPrecio, setIsLoadingPrecio] = useState(false);
  const [isLoadingPromo, setIsLoadingPromo] = useState(false);
  const [openAgregarPrecioDialog, setOpenAgregarPrecioDialog] = useState(false);
  const [openAgregarPromoDialog, setOpenAgregarPromoDialog] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Promocion>(promociones[0]);

  const handleCloseDialogs = (
    _?: any,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason) {
      return;
    }
    setOpenAgregarPrecioDialog(false);
    setOpenAgregarPromoDialog(false);
  };

  const handleChangePromo = (event: any) => {
    const promo = promociones.find((promo) => promo.id === event.target.value);
    setSelectedPromo(promo!);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="w-full mt-3 grid gap-2 sm:grid-cols-2">
        <CustomButton
          dense
          loading={isLoadingPrecio}
          onClick={() => setOpenAgregarPrecioDialog(true)}
        >
          + Precio
        </CustomButton>
        <CustomButton
          dense
          disabled={promociones.length === 0}
          loading={isLoadingPromo}
          variant="secondary"
          onClick={async () => {
            refreshPromos();
            setOpenAgregarPromoDialog(true);
          }}
        >
          + Promo
        </CustomButton>
      </div>
      <Dialog
        open={openAgregarPrecioDialog}
        onClose={handleCloseDialogs}
        disableEscapeKeyDown
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleCloseDialogs();
              setIsLoadingPrecio(true);
              const payload = {
                producto_id: productoID,
                tienda_id: tiendaID,
                precio,
                inicio: formatISODate(fechaInicio),
                fin: formatISODate(fechaFin),
              };
              try {
                const nuevoPrecio = await postToBackend(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/precios`,
                  payload
                );
                toast.success(nuevoPrecio.message);
                refreshPrice();
              } catch (error: any) {
                toast.error(error?.message || "Error al agregar el precio");
              } finally {
                setIsLoadingPrecio(false);
              }
            },
          },
        }}
      >
        <DialogTitle>Agregar Precio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, escoge el precio y el rango de fechas para su vigencia.
          </DialogContentText>
          <div className="flex flex-col gap-5 mt-3">
            <CustomTextField
              required
              label="Nuevo Precio"
              type="number"
              value={precio}
              onChange={(evt) => {
                setPrecio(Number(evt.target.value));
              }}
            />
            <CustomDatePicker
              label="Fecha Inicio"
              value={fechaInicio}
              onChange={(newValue) => {
                if (newValue) {
                  setFechaInicio(newValue);
                }
              }}
            />
            <CustomDatePicker
              label="Fecha Fin"
              value={fechaFin}
              onChange={(newValue) => {
                if (newValue) {
                  setFechaFin(newValue);
                }
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancelar</Button>
          <Button type="submit">Aceptar</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAgregarPromoDialog}
        onClose={handleCloseDialogs}
        disableEscapeKeyDown
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleCloseDialogs();
              setIsLoadingPromo(true);
              const payload = {
                promocion_id: selectedPromo.id,
                tiendas: [tiendaID],
                productos: [productoID],
              };
              try {
                const res = await postToBackend(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/asociar-promocion`,
                  payload
                );
                toast.success(res.message);
                refreshPrice();
              } catch (error: any) {
                toast.error(error?.message || "Error al asociar la promoción");
              } finally {
                setIsLoadingPromo(false);
              }
            },
          },
        }}
      >
        <DialogTitle>Asociar Promoción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, escoge la promoción que deseas asociar a este producto en
            esta tienda.
          </DialogContentText>
          <div className="flex flex-col gap-5 mt-3">
            <FormControl fullWidth>
              <InputLabel>Promoción</InputLabel>
              <Select
                label="Promoción"
                value={selectedPromo.id}
                onChange={handleChangePromo}
              >
                {promociones.map((promo) => (
                  <MenuItem key={promo.id} value={promo.id}>
                    {promo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancelar</Button>
          <Button type="submit">Aceptar</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

const ProductPrice = (props: ProductPriceProps) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const totalHeight = isMobile ? "h-[150px]" : "h-[100px]";
  const { productoID, tiendaID, fechaConsulta } = props;
  const urlPrecioFinal = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/precio-final?producto_id=${productoID}&tienda_id=${tiendaID}&fecha=${fechaConsulta}`;
  const urlPromociones = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/promociones`;

  const {
    data,
    error,
    isLoading,
    mutate: refreshPrice,
  } = useSWR(urlPrecioFinal, fetchPrecioFinal, {
    shouldRetryOnError: false,
  });

  const {
    data: promociones,
    isLoading: isLoadingPromociones,
    mutate: refreshPromos,
  } = useSWR(urlPromociones, fetchPromociones, {
    shouldRetryOnError: false,
  });

  if (isLoading || isLoadingPromociones)
    return (
      <div className={`flex items-center ${totalHeight}`}>
        <CustomLoading />
      </div>
    );

  if (error) {
    // Si no hay precio
    return (
      <div
        className={`w-full flex flex-col items-center justify-center ${totalHeight}`}
      >
        <p
          className="text-xl font-bold text-stone-500 font-[family-name:var(--font-geist-mono)]"
          style={{ letterSpacing: "0.3em" }}
        >
          N/A
        </p>
        <ProductActions
          promociones={promociones}
          refreshPrice={refreshPrice}
          refreshPromos={refreshPromos}
          {...props}
        />
      </div>
    );
  }

  const {
    tieneDescuento,
    precio_actual,
    precio_final,
    descuento: { nombre, porcentaje },
  } = data!;

  return (
    <div
      className={`w-full flex flex-col gap-1 items-center justify-center ${totalHeight}`}
    >
      <div className="flex gap-2 items-center font-[family-name:var(--font-geist-mono)]">
        {tieneDescuento && (
          <p className="text-md font-bold text-stone-600 line-through">
            {currencyFormat(precio_actual)}
          </p>
        )}
        <p className="text-xl font-bold text-stone-300">
          {currencyFormat(precio_final)}
        </p>
      </div>
      {tieneDescuento && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{`Descuento del ${porcentaje}%`}</span>
          {"→"}
          <span className="text-xs text-gray-500">{nombre}</span>
        </div>
      )}
      <ProductActions
        promociones={promociones}
        refreshPrice={refreshPrice}
        refreshPromos={refreshPromos}
        {...props}
      />
    </div>
  );
};

export default ProductPrice;
