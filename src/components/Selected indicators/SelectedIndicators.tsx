import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { type Indicatior } from "./SelectedIndicatorsData";
import useFetchData from "./SelectedIndicatorsData";

import { Typography, Box, Button, CircularProgress } from "@mui/material";
const SelectedIndicators = () => {
  const [toggle, setToggle] = useState(false);
  const { data, loading } = useFetchData();
  const editedData = useMemo(
    () =>
      data.map((item) => {
        const value =
          typeof item.value === "number" ? item.value : parseFloat(item.value);
        let valueFormatted = value.toString();

        if (value / 1000000000 > 1) {
          valueFormatted = (value / 1000000000).toFixed(2) + "B";
        } else if (value / 1000000 > 1) {
          valueFormatted = (value / 1000000).toFixed(2) + "M";
        } else if (value / 1000 > 1) {
          valueFormatted = (value / 1000).toFixed(2) + "K";
        }
        return { ...item, value: valueFormatted };
      }),
    [data]
  );

  const columns = useMemo<MRT_ColumnDef<Indicatior>[]>(
    () => [
      {
        accessorKey: "name",
        header: "شاخص",
      },
      {
        accessorKey: "value",
        header: "مقدار",
      },
      //column definitions...
      {
        accessorKey: "hour",
        header: "ساعت",
      },
      {
        accessorKey: "change",
        header: "تغییر",
        Cell: ({ cell }) => (
          <span
            style={{ color: cell.getValue<number>() < 0 ? "red" : "green" }}
          >
            {cell.getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "theMost",
        header: "بیشترین",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: editedData,
    enableColumnOrdering: true,
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box display="flex" gap="20px">
        <Button
          variant="contained"
          size="small"
          onClick={() => setToggle(!toggle)}
        >
          {!toggle ? "Hide" : "Show"}
        </Button>
        <Typography variant="h4">شاخص‌های منتخب</Typography>
      </Box>
      <Box display={toggle ? "none" : "block"}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
};

export default SelectedIndicators;
