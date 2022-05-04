import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { SButtonNewTask } from "./styles";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const NewTask: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <SButtonNewTask>
      <Fab color="primary" aria-label="add" onClick={() => setModalOpen(true)}>
        <Add />
      </Fab>
    </SButtonNewTask>
  );
};

export default NewTask;
