import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { getAccessToken, getSelectedLocationId } from "../Utils";
import CreateTables from "./CreateTables";
import Layout from "./Layout";

const Tables = () => {
  const { tables, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState("");
  const selectedLocationId = getSelectedLocationId();
  const accessToken = getAccessToken();
  const isValidTable = tables.filter(
    (item) => item.locations_id === Number(selectedLocationId)
  );

  return (
    <Layout title="Tables">
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
          {isValidTable.map((table) => (
            <Link
              to={`/tables/${table.id}`}
              key={table.name}
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
                {table.name}
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
      <CreateTables open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Tables;
