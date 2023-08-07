import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { getAccessToken } from "../Utils";
import Autocomplete from "./Autocomplete";
//console.log(config);

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateMenuCategories = ({ open, setOpen }: Props) => {
  const { locations, fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();

  const [newMenuCategories, setNewMenuCategories] = useState({
    name: "",
    locationIds: [] as number[],
  });

  const createNewMenuCategories = async () => {
    console.log("Create new menu", newMenuCategories);
    const isValid =
      newMenuCategories.name && newMenuCategories.locationIds.length;

    if (!isValid) return alert("Name and locations required..");

    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategories),
    });
    accessToken && fetchData();
    setOpen(false);
  };

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  return (
    <Dialog open={open} onClose={() => setOpen(false)} sx={{ mb: 3 }}>
      <DialogTitle
        variant="h4"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Creat New Menu Categories
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
          }}
        >
          <TextField
            placeholder="name"
            onChange={(event) =>
              setNewMenuCategories({
                ...newMenuCategories,
                name: event.target.value,
              })
            }
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 4 }}>
            <Autocomplete
              options={mappedLocations}
              label="Menu Categories"
              placeholder="Menu Categories"
              onChange={(option) =>
                setNewMenuCategories({
                  ...newMenuCategories,
                  locationIds: option.map((item) => item.id),
                })
              }
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            justifyContent: "flex-end",
            mx: 4,
          }}
        >
          <Button variant="contained" onClick={createNewMenuCategories}>
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default CreateMenuCategories;
