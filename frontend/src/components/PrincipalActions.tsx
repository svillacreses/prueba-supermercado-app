"use client";

import useSWR from "swr";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";
import CustomButton from "./ui/CustomButton";
import CustomDatePicker from "./ui/CustomDatePicker";
import {
  fetchPromociones,
  formatISODate,
  muiTheme,
  postToBackend,
} from "@/utils";
import CustomTextField from "./ui/CustomTextField";

const PrincipalActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultDate = dayjs();
  const [fechaConsulta, setFechaConsulta] = useState(defaultDate);
  const [fechaIncio, setFechaInicio] = useState(defaultDate);
  const [fechaFin, setFechaFin] = useState(defaultDate);
  const [nombrePromo, setNombrePromo] = useState("");
  const [descuentoPromo, setDescuentoPromo] = useState(0);
  const [isLoadingPromo, setIsLoadingPromo] = useState(false);
  const [openPromoDialog, setOpenPromoDialog] = useState(false);
  const urlPromociones = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/promociones`;

  const { data: promociones, isLoading: isLoading } = useSWR(
    urlPromociones,
    fetchPromociones,
    {
      shouldRetryOnError: false,
    }
  );

  const handleCloseDialogs = (
    _?: any,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason) {
      return;
    }
    setOpenPromoDialog(false);
  };

  const pushDate = (date: dayjs.Dayjs) => {
    const formattedDate = formatISODate(date);
    router.push(pathname + "?fecha=" + formattedDate);
  };

  useEffect(() => {
    const fecha = searchParams.get("fecha") || "";
    const date = dayjs(fecha);
    if (!date.isValid()) {
      // If the date is invalid, set to default
      setFechaConsulta(defaultDate);
      pushDate(defaultDate);
    } else {
      setFechaConsulta(date);
    }
  }, [searchParams]);

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="w-[80%] max-w-[300px]">
        <CustomDatePicker
          className="mt-2"
          value={fechaConsulta}
          onChange={(newValue) => {
            if (newValue) {
              setFechaConsulta(newValue);
            }
          }}
          onAccept={(newValue) => {
            if (newValue) {
              pushDate(newValue);
            }
          }}
        />
      </div>
      <CustomButton
        className="mt-2"
        loading={isLoadingPromo || isLoading}
        onClick={() => {
          // Actualizamos las fechas
          setFechaInicio(fechaConsulta);
          setFechaFin(fechaConsulta.add(7, "day"));
          setOpenPromoDialog(true);
        }}
      >
        Crear Promoción +
      </CustomButton>
      <Dialog
        open={openPromoDialog}
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
                nombre: nombrePromo,
                descuento: descuentoPromo,
                inicio: formatISODate(fechaIncio),
                fin: formatISODate(fechaFin),
              };
              try {
                const res = await postToBackend(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/promociones`,
                  payload
                );
                toast.success(res.message);
              } catch (error: any) {
                toast.error(error?.message || "Error al agregar la promoción");
              } finally {
                setIsLoadingPromo(false);
              }
            },
          },
        }}
      >
        <DialogTitle>Crear Promoción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Recuerda que la promoción NO se asignará a ningún producto ni
            tienda, para eso después deberás asociarla.
          </DialogContentText>
          <div className="flex flex-col gap-2 mt-3">
            <CustomTextField
              required
              label="Nombre de la Promoción"
              value={nombrePromo}
              onChange={(evt) => {
                setNombrePromo(evt.target.value);
              }}
            />
            <CustomTextField
              required
              label="Descuento a Aplicar"
              type="number"
              value={descuentoPromo}
              onChange={(evt) => {
                setDescuentoPromo(Number(evt.target.value));
              }}
            />
            <CustomDatePicker
              className="my-3"
              label="Fecha Inicio"
              value={fechaIncio}
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
    </ThemeProvider>
  );
};

export default PrincipalActions;
