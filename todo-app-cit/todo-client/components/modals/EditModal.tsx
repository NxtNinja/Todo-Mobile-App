import { Todo } from "@/utils/types/TodoType";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const EditModal = ({
  visible,
  onClose,
  info,
}: {
  visible: boolean;
  onClose: () => void;
  info?: Todo;
}) => {
  const [title, setTitle] = useState(info?.todo_text);

  const queryClient = useQueryClient();

  const updateTodo = async () => {
    try {
      await axios.patch(`http://192.168.29.233:8055/items/todo/${info?.id}`, {
        todo_text: title,
      });
      queryClient.refetchQueries({ queryKey: ["todos"] });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Todo</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={updateTodo}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#1e90ff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditModal;
