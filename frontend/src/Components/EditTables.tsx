import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../Config/config";
import { AppContext } from "../Context/AppContext";
import { getAccessToken } from "../Utils";
import { Tables } from "../typings/types";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditTables = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tableId = params.id as string;
  const { tables, fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();

  const [open, setOpen] = useState(false);
  const [table, setTable] = useState<Tables>();

  const updateTables = async () => {
    const isValid = table?.name;
    if (!isValid) return alert("Table name is required.");
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    });
    fetchData();
    navigate("/tables");
  };

  const handleDeleteTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    setOpen(false);
    navigate("/tables");
  };
  useEffect(() => {
    if (tables.length) {
      const validTable = tables.find((item) => item.id === Number(tableId));
      validTable && setTable(validTable);
    }
  }, [tables]);

  if (!table) return null;

  return (
    <Layout title="Edit Tables">
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
        <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
          <TextField
            sx={{ mb: 3 }}
            defaultValue={table.name}
            onChange={(event) =>
              setTable({ ...table, name: event.target.value })
            }
          />

          <Button
            variant="contained"
            sx={{ width: "fit-content", mb: 3 }}
            onClick={updateTables}
          >
            update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure you want to delete this table?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteTable}
        />
      </Box>
    </Layout>
  );
};
export default EditTables;
