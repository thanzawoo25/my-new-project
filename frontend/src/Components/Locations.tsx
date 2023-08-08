import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import CreateLocations from "./CreateLocations";
import Layout from "./Layout";

const Locations = () => {
  const { locations, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  return (
    <Layout title="Locations">
      <Box sx={{ px: 3, pt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
          >
            create new table
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 5,
          }}
        >
          {locations.map((location) => (
            <Link
              to={`/locations/${location.id}`}
              key={location.id}
              style={{ textDecoration: "none", color: "#000000 " }}
            >
              <Paper
                elevation={2}
                sx={{
                  width: 150,
                  height: 150,
                  mr: 5,
                  mb: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {location.name}
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
      <CreateLocations open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Locations;
