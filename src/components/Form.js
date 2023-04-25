import React from "react";
import { Heading, Input, Textarea, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const baseProps = { borderRadius: "5px", border: "2px solid #000", my: 2 };

export default function Form({ details }) {
  const [formData, setFormData] = React.useState({ name: null, message: null });
  const toast = useToast();

  function handleFormFields(data) {
    setFormData({
      ...formData,
      ...data,
    });
  }

  async function handleFormData(e) {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BACKEND_URL}/createComment`,
        formData
      );
      if (response.data.id) {
        setFormData({ name: null, message: null });
      }
      e.target.reset();
      toast({
        title: "Comment posted.",
        description: "Your comment has been posted. Thank you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={(e) => handleFormData(e)}>
      <Heading size="md">Name</Heading>
      <Input
        {...baseProps}
        onChange={(e) => handleFormFields({ name: e.target.value })}
      />
      <Heading hidden size="md">
        Comment
      </Heading>
      <Textarea
        {...baseProps}
        onChange={(e) => handleFormFields({ message: e.target.value })}
      />
      <Button
        mx="auto"
        boxShadow={"lg"}
        border={"2px solid #000"}
        isDisabled={!(formData.name && formData.message)}
        type="submit"
      >
        Comment
      </Button>
    </form>
  );
}
