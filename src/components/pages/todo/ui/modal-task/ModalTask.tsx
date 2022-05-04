import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Dispatch, SetStateAction, useState } from "react";
import { SModalTaskListDescription, SModalTaskListTitle } from "./styles";
import Comments from "./ui/Comments";
import { STATUS, STATUS_NAME } from "./../../../../../common/constants/todo";
import Description from "./ui/Description";
import type { TTask } from "providers/app-context/types";
import Options from "./ui/Options";
type Props = {
  selectedTask: TTask | null;
  setSelectedTask: Dispatch<SetStateAction<TTask | null>>;
  setSelectedModalIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedModalIsOpen: boolean;
};

const GRID = {
  CONTAINER: 11,
  ITEM: 6,
  SPACING: 2,
};

const ModalTask: React.FC<Props> = ({
  selectedTask,
  setSelectedModalIsOpen,
  selectedModalIsOpen,
  setSelectedTask,
}) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const handleClose = () => setSelectedModalIsOpen(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) =>
    setSelectedTab(newValue);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case STATUS.CANCEL:
        return "error";
      case STATUS.DONE:
        return "success";
      case STATUS.IN_PROGRESS:
        return "primary";
      case STATUS.HOLD:
      default:
        return "success";
    }
  };

  if (selectedTask === null) {
    return null;
  }

  return (
    <Dialog open={selectedModalIsOpen} onClose={handleClose} scroll="body">
      <DialogTitle>{selectedTask.title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: 570,
            minHeight: 400,
            maxWidth: 570,
          }}
        >
          <Grid container spacing={GRID.SPACING}>
            <Grid item xs={GRID.ITEM}>
              <SModalTaskListTitle>
                <WorkHistoryOutlinedIcon /> Status
              </SModalTaskListTitle>
            </Grid>
            <Grid item xs={GRID.ITEM}>
              <SModalTaskListDescription>
                <Chip
                  label={STATUS_NAME[selectedTask.status]}
                  variant="outlined"
                  color={
                    getStatusColor(selectedTask.status) as
                      | "default"
                      | "primary"
                      | "secondary"
                      | "success"
                      | "error"
                      | "info"
                      | "warning"
                      | undefined
                  }
                />
              </SModalTaskListDescription>
            </Grid>
            <Grid item xs={GRID.ITEM}>
              <SModalTaskListTitle>
                <AccessTimeOutlinedIcon /> Дата создания
              </SModalTaskListTitle>
            </Grid>
            <Grid item xs={GRID.ITEM}>
              <SModalTaskListDescription>
                {new Date(selectedTask.createdAt).toLocaleString("ru")}
              </SModalTaskListDescription>
            </Grid>
            <Grid item xs={GRID.ITEM}>
              <SModalTaskListTitle>
                <PeopleAltOutlinedIcon /> Назначен
              </SModalTaskListTitle>
            </Grid>
            <Grid item xs={GRID.ITEM}>
              <SModalTaskListDescription>
                {selectedTask.assignName}
              </SModalTaskListDescription>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 5, borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={selectedTab} onChange={handleChangeTab}>
              <Tab label="Комментарии" />
              <Tab label="Описание" />
              <Tab label="Настройки" />
            </Tabs>
          </Box>
          <Box sx={{ padding: 1 }}>
            {selectedTab === 0 && <Comments taskId={selectedTask.id} />}
            {selectedTab === 1 && (
              <Description
                taskId={selectedTask.id}
                description={selectedTask.description}
                setSelectedTask={setSelectedTask}
              />
            )}
            {selectedTab === 2 && (
              <Options
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
              />
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTask;
