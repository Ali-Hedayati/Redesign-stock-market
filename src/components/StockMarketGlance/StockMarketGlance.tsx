import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { data, type Indicatior } from "./StockMarketGlanceData";

import { Box, Button, Typography } from "@mui/material";
const StockMarketGlance = () => {
  const [toggle, setToggle] = useState(false);
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
        <Typography variant="h4">بازار نقدی بورس در یک نگاه</Typography>
      </Box>

      <Box display={toggle ? "none" : "block"}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
};

export default StockMarketGlance;
