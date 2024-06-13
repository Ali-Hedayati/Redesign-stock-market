import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { data, type Indicatior } from "./SelectedIndicatorsData";

import { Typography, Box, Button } from "@mui/material";
const SelectedIndicators = () => {
  const [toggle, setToggle] = useState(false);

  const editedData = data.map((item) => {
    if (item.value / 1000000000 > 1)
      return { ...item, value: item.value / 1000000000 + "B" };
    else if (item.value / 1000000 > 1)
      return { ...item, value: item.value / 1000000 + "M" };
    else if (item.value / 1000 > 1)
      return { ...item, value: item.value / 1000 + "K" };
    else return item;
  });

  console.log("Data", editedData);
  console.log("data", data);

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
    data,
    enableColumnOrdering: true,
  });

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
