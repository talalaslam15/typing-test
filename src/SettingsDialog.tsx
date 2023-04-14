import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Slider,
  Switch,
  Typography,
} from "@mui/material";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  ignoreMistakes: boolean;
  setIgnoreMistakes: (value: boolean) => void;
  wordsLength: number;
  setWordsLength: (value: number) => void;
};

const SettingsDialog = ({
  open,
  onClose,
  ignoreMistakes,
  setIgnoreMistakes,
  wordsLength,
  setWordsLength,
}: SettingsDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: "500px",
          width: "500px",
          borderRadius: "10px",
        },
      }}
      sx={{
        ".MuiBackdrop-root": {
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <Typography variant="h4" align="center" mt={2}>
        Settings
      </Typography>
      <DialogContent>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h6">Ignore Mistakes</Typography>
          <Switch
            checked={ignoreMistakes}
            onChange={(e) => setIgnoreMistakes(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
        <Typography variant="h6">Words</Typography>
        <Slider
          min={5}
          max={50}
          valueLabelDisplay="auto"
          onChange={(e: any) => setWordsLength(e.target?.value)}
          value={wordsLength}
        />
      </DialogContent>
      <Box mb={2} px={2}>
        <Button fullWidth variant="outlined" onClick={onClose}>
          Done
        </Button>
      </Box>
    </Dialog>
  );
};

export default SettingsDialog;
