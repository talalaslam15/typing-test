import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
export default function SettingsButton({ setOpen }: { setOpen: () => void }) {
  return (
    <IconButton
      onClick={(e) => {
        setOpen();
        e.currentTarget.blur();
      }}
      sx={{
        position: "absolute",
        top: 10,
        right: 15,
      }}
    >
      <SettingsIcon sx={{ color: "white" }} />
    </IconButton>
  );
}
