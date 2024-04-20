import { Todo } from "@/utils/types/TodoType";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DeleteModal = ({
  visible,
  onDelete,
  onCancel,
  info,
}: {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
  info?: Todo;
}) => {
  const queryClient = useQueryClient();

  const deleteTodo = async () => {
    try {
      await axios.delete(`http://192.168.29.233:8055/items/todo/${info?.id}`);
      queryClient.refetchQueries({ queryKey: ["todos"] });
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Todo</Text>
          <Text style={styles.modalText}>
            Are you sure you want to delete this todo?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={deleteTodo}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    elevation: 5,
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff6347",
  },
  cancelButton: {
    backgroundColor: "#1e90ff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DeleteModal;
