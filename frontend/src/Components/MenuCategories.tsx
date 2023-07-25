import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Layout from "./Layout";
import Autocomplete from "./AutocompleteCustom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { getMenuCategoriesByLocationIds } from "../Utils";
import { Link } from "react-router-dom";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);

  const validMenuCategories = getMenuCategoriesByLocationIds(
    menuCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ pl: 3, pt: 5, display: "flex" }}>
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
    </Layout>
  );
};
export default MenuCategories;
