import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal"; // Import the DeleteModal component
import { SingleTodoType, Todo } from "@/utils/types/TodoType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TodoPropInfo = {
  info: Todo;
};

const TodoCard = ({ info }: TodoPropInfo) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { data } = useQuery({
    queryKey: ["todo_id", info.id],
    queryFn: async () => {
      const res = await axios.get(
        `http://192.168.29.233:8055/items/todo/${info.id}`
      );
      const data = res.data as SingleTodoType;

      return data.data;
    },
  });

  console.log(data);

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const deleteModal = () => {};

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{info?.todo_text}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={openEditModal}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={openDeleteModal}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <EditModal
        visible={editModalVisible}
        onClose={closeEditModal}
        info={data}
      />
      <DeleteModal
        visible={deleteModalVisible}
        onCancel={closeDeleteModal}
        onDelete={deleteModal}
        info={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#1e90ff",
  },
  deleteButton: {
    backgroundColor: "#ff6347",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TodoCard;
