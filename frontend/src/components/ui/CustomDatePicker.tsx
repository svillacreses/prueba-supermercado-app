"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface CustomDatePickerProps {
  label?: string;
  className?: string;
  name?: string;
  value: dayjs.Dayjs;
  onChange: (newValue: dayjs.Dayjs | null) => void;
  onAccept?: (newValue: dayjs.Dayjs | null) => void;
}

export default function CustomDatePicker({
  label = "Fecha de Consulta",
  className,
  name,
  value,
  onChange,
  onAccept,
}: CustomDatePickerProps) {
  // Hydration fix for MUI
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return "";
  return (
    <div suppressHydrationWarning className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DateTimePicker
          showDaysOutsideCurrentMonth
          className="w-full"
          format="DD [/] MMMM [/] YYYY [|] HH:mm"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          onAccept={onAccept}
          slotProps={{
            actionBar: {
              actions: ["today", "cancel", "accept"],
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
