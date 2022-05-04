import { Grid } from "@mui/material";
import useAppContext from "providers/app-context";
import { TTask } from "providers/app-context/types";
import { useEffect, useState } from "react";
import ModalNewTask from "./ui/modal-new-task";
import ModalTask from "./ui/modal-task";
import NewTask from "./ui/new-task";
import Task from "./ui/task";

const Todo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const [selectedModalIsOpen, setSelectedModalIsOpen] = useState(false);

  const {
    state: { tasks },
    actions,
  } = useAppContext();

  useEffect(() => {
    actions.getTasks();
  }, [actions]);
  return (
    <>
      <ModalNewTask modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <NewTask setModalOpen={setModalOpen} />
      <ModalTask
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setSelectedModalIsOpen={setSelectedModalIsOpen}
        selectedModalIsOpen={selectedModalIsOpen}
      />
      <Grid container>
        {tasks.map((item) => {
          return (
            <Grid item key={item.id} xs={2}>
              <Task
                task={item}
                selectTask={setSelectedTask}
                setSelectedModalIsOpen={setSelectedModalIsOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Todo;
