import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "./Layout";
import { useState, useContext } from "react";
import { getAccessToken, getSelectedLocationId } from "../Utils";
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
  //console.log("isValidTables", isValidTable);

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
  //console.log("all tables", tables);
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
                  border: "2px solid lightgrey",
                  width: 100,
                  height: 150,
                  mr: 5,
                  mb: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {table.name}
              </Box>
              // <Paper
              //   elevation={2}
              //   sx={{
              //     width: 170,
              //     height: 170,
              //     mr: 4,
              //     mb: 5,
              //     display: "flex",
              //     flexDirection: "column",
              //     justifyContent: "flex-end",
              //     pl: 2,
              //     pb: 2,
              //   }}
              // >
              //   <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
              //     {table.name}
              //   </Typography>
              // </Paper>
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
