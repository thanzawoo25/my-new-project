import { createContext, useEffect, useState } from "react";

import {
  Menu,
  MenuCategory,
  Addon,
  AddonCategory,
  Company,
  Location,
  Tables,
  MenusMenuCategoriesLocations,
  MenusAddonCategory,
} from "../typings/types";

import { config } from "../Config/config";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusAddonCategories: MenusAddonCategory[];
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[];
  company: Company | null;
  tables: Tables[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaltContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusAddonCategories: [],
  menusMenuCategoriesLocations: [],
  company: null,
  tables: [],
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaltContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaltContext);
  const accessToken = localStorage.getItem("accessToken");

  //console.log("accessToken", accessToken);
  //console.log("Data", data)

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    //console.log(config)

    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();

    console.log("Response from server", responseJson);

    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    } = responseJson;

    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
