import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import "./App.css";
import { socket } from "../utils/socket";
import axios from "axios";
import Form from "./Form";
import Comment from "./Comment";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

function App() {
  const [commentsCheckId, setCommentsCheckId] = React.useState(-1);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    function onIOConnect() {}

    function onIODisconnect() {}

    socket.on("connect", onIOConnect);
    socket.on("disconnect", onIODisconnect);
    socket.on("new-comment", (commentId) => {
      setCommentsCheckId(commentId);
    });

    return () => {
      socket.off("connect", onIOConnect);
      socket.off("disconnect", onIODisconnect);
    };
  }, []);

  React.useEffect(() => {
    axios.get(`${BACKEND_URL}/getComments`).then((comments) => {
      setComments(comments.data.reverse());
    });
  }, [commentsCheckId]);

  return (
    <Box className="App" p="5" maxW="500px" margin="0 auto">
      <Box maxW="300px" mx="auto">
        <Form />
      </Box>
      <Divider h="50px" />
      <Box>
        <Box textAlign={"left"} mb={2}>
          {comments.length > 0 && <Text>{comments.length} Comments</Text>}
        </Box>
        {comments.map((details, index) => (
          <Comment details={details} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default App;
