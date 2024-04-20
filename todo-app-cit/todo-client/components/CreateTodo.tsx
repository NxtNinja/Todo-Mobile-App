import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const CreateTodo = () => {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const createTodo = async () => {
    try {
      await axios.post("http://192.168.29.233:8055/items/todo", {
        todo_text: title,
      });
      queryClient.refetchQueries({ queryKey: ["todos"] });
      setTitle("");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Todo text"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={createTodo}
      >
        <Text style={styles.buttonText}>CREATE TODO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 3,
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#1e90ff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreateTodo;
