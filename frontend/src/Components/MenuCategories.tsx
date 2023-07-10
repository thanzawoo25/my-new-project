import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Layout from "./Layout";
import Autocomplete from "./Autocomplete";

const MenuCategories = () => {
  const textMenu = [
    { id: 59, name: "bane mote" },
    { id: 60, name: "a tote sone" },
    { id: 61, name: "mote lat saung" },
    { id: 62, name: "shwe yin aye" },
    { id: 63, name: "tamato salad" },
  ];
  return (
    <Layout title="Menu Categories">
      {/* <NavBar/> */}
      <Box>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          MenuCategories Component
        </h1>
        <Autocomplete options={textMenu} defaultValue={[textMenu[0]]} />
      </Box>
    </Layout>
  );
};
export default MenuCategories;
