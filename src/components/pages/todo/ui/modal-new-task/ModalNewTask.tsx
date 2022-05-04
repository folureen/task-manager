import { yupResolver } from "@hookform/resolvers/yup";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import useAppContext from "providers/app-context";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { newTaskSchema } from "./schema";

type Props = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalNewTask: React.FC<Props> = ({ modalOpen, setModalOpen }) => {
  const { actions } = useAppContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(newTaskSchema),
  });

  const onSumbit = (data: any) => {
    actions.setTask(data.title, data.description);
    setModalOpen(false);
  };

  return (
    <Dialog
      open={modalOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(onSumbit)}>
        <DialogTitle id="alert-dialog-title">Новый тикет</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 400,
              height: 200,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              rowSpacing={{ xs: 4 }}
            >
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      id="fullWidth"
                      error={errors?.title !== undefined}
                      label="Заголовок"
                      variant="standard"
                      helperText={errors?.title?.message}
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      id="fullWidth"
                      error={errors?.description !== undefined}
                      label="Описание"
                      variant="standard"
                      helperText={errors?.description?.message}
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Отменить</Button>
          <Button type="submit">Добавить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalNewTask;
