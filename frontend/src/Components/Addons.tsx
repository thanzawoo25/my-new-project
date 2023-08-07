import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import {
  getAddonCategoriesByLocationId,
  getAddonsByLocationIds,
} from "../Utils";
import CreateAddons from "./CreateAddons";
import Layout from "./Layout";

const Addons = () => {
  const {
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );
  const validAddons = getAddonsByLocationIds(addons, validAddonCategories);

  return (
    <Layout title="Addons">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new addons
          </Button>
        </Box>
        <Box sx={{ pl: 3, display: "flex" }}>
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
                      p: 5,
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
      </Box>
      <CreateAddons open={open} setOpen={setOpen} />
    </Layout>
  );
};
export default Addons;
