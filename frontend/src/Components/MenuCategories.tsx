import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { getMenuCategoriesByLocationIds } from "../Utils";
import CreateMenuCategories from "./CreateMenuCategories";
import Layout from "./Layout";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);

  const validMenuCategories = getMenuCategoriesByLocationIds(
    menuCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new menu categories
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validMenuCategories.map((item) => {
            return (
              <Link
                to={`${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    height: 150,
                    width: 100,
                    border: "2px solid lightgrey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 3,
                    borderRadius: 2,
                    borderBlock: "2px solid black",
                  }}
                >
                  <Typography>{item.name}</Typography>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
      <CreateMenuCategories open={open} setOpen={setOpen} />
    </Layout>
  );
};
export default MenuCategories;
