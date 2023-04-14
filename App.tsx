import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import StackRoutes from "./src/routes/stack.routes";

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
      <StatusBar translucent={true} backgroundColor={"transparent"} />
    </NavigationContainer>
  );
}
