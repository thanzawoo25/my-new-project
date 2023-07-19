import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { getAccessToken, getLocationByMenuCategoryId } from "../Utils";
import Autocomplete from "./Autocomplete";
import { config } from "../Config/config";

const EditMenuCategories = () => {
  const { menuCategories, locations, menusMenuCategoriesLocations } =
    useContext(AppContext);
  console.log("menuCategories", menuCategories);

  const params = useParams();
  console.log("params", params);
  const menuCategoryId = params.id as string;
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });
  if (!menuCategoryId) return null; // null / react fregment
  console.log("menuCategoryId", menuCategoryId);
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

  const validLocations = getLocationByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
  console.log("locations", locations);
  console.log("validLocation", validLocations);

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedValidLocation = validLocations
    .map((item) => ({
      id: item.id as number,
      name: item.name,
    }))
    .filter((item) => {
      const validLocationIds = mappedLocations.map((item) => item.id as number);
      return !validLocationIds.includes(item.id);
    });

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
          defaultValue={mappedValidLocation}
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
      </Box>
    </Layout>
  );
};
export default EditMenuCategories;
