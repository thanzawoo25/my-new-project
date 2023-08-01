import { Box, Button, TextField } from "@mui/material";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { getAccessToken } from "../Utils";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Addon } from "../typings/types";
import { config } from "../Config/config";
import DeleteDialog from "./DeleteDialog";

const EditAddons = () => {
  const params = useParams();
  const navigate = useNavigate();
  const addonId = params.id as string;
  const { addons, fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();

  const [open, setOpen] = useState(false);
  const [addon, setAddon] = useState<Addon>();

  const updateAddon = async () => {
    if (!addon?.name) return;
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addon),
    });
    fetchData();
    navigate("/addons");
  };

  const handleDeleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    setOpen(false);
    navigate("/addons");
  };
  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addons]);

  if (!addon) return null;

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
            defaultValue={addon.name}
            onChange={(event) =>
              setAddon({ ...addon, name: event.target.value })
            }
          />
          <TextField
            sx={{ mb: 3 }}
            defaultValue={addon.price}
            onChange={(event) =>
              setAddon({ ...addon, price: Number(event.target.value) })
            }
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", mb: 3 }}
            onClick={updateAddon}
          >
            update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure you want to delete this addon category?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteAddon}
        />
      </Box>
    </Layout>
  );
};
export default EditAddons;
