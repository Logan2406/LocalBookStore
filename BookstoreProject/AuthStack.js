import { createStackNavigator } from "@react-navigation/stack"
import LoginPage from "./LoginPage";

const Stack = createStackNavigator();
const AuthStack = () =>
{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginPage}/>
        </Stack.Navigator>
    )
}

export default AuthStack;