import { Box, Button, Paper, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Layout from "./Layout";
import Autocomplete from "./AutocompleteCustom";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import {
  getAddonCategoriesByLocationId,
  getMenuCategoriesByLocationIds,
  getSelectedLocationId,
} from "../Utils";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateAddonCategorie from "./CreateAddonCategories";

const AddonCategories = () => {
  const {
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    addons,
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );
  const getAddonsCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return 0;
    return addons.filter((item) => item.addon_categories_id === addonCategoryId)
      .length;
  };

  return (
    <Layout title="Addon Categories">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new addon category
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validAddonCategories
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((addonCategory) => (
              <Link
                to={`/addon-categories/${addonCategory.id}`}
                key={addonCategory.id}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    height: 150,
                    width: 150,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    mr: 3,
                    pl: 2,
                    pb: 2,
                  }}
                >
                  <Typography sx={{ color: "#000000", fontWeight: 700, mr: 1 }}>
                    {addonCategory.name}
                  </Typography>
                  <Typography sx={{ color: "#000000", fontSize: 15 }}>
                    {getAddonsCount(addonCategory.id)} addons
                  </Typography>
                </Paper>
              </Link>
            ))}
        </Box>
      </Box>
      <CreateAddonCategorie open={open} setOpen={setOpen} />
    </Layout>
  );
};
export default AddonCategories;
