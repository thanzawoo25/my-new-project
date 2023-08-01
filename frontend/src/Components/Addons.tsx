import { Box, Paper, Typography } from "@mui/material";
import Layout from "./Layout";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import {
  getAddonCategoriesByLocationId,
  getAddonsByLocationIds,
} from "../Utils";
import { Link } from "react-router-dom";

const Addons = () => {
  const {
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );
  const validAddons = getAddonsByLocationIds(addons, validAddonCategories);

  return (
    <Layout title="Addons">
      <Box sx={{ pl: 3, pt: 5, display: "flex" }}>
        {validAddons
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            return (
              <Link
                key={item.id}
                to={`/addons/${item.id}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    height: 170,
                    width: 170,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mr: 3,
                    mb: 3,
                    pb: 3,
                    pl: 3,
                  }}
                >
                  <Typography sx={{ color: "black", fontWeight: 700 }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ color: "black", fontsize: 15 }}>
                    {item.price}
                  </Typography>
                </Paper>
              </Link>
            );
          })}
      </Box>
    </Layout>
  );
};
export default Addons;
