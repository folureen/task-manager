import { CardContent, Typography, Card, CardActions } from "@mui/material";
import type { TTask } from "providers/app-context/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  task: TTask;
  selectTask: Dispatch<SetStateAction<any>>;
  setSelectedModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Task: React.FC<Props> = ({
  task,
  selectTask,
  setSelectedModalIsOpen,
}) => {
  const handleSelectTask = () => {
    setSelectedModalIsOpen(true);
    selectTask({ ...task });
  };

  return (
    <Card
      sx={{
        margin: 2,
        cursor: "pointer",
      }}
      onClick={handleSelectTask}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {new Date(task.createdAt).toLocaleString("ru")}
        </Typography>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default Task;
