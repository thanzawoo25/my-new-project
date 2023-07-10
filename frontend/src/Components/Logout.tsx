import { Typography } from "@mui/material";
import Layout from "./Layout";

const Logout = () => {
  return (
    <Layout>
      <Typography variant="h3" sx={{ textAlign: "center", mt: 5 }}>
        You're now logged out.
      </Typography>
    </Layout>
  );
};
export default Logout;
