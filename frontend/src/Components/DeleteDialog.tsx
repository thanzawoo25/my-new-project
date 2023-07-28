import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  callback: () => void;
}
const DeleteDialog = ({ title, open, setOpen, callback }: Props) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ color: "blue" }}
          onClick={() => setOpen(false)}
        >
          cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            callback();
            setOpen(false);
          }}
        >
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
