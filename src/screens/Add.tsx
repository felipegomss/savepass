import { useState, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { RadialSlider } from "react-native-radial-slider";

export default function Add({ navigation }: any) {
  const [size, setSize] = useState(8);
  const [password, setPassword] = useState("");
  const [source, setSource] = useState("");
  const [user, setUser] = useState("");

  function getPassword() {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
    var passwordLength = size;
    var password = "";

    for (var i = 0; i < passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setPassword(password);
  }
  useEffect(() => {
    getPassword();
  }, []);

  async function handleNew() {
    const id = uuid.v4();
    const newData = {
      id,
      source,
      user,
      password,
    };

    const response = await AsyncStorage.getItem("@savepass:passwords");
    const resData = response ? JSON.parse(response) : [];

    const data = [...resData, newData];
    console.log(resData, newData, data);
    await AsyncStorage.setItem("@savepass:passwords", JSON.stringify(data));
    navigation.navigate("Home");
  }

  return (
    <View className="flex-1 bg-blue-600 relative flex justify-between">
      <View className="mt-16 px-4">
        <Text className="text-5xl">Create a Solid Password</Text>
        <TextInput
          placeholder="Service Name"
          onChangeText={setSource}
          className="bg-blue-300 text-3xl rounded-xl p-4 mt-4"
        />
        <TextInput
          placeholder="User name or Email"
          onChangeText={setUser}
          className="bg-blue-300 text-3xl rounded-xl p-4 mt-4"
        />
      </View>
      <View className="w-full flex justify-center items-center">
        <RadialSlider
          subTitle={"CHARACTERS"}
          unit={""}
          variant={"radial-circle-slider"}
          value={size}
          min={4}
          max={20}
          onChange={setSize}
        />
      </View>
      <View className="flex justify-center items-center bg-white w-screen h-48 rounded-t-3xl">
        <Text className="font-bold text-blue-600 text-xs">RANDOM PASSWORD</Text>
        <Text className="text-2xl m-4 font-bold">{password}</Text>
        <TouchableOpacity
          onPress={getPassword}
          className=" bg-blue-300 rounded-full aspect-square p-2"
        >
          <FontAwesome5 name="redo" size={30} color="blue" />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-0 w-screen flex flex-row justify-between p-4">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="flex flex-row justify-center items-center p-2 bg-blue-50 rounded-full"
        >
          <Ionicons name="chevron-back-outline" size={16} color="black" />
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNew}
          className="flex flex-row justify-center items-center p-2 bg-blue-50  rounded-full"
        >
          <Text>Use</Text>
          <Feather name="arrow-up-right" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
