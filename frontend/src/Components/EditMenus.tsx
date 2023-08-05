import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { getAccessToken, getAddonCategoriesByMenuId } from "../Utils";
import { Menu } from "../typings/types";
import Autocomplete from "./Autocomplete";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditMenus = () => {
  const { menus, addonCategories, menusAddonCategories, fetchData } =
    useContext(AppContext);
  const params = useParams();
  const menuId = params.id as string;
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<Menu>();
  const [addonCategoryIds, setAddonCategoryIds] = useState<number[]>();

  const validAddonCategories = getAddonCategoriesByMenuId(
    addonCategories,
    menusAddonCategories,
    menuId
  );

  useEffect(() => {
    if (menus.length) {
      const validMenu = menus.find((item) => item.id === Number(menuId));
      setMenu(validMenu);
    }
  }, [menus]);
  useEffect(() => {
    if (addonCategoryIds?.length) {
      setAddonCategoryIds(validAddonCategoriesId);
    }
  }, [addonCategories]);
  console.log("addonCategoriesIds", addonCategoryIds);

  if (!menu)
    return (
      <Layout title="Edit Menus">
        <Box sx={{ p: 5 }}>
          <Typography>Menus not found.</Typography>
        </Box>
      </Layout>
    );

  const mappedValidAddonCategories = validAddonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  const validAddonCategoriesId = mappedValidAddonCategories.map(
    (item) => item.id
  );

  const mappedAddonCategories = addonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const updateMenu = async () => {
    const payload = { ...menu, addonCategoryIds };
    await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  const handleDeleteMenu = async () => {
    await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    navigate("/menus");
  };

  if (!menus) return null; // null / react fregment

  return (
    <Layout title="Edit Menus">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box
          sx={{
            width: 500,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              defaultValue={menu?.name}
              sx={{ mb: 2 }}
              onChange={(event) =>
                setMenu({ ...menu, name: event.target.value })
              }
            />
            <TextField
              type="number"
              defaultValue={menu?.price}
              onChange={(event) =>
                setMenu({ ...menu, price: Number(event.target.value) })
              }
            />
          </Box>
          <Box>
            <Autocomplete
              options={mappedAddonCategories}
              defaultValue={mappedValidAddonCategories}
              label="Addon Categories"
              placeholder="Addon Categories"
              onChange={(option) =>
                setAddonCategoryIds(option.map((item) => item.id))
              }
            />
          </Box>
          <Button
            variant="contained"
            onClick={updateMenu}
            sx={{ mt: 3, width: "fit-content" }}
          >
            Update
          </Button>
        </Box>
      </Box>

      <DeleteDialog
        title={"Are you sure you want to remove this menus?"}
        open={open}
        setOpen={setOpen}
        callback={handleDeleteMenu}
      />
    </Layout>
  );
};
export default EditMenus;
