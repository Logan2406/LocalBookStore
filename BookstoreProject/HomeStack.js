import { createStackNavigator } from "@react-navigation/stack"
import Home from "./Home"
import AllAuthors from "./src/components/AllAuthors"
import Author from "./src/components/Author"
import Topten from "./src/components/Topten"
const HomeStack = () =>
{

    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Authors" component={AllAuthors}/>
            <Stack.Screen name="Author" component={Author}/>
            <Stack.Screen name="TopTen" component={Topten}/>
        </Stack.Navigator>
    )
}

export default HomeStack