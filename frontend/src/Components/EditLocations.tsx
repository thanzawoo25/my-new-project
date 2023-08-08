import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { getAccessToken } from "../Utils";
import { Location } from "../typings/types";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditLocations = () => {
  const params = useParams();
  const navigate = useNavigate();
  const locationId = params.id as string;
  const { locations, fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<Location>();

  const updateLocation = async () => {
    const isValid = location?.name && location.address;
    if (!isValid) return alert("Name and address are required.");

    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    accessToken && fetchData();
    navigate("/locations");
  };

  const handleDeleteLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    navigate("/locations");
    setOpen(false);
  };

  useEffect(() => {
    if (locations.length) {
      const validLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setLocation(validLocation);
    }
  }, [locations]);

  if (!location) return null;

  return (
    <Layout title="Edit Locations">
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
            defaultValue={location.name}
            onChange={(event) =>
              setLocation({ ...location, name: event.target.value })
            }
          />
          <TextField
            sx={{ mb: 3 }}
            defaultValue={location.address}
            onChange={(event) =>
              setLocation({ ...location, address: event.target.value })
            }
          />

          <Button
            variant="contained"
            sx={{ width: "fit-content", mb: 3 }}
            onClick={updateLocation}
          >
            update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure you want to delete this location?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteLocation}
        />
      </Box>
    </Layout>
  );
};
export default EditLocations;
