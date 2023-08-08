import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { getAccessToken, getAddonCategoriesByLocationId } from "../Utils";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateAddons = ({ open, setOpen }: Props) => {
  const {
    fetchData,
    menusMenuCategoriesLocations,
    addonCategories,
    menusAddonCategories,
    locations,
  } = useContext(AppContext);
  const accessToken = getAccessToken();
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );

  const createNewAddons = async () => {
    const isValid = newAddon.name && newAddon.addonCategoryId;
    if (!isValid) return alert("Name and addon categories are required.");

    await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    accessToken && fetchData();
    setOpen(false);
  };
  console.log("createNewAddon", createNewAddons);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Create Addons
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
          <TextField
            sx={{ mb: 3 }}
            placeholder="name"
            onChange={(event) =>
              setNewAddon({
                ...newAddon,
                name: event.target.value,
              })
            }
          />

          <TextField
            placeholder="price"
            onChange={(event) =>
              setNewAddon({
                ...newAddon,
                price: Number(event.target.value),
              })
            }
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Addon Category</InputLabel>
            <Select
              label="Addon Category"
              value={newAddon.addonCategoryId}
              onChange={(evt) =>
                setNewAddon({
                  ...newAddon,
                  addonCategoryId: String(evt.target.value),
                })
              }
            >
              {validAddonCategories.map((item) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mr: 2, mb: 2 }}>
          <Button variant="contained" onClick={createNewAddons}>
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAddons;
