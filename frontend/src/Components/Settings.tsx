import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";

const Settings = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  console.log(locations);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
      const locationIdFromLocalStorge =
        localStorage.getItem("selectedLocationId");
      if (locationIdFromLocalStorge) {
        setSelectedLocationId(locationIdFromLocalStorge);
      } else {
        const firstLocation = String(locations[0].id);
        setSelectedLocationId(firstLocation);
        localStorage.setItem("selectedLocationId", firstLocation);
      }
    }
  }, [locations]);
  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", locationId);
  };
  return (
    <Layout title="Settings">
      <Box sx={{ p: 3, width: "300px", margin: "0 auto" }}>
        <TextField label="Company Name" defaultValue={company?.name} />
        <Box sx={{ minWidth: 120, mt: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Locations</InputLabel>
            <Select
              value={selectedLocationId}
              label="Company Name"
              onChange={handleChange}
            >
              {locations.map((location) => {
                return (
                  <MenuItem value={location.id} key={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};
export default Settings;
