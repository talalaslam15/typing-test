import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton } from "@mui/material";
type ResetIconProps = {
  reset: () => void;
  containerRef: React.RefObject<HTMLButtonElement>;
};
const ResetIcon = ({ reset, containerRef }: ResetIconProps) => {
  return (
    <Box>
      <IconButton
        tabIndex={0}
        ref={containerRef}
        onClick={(e) => {
          e.currentTarget.blur();
          reset();
        }}
        sx={{
          "&:hover": {
            color: "white",
            bgcolor: "#fff4",
          },
          mt: 2,
        }}
      >
        <RefreshIcon sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default ResetIcon;
