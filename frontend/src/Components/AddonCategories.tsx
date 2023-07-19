import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Layout from "./Layout";
import Autocomplete from "./AutocompleteCustom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import {
  getAddonCategoriesByLocationId,
  getMenuCategoriesByLocationIds,
  getSelectedLocationId,
} from "../Utils";

const AddonCategories = () => {
  const {
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Addon Categories">
      <Box sx={{ pl: 3, pt: 5, display: "flex" }}>
        {validAddonCategories.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                height: 150,
                width: 100,
                border: "2px solid lightgrey",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 3,
              }}
            >
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};
export default AddonCategories;
