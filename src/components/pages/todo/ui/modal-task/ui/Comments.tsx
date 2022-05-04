import { Box, Avatar, Grid, Button, TextField } from "@mui/material";
import { SCommentsName, SCommentsTimestamp } from "../styles";
import useAppContext from "providers/app-context";
import { ChangeEventHandler, useEffect, useState } from "react";

type Props = {
  taskId: string;
};

const Comments: React.FC<Props> = ({ taskId }) => {
  const {
    state: { comments },
    actions,
  } = useAppContext();

  const [commentValue, setCommentValue] = useState("");

  const handleChangeCommentValue: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => setCommentValue(e.target.value);

  const handleSendComment = () => {
    setCommentValue("");
    actions.sendComment(commentValue, taskId);
  };

  useEffect(() => {
    actions.getComments(taskId);
  }, [actions, taskId]);

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Box
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
          }}
          key={comment.id}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
              <Avatar alt={comment.name} src="/static/images/avatar/1.jpg" />
            </Grid>

            <Grid item xs={11}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <SCommentsTimestamp>
                  {new Date(comment.timestamp).toLocaleString("ru")}
                </SCommentsTimestamp>
                <SCommentsName>{comment.name}</SCommentsName>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: 1,
              borderRadius: 2,
              width: "90%",
              height: "100%",
              padding: 2,
              backgroundColor: "#F5F7F9",
              fontSize: 14,
            }}
          >
            {comment.commentText}
          </Box>
        </Box>
      );
    });
  };

  return (
    <>
      <Box>{renderComments()}</Box>
      <Box sx={{ marginTop: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              value={commentValue}
              fullWidth
              multiline
              maxRows={4}
              onChange={handleChangeCommentValue}
            />
          </Grid>
          <Grid item xs={2}>
            <Button size="large" onClick={handleSendComment}>
              Отправить
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Comments;
