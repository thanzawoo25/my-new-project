import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import Layout from "./Layout";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { getMenusByLocationId } from "../Utils";
import AddIcon from "@mui/icons-material/Add";
import NewMenu from "./NewMenu";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useContext(AppContext);
  console.log("MENU...", menus);

  const isValidMenus = getMenusByLocationId(
    menus,
    menusMenuCategoriesLocations
  );

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Layout title="Menus">
        <Box sx={{ mt: 4, ml: 3 }}>
          <Box
            sx={{ mx: 3, display: "flex", justifyContent: "flex-end", mb: 4 }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Create new menu
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {isValidMenus.map((menu) => {
              return (
                <Card key={menu.id} sx={{ maxWidth: 345, mr: 2, mb: 3 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={menu.asset_url}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {menu.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {menu.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {menu.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        </Box>
        <Box>
          <NewMenu open={open} setOpen={setOpen} />
        </Box>
      </Layout>
    </Box>
  );
};
export default Menus;
