import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import useAppContext from "providers/app-context";
import type { TTask } from "providers/app-context/types";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

type Props = {
  selectedTask: TTask;
  setSelectedTask: Dispatch<SetStateAction<TTask | null>>;
};

const Options: React.FC<Props> = ({ selectedTask, setSelectedTask }) => {
  const {
    actions,
    state: { optionsList },
  } = useAppContext();

  const handleChangeOptions = (e: any) => {
    actions.getUsersOptions(e.target.value);
  };

  const handleSelectOption = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    const getUser = optionsList.find((option) => option.name === value);
    if (getUser) {
      setSelectedTask(
        (prev) =>
          ({
            ...prev,
            assignName: getUser?.name,
            assignId: getUser?.id,
          } as TTask)
      );
    }
  };

  const handleSaveChanges = () => {
    actions.changeTaskParam(selectedTask.id, {
      assignName: selectedTask.assignName,
      assignId: selectedTask.assignId,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          onChange={handleSelectOption}
          options={optionsList.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              value={selectedTask.assignName}
              onChange={handleChangeOptions}
              label="Назначен"
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Button size="large" onClick={handleSaveChanges}>
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default Options;
