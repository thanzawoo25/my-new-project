import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { getAccessToken } from "../Utils";
import Autocomplete from "./Autocomplete";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateAddonCategories = ({ open, setOpen }: Props) => {
  const { fetchData, menus } = useContext(AppContext);
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const createNewAddonCategories = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid) return alert("Name and menu are required.");

    await fetch(`${config.apiBaseUrl}/addon-categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    accessToken && fetchData();
    setOpen(false);
  };

  const mappedMenus = menus.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Create Addon categories
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            onChange={(event) =>
              setNewAddonCategory({
                ...newAddonCategory,
                name: event.target.value,
              })
            }
          />

          <Box>
            <Autocomplete
              options={mappedMenus}
              label={"Menus"}
              placeholder={"Menus"}
              onChange={(option) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  menuIds: option.map((item) => item.id),
                })
              }
            />
          </Box>
          <FormControlLabel
            sx={{ my: 2 }}
            control={
              <Switch
                checked={newAddonCategory.isRequired}
                onChange={(evt) =>
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: evt.target.checked,
                  })
                }
              />
            }
            label="required"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mr: 2, mb: 2 }}>
          <Button variant="contained" onClick={createNewAddonCategories}>
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAddonCategories;
