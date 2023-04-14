import { Text, View, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import * as Clipboard from "expo-clipboard";

interface CardProps {
  onPress: (id: string) => void;
  id: string;
  source: string;
  user: string;
  password: string;
}

export default function Card({
  id,
  source,
  user,
  password,
  onPress,
}: CardProps) {
  return (
    <View className="h-96 bg-green-400 w-80 m-4 rounded-3xl p-4 flex justify-between">
      <View className="flex flex-row gap-4">
        <View className="h-14 w-14 p-2 rounded-2xl bg-green-200">
          <Image
            className="flex-1 w-full"
            source={{
              uri: `https://${source}.com/favicon.ico`,
            }}
          />
        </View>
        <View>
          <Text className="font-bold text-3xl">{source}</Text>
          <Text>{user}</Text>
        </View>
      </View>
      <View>
        <Text className="text-6xl">{password}</Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="bg-white p-2 rounded-full">
          <Feather
            name="trash-2"
            size={24}
            color="black"
            onPress={() => onPress(id)}
          />
        </Text>
        <TouchableOpacity className="bg-white p-2 rounded-full">
          <Feather
            name="copy"
            size={24}
            color="black"
            onPress={async () => {
              await Clipboard.setStringAsync(password);
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
