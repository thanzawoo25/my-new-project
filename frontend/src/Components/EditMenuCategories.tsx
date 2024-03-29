import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import {
  getAccessToken,
  getLocationByMenuCategoryId,
  getMenusByMenuCategoryIds,
  getSelectedLocationId,
} from "../Utils";
import { Menu } from "../typings/types";
import Autocomplete from "./Autocomplete";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";
import MenusCard from "./MenusCard";

const EditMenuCategories = () => {
  const {
    menuCategories,
    menus,
    locations,
    menusMenuCategoriesLocations,
    fetchData,
  } = useContext(AppContext);
  //console.log("menuCategories", menuCategories);

  const params = useParams();
  //console.log("params", params);
  const [open, setOpen] = useState(false);
  const [openDeleteMenuCategoryDialog, setOpenDeleteMenuCategoryDialog] =
    useState(false);
  const menuCategoryId = params.id as string;
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);
  const navigate = useNavigate();

  //console.log("menuCategoryId", menuCategoryId);
  const accessToken = getAccessToken();
  const selectedLocationId = getSelectedLocationId() as string;
  if (!menuCategoryId) return null; // null / react fregment
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );
  if (!menuCategory)
    return (
      <Layout title="Edit Menu Categories">
        <Box sx={{ p: 5 }}>
          <Typography variant="h3">Menu Categories not found</Typography>
        </Box>
      </Layout>
    );

  const validMenus = getMenusByMenuCategoryIds(
    menus,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
  //console.log("validMenus", validMenus);
  const validMenuIds = validMenus.map((item) => item.id) as number[];

  const validLocations = getLocationByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
  const validLocationIds = validLocations.map((item) => item.id);
  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedValidLocations = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedMenus = menus
    .map((item) => ({
      id: item.id as number,
      name: `${item.name}-${item.id}`,
    }))
    .filter((item) => !validMenuIds.includes(item.id));

  const updateMenuCategory = async () => {
    console.log("newMenuCategory", newMenuCategory);
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    accessToken && fetchData();
    navigate("/menu-categories  ");
  };

  const handleRemovedMenusFromMenuCategories = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/removedMenu`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuId: selectedMenu?.id,
        menuCategoryId,
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData();
  };

  const handleDeleteMenuCategories = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/${menuCategoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData();
    navigate("/menu-categories");
  };

  const handleAddedMenuToMenuCategories = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/addedMenu`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuCategoryId,
        menuId: selectedMenuIds,
        locationId: validLocationIds,
      }),
    });
    accessToken && fetchData();
  };

  return (
    <Layout title="Edit Menu Categories">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteMenuCategoryDialog(true)}
          >
            Delete
          </Button>
        </Box>
        <Box
          sx={{
            width: 700,
          }}
        >
          <TextField
            defaultValue={menuCategory.name}
            onChange={(evt) =>
              setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
            }
          />
          <Autocomplete
            options={mappedLocations}
            defaultValue={mappedValidLocations}
            label="Locations"
            placeholder="Locations"
            onChange={(option) =>
              setNewMenuCategory({
                ...newMenuCategory,
                locationIds: option.map((item) => item.id),
              })
            }
          />
          <Button
            variant="contained"
            onClick={updateMenuCategory}
            sx={{ mt: 3 }}
          >
            Update
          </Button>
          <Box>
            <h1>Menus</h1>
            <Autocomplete
              options={mappedMenus}
              label="Menus"
              placeholder="Menus"
              onChange={(option) =>
                setSelectedMenuIds(option.map((item) => item.id))
              }
            />
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleAddedMenuToMenuCategories}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ mt: 4, display: "flex" }}>
            {validMenus.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    mt: 3,
                    mr: 3,
                    mb: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <MenusCard menu={item} />
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ mt: 2, width: "fit-content" }}
                    onClick={() => {
                      setOpen(true);
                      setSelectedMenu(item);
                    }}
                  >
                    Removed
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        title={"Are you sure you want to remove this menu from menuCategories?"}
        open={open}
        setOpen={setOpen}
        callback={handleRemovedMenusFromMenuCategories}
      />
      <DeleteDialog
        title={"Are you sure you want to remove this menuCategories?"}
        open={openDeleteMenuCategoryDialog}
        setOpen={setOpenDeleteMenuCategoryDialog}
        callback={handleDeleteMenuCategories}
      />
    </Layout>
  );
};
export default EditMenuCategories;
