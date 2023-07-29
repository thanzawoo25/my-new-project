import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { getAccessToken } from "../Utils";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Addon, AddonCategory } from "../typings/types";
import { config } from "../Config/config";
import DeleteDialog from "./DeleteDialog";
import AddonCategories from "./AddonCategories";

const EditAddonCategories = () => {
  const params = useParams();
  const navigate = useNavigate();
  const addonCategoryId = params.id as string;
  const { addonCategories, fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();

  const [open, setOpen] = useState(false);
  const [addonCategory, setAddonCategory] = useState<AddonCategory>();

  const updateAddonCategory = () => {
    console.log("updateAddonCategories");
  };
  const handleDeleteAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addon-categories/${addonCategoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    setOpen(false);
    navigate("/addon-categories");
  };

  useEffect(() => {
    if (addonCategories.length) {
      const validAddonCategories = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      setAddonCategory(validAddonCategories);
    }
  }, [addonCategories]);

  if (!addonCategory) return null;

  return (
    <Layout title="Edit Addon Categories">
      <Box sx={{ mt: 3, mx: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ mb: 3 }}
            defaultValue={addonCategory.name}
            onChange={(event) =>
              setAddonCategory({ ...addonCategory, name: event.target.value })
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={addonCategory.is_required ? true : false}
                onChange={(event) =>
                  setAddonCategory({
                    ...addonCategory,
                    is_required: event.target.checked,
                  })
                }
              />
            }
            label="required"
          />

          <Button
            variant="contained"
            sx={{ width: "fit-content", mb: 3 }}
            onClick={updateAddonCategory}
          >
            update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure you want to delete this addon category?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteAddonCategory}
        />
      </Box>
    </Layout>
  );
};
export default EditAddonCategories;
