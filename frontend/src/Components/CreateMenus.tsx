import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import {
  getAccessToken,
  getMenuCategoriesByLocationIds,
  getSelectedLocationId,
} from "../Utils";
import Autocomplete from "./Autocomplete";
import FileDropzone from "./FileDropzone";
//console.log(config);

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateMenus = ({ open, setOpen }: Props) => {
  const { menuCategories, menusMenuCategoriesLocations, fetchData } =
    useContext(AppContext);
  const selectedLocationId = getSelectedLocationId() as string;
  const accessToken = getAccessToken();

  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
    locationId: selectedLocationId,
    menuCategoryIds: [] as number[],
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const onFileSelected = (selectedFiles: File[]) => {
    console.log("hello", selectedFiles);
    setSelectedFiles(selectedFiles);
  };

  const createNewMenus = async () => {
    console.log("Create new menu", newMenu);
    const isValid =
      newMenu.name && newMenu.description && newMenu.menuCategoryIds.length;

    if (!isValid)
      return alert("Name, description and menu categories required..");
    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      newMenu.assetUrl = responseData.assetUrl;
    }
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    accessToken && fetchData();
    setOpen(false);
  };

  const validMenuCategory = getMenuCategoriesByLocationIds(
    menuCategories,
    menusMenuCategoriesLocations
  );

  const mappedMenuCategories = validMenuCategory.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  return (
    <Dialog open={open} onClose={() => setOpen(false)} sx={{ mb: 3 }}>
      <DialogTitle
        variant="h4"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Creat New Menu
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
              setNewMenu({ ...newMenu, name: event.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            sx={{ mb: 2 }}
            placeholder="description"
            onChange={(event) =>
              setNewMenu({ ...newMenu, description: event.target.value })
            }
          />
          <TextField
            sx={{ mb: 2 }}
            type="number"
            placeholder="price"
            onChange={(event) =>
              setNewMenu({ ...newMenu, price: Number(event.target.value) })
            }
          />

          <Box sx={{ mb: 4 }}>
            <Autocomplete
              options={mappedMenuCategories}
              label="Menu Categories"
              placeholder="Menu Categories"
              onChange={(option) =>
                setNewMenu({
                  ...newMenu,
                  menuCategoryIds: option.map((item) => item.id),
                })
              }
            />
          </Box>
          <Box>
            <FileDropzone onFileSelected={onFileSelected} />
            <Box sx={{ mt: 2 }}>
              {selectedFiles.map((file) => {
                return (
                  <Chip
                    sx={{ mb: 2 }}
                    key={file.name}
                    label={file.name}
                    onDelete={() => {
                      const filteredSelectFiles = selectedFiles.filter(
                        (selectedFile) => selectedFile.name !== file.name
                      );
                      setSelectedFiles(filteredSelectFiles);
                    }}
                  />
                );
              })}
            </Box>
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
          <Button variant="contained" onClick={createNewMenus}>
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default CreateMenus;
