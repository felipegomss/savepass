import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Add from "../screens/Add";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{ title: "New Item" }}
      />
    </Stack.Navigator>
  );
}
