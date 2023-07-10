import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useState, useContext } from "react";
import { getAccessToken, getSelectedLocationId } from "../Utils/general";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { table } from "console";

const Tables = () => {
  const { tables, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState("");
  const selectedLocationId = getSelectedLocationId();
  const accessToken = getAccessToken();
  const isValidTable = tables.filter(
    (item) => item.locations_id === Number(selectedLocationId)
  );
  console.log("isValidTables", isValidTable);

  const createNewTable = async () => {
    console.log(newTable);
    if (!newTable) return alert("Please put new table name");
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTable, locationId: selectedLocationId }),
    });
    fetchData();
    setOpen(false);
  };
  console.log("all tables", tables);
  return (
    <Layout title="Tables">
      <Box sx={{ px: 3, pt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            create new table
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 5,
          }}
        >
          {isValidTable.map((table) => {
            return (
              <Box
                key={table.name}
                sx={{
                  boxShadow: 4,
                  width: "10rem",
                  height: "6rem",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#101010" : "#fff",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  p: 2,
                  m: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                {table.name}
              </Box>
            );
          })}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
              Create new Table
            </DialogTitle>
            <DialogContent sx={{ width: 400 }}>
              <TextField
                placeholder="Table Name"
                sx={{ width: "100%" }}
                onChange={(event) => setNewTable(event.target.value)}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button variant="contained" onClick={createNewTable}>
                  Create
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Layout>
  );
};

export default Tables;
