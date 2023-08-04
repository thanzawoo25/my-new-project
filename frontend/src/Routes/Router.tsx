import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AddonCategories from "../Components/AddonCategories";
import Addons from "../Components/Addons";
import EditAddonCategories from "../Components/EditAddonCategories";
import EditAddons from "../Components/EditAddons";
import EditMenuCategories from "../Components/EditMenuCategories";
import EditMenus from "../Components/EditMenus";
import Locations from "../Components/Locations";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import MenuCategories from "../Components/MenuCategories";
import Menus from "../Components/Menus";
import Register from "../Components/Register";
import Settings from "../Components/Settings";
import Tables from "../Components/Tables";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menus/:id" Component={EditMenus} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route path="/menu-categories/:id" Component={EditMenuCategories} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addons/:id" Component={EditAddons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/addon-categories/:id" Component={EditAddonCategories} />
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
