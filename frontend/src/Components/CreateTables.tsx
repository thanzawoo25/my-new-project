import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { getAccessToken, getSelectedLocationId } from "../Utils";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateTables = ({ open, setOpen }: Props) => {
  const { fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();
  const selectedLocationId = getSelectedLocationId();
  const [newTable, setNewTable] = useState("");

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
  return (
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
  );
};

export default CreateTables;
