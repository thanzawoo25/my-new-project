import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Menus from "../Components/Menus";
import MenuCategories from "../Components/MenuCategories";
import AddonCategories from "../Components/AddonCategories";
import Addons from "../Components/Addons";
import Settings from "../Components/Settings";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import Register from "../Components/Register";
import PrivateRoute from "./PrivateRoute";
import Locations from "../Components/Locations";
import CreateMenu from "../Components/CreateMenu";
import { Autocomplete } from "@mui/material";
import Tables from "../Components/Tables";
import EditMenuCategories from "../Components/EditMenuCategories";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menu-categories" Component={MenuCategories} />
          {/* <Route path="/menu-categories/:id" Component={EditMenuCategories} /> */}
          <Route path="/create-menu" Component={CreateMenu} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/tables" Component={Tables} />
          <Route path="/locations" Component={Locations} />
          <Route path="/settings" Component={Settings} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
