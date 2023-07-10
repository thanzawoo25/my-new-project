import { Box, Button, TextField, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { config } from "../Config/config";
import { Location } from "../typings/types";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });

  const [updateLocation, setUpdateLocation] = useState({
    name: "",
    address: "",
  });

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    company?.id && setNewLocation({ ...newLocation, companyId: company.id });
  }, [company]);

  // useEffect(() => {
  //     setNewLocation({ ...newLocation, companyId: company?.id });
  // },[company])

  const createNewLocation = async () => {
    console.log(newLocation);
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    fetchData();
    setNewLocation({ name: "", address: "", companyId: company?.id });
  };

  const updateLocationFunction = async (location: Location) => {
    console.log("Location", locations);

    if (!updateLocation.name && !updateLocation.address)
      return alert("Please change your location and address");

    const locationId = location.id;
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateLocation),
    });
    fetchData();
    setUpdateLocation({ name: "", address: "" });
  };

  const deleteLocationFunction = async (location: Location) => {
    const locationId = location.id;
    const response = await fetch(
      `${config.apiBaseUrl}/locations/${locationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      fetchData();
    } else {
      alert(
        "Cannot delete location.Please delete menus menu categories locations first"
      );
    }
  };

  return (
    <Layout title="Locations">
      {/* <NavBar/> */}
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {locations.map((location, index) => {
          return (
            <Box
              key={location.id}
              sx={{ display: "flex", alignItems: "center", mb: 3 }}
            >
              <Typography sx={{ mr: 3 }} variant="h5">
                {index + 1}.
              </Typography>

              <TextField
                defaultValue={location.name}
                sx={{ mr: 3 }}
                onChange={(event) =>
                  setUpdateLocation({
                    ...updateLocation,
                    name: event.target.value,
                  })
                }
              />
              <TextField
                defaultValue={location.address}
                sx={{ mr: 3 }}
                onChange={(event) =>
                  setUpdateLocation({
                    ...updateLocation,
                    address: event.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                sx={{ mr: 3 }}
                onClick={() => updateLocationFunction(location)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteLocationFunction(location)}
              >
                Delete
              </Button>
            </Box>
          );
        })}
        <h1
          style={{
            marginLeft: "20px",
            color: "Blue",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Create New Locations
        </h1>

        <Box sx={{ mt: 5, ml: 5, display: "flex", alignItems: "center" }}>
          <TextField
            value={newLocation.name}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          />

          <TextField
            value={newLocation.address}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Button variant="contained" onClick={createNewLocation}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
export default Locations;
