import TodoCard from "@/components/TodoCard";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { TodoType } from "@/utils/types/TodoType";

export default function TabOneScreen() {
  const { data, isLoading, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get("http://192.168.29.233:8055/items/todo");
      const data = res.data as TodoType;

      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  if (isFetched && isSuccess) {
    return (
      <ScrollView>
        <View style={styles.container}>
          {data.map((item) => {
            return <TodoCard key={item.id} info={item} />;
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
