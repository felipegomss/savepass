import { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import Card from "../components/Card";

interface IData {
  id: string;
  source: string;
  user: string;
  password: string;
}

export default function Home({ navigation }: any) {
  const [data, setData] = useState<IData[]>([]);

  async function handleFetchData() {
    const response = await AsyncStorage.getItem("@savepass:passwords");
    const data = response ? JSON.parse(response) : [];
    setData(data);
  }

  async function handleDelete(id: string) {
    const response = await AsyncStorage.getItem("@savepass:passwords");
    const resData = response ? JSON.parse(response) : [];
    const data = resData.filter((item: IData) => item.id !== id);
    AsyncStorage.setItem("@savepass:passwords", JSON.stringify(data));
    handleFetchData();
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  return (
    <View className="bg-green-600 flex-1">
      <View className="flex w-full p-8">
        <View className=" flex flex-row justify-between items-center mb-8 mt-4">
          <Text className="text-3xl  font-bold">Unbreakable</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Add")}
            className="bg-green-700 rounded-full px-4 py-2 justify-center items-center flex"
          >
            <Text className="text-sm font-bold">New Item +</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-7xl">Keep</Text>
        <Text className="text-7xl">Your Life</Text>
        <Text className="text-7xl">Safe</Text>
      </View>
      <FlatList
        horizontal
        ListEmptyComponent={
          <View className="w-screen flex justify-center items-center">
            <Text className=" text-gray-700">
              Your passwords and accounts will appear here
            </Text>
          </View>
        }
        data={data}
        renderItem={({ item, index }) => {
          return (
            <Card
              key={index}
              id={item.id}
              source={item.source}
              user={item.user}
              password={item.password}
              onPress={() => handleDelete(item.id)}
            />
          );
        }}
      />
    </View>
  );
}
