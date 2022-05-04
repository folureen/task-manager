import { Box, Grid, Button, TextField, Snackbar, Alert } from "@mui/material";
import useAppContext from "providers/app-context";
import { TTask } from "providers/app-context/types";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";

type Props = {
  taskId: string;
  description: string;
  setSelectedTask: Dispatch<SetStateAction<TTask | null>>;
};

const Description: React.FC<Props> = ({
  taskId,
  description: desc,
  setSelectedTask,
}) => {
  const { actions } = useAppContext();

  const [description, setDescription] = useState<string>(desc);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const handleChangeDescription: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => setDescription(e.target.value);
  const handleSaveDescription = () => {
    setSelectedTask((prev) => ({ ...prev, description } as TTask));
    actions.changeTaskParam(taskId, { description: description });
    setNotifyOpen(true);
  };

  const handleCloseNotify = () => setNotifyOpen(false);

  return (
    <>
      <Box sx={{ marginTop: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              value={description}
              fullWidth
              multiline
              maxRows={16}
              onChange={handleChangeDescription}
            />
          </Grid>
          <Grid item xs={2}>
            <Button size="large" onClick={handleSaveDescription}>
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={notifyOpen}
        autoHideDuration={6000}
        onClose={handleCloseNotify}
      >
        <Alert
          onClose={handleCloseNotify}
          severity="success"
          sx={{ width: "100%" }}
        >
          Описание отредактировано
        </Alert>
      </Snackbar>
    </>
  );
};

export default Description;
