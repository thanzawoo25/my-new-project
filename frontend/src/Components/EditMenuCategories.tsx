import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import {
  getAccessToken,
  getLocationByMenuCategoryId,
  getMenusByMenuCategoryIds,
} from "../Utils";
import Autocomplete from "./Autocomplete";
import { config } from "../Config/config";
import MenusCard from "./MenusCard";

const EditMenuCategories = () => {
  const { menuCategories, menus, locations, menusMenuCategoriesLocations } =
    useContext(AppContext);
  //console.log("menuCategories", menuCategories);

  const params = useParams();
  //console.log("params", params);
  const [open, setOpen] = useState(false);
  const menuCategoryId = params.id as string;
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });
  if (!menuCategoryId) return null; // null / react fregment
  //console.log("menuCategoryId", menuCategoryId);
  const accessToken = getAccessToken();

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
  console.log("validMenus", validMenus);

  const validLocations = getLocationByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
  //console.log("locations", locations);
  //console.log("validLocation", validLocations);

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedValidLocations = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

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
  };

  return (
    <Layout title="Edit Menu Categories">
      <Box
        sx={{
          p: 5,
          width: 500,
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
        <Button variant="contained" onClick={updateMenuCategory} sx={{ mt: 3 }}>
          Update
        </Button>
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
                }}
              >
                <MenusCard menu={item} />
                <Button
                  color="error"
                  variant="contained"
                  sx={{ mt: 2, width: "fit-content" }}
                  onClick={() => setOpen(true)}
                >
                  Removed
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};
export default EditMenuCategories;
