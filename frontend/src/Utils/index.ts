import {
  Addon,
  AddonCategory,
  Location,
  Menu,
  MenuCategory,
  MenusAddonCategory,
  MenusMenuCategoriesLocations,
} from "../typings/types";

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getMenuCategoriesByLocationIds = (
  menuCategories: MenuCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};
export const getMenusByLocationId = (
  menus: Menu[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};

export const getMenusByMenuCategoryIds = (
  menus: Menu[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menus_id &&
        item.menu_categories_id === Number(menuCategoryId) &&
        item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
  //console.log("validMenuIds", validMenuIds);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};

export const getAddonCategoriesByLocationId = (
  addonCategories: AddonCategory[],
  menusAddonCategories: MenusAddonCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenusAddonCategories = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.locations_id && item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenusAddonCategories.includes(item.menus_id))
    .map((item) => item.addon_categories_id);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id as number)
  );
};

export const getAddonsByLocationIds = (
  addons: Addon[],
  addonCategories: AddonCategory[]
) => {
  const validAddonCategoiryIds = addonCategories.map((item) => item.id);
  return addons.filter((item) =>
    validAddonCategoiryIds.includes(item.addon_categories_id)
  );
};

export const getLocationByMenuCategoryId = (
  location: Location[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validLocationId = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.locations_id);
  return location.filter((item) => validLocationId.includes(item.id as number));
};
