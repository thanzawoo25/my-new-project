import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Menu } from "../typings/types";

interface Props {
  menu: Menu;
}
const MenusCard = ({ menu }: Props) => {
  return (
    <Link
      key={menu.id}
      to={`/menus/${menu.id}`}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card sx={{ width: 300, height: 300 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={menu.asset_url || ""}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {menu.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenusCard;
