import { View,Image,Text } from 'react-native';

import Home from './Home';
import Books from './Books';
import BookStack from './BookStack';
import Profile from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

const TabNavigation = () =>
{
    const Tab = createBottomTabNavigator();
    return(
      <Tab.Navigator 
        screenOptions={{ headerShown: false,tabBarStyle:{backgroundColor:'orange',paddingBottom:3}}}
        tabBarOptions={{showLabel:false}}
    
      >
        <Tab.Screen name="Home" component={HomeStack} options={{
            tabBarIcon :({focused})=>(
                <View style={{backgroundColor:focused?'#324650':'orange',padding:10,borderRadius:30/2,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("./assets/icons/homeschooling.png")}
                            resizeMode='contain'
                            style={{width:25,height:25}}
                    />
                    <Text style={{color:focused?"white":"black"}}>Home</Text>
                </View>
            )
        }}

        />
        <Tab.Screen name="Books" component={BookStack} options={{
            tabBarIcon :({focused})=>(
                <View style={{backgroundColor:focused?'#324650':'orange',padding:10,borderRadius:30/2,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("./assets/icons/book.png")}
                            resizeMode='contain'
                            style={{width:25,height:25}}
                    />
                    <Text style={{color:focused?"white":"black"}}>Books</Text>
                </View>
            )
        }}/>
        <Tab.Screen name="Profile" component={ProfileStack} options={{
            tabBarIcon :({focused})=>(
                <View style={{backgroundColor:focused?'#324650':'orange',padding:10,borderRadius:30/2,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("./assets/icons/study.png")}
                            resizeMode='contain'
                            style={{width:25,height:25}}
                    />
                    <Text style={{color:focused?"white":"black"}}>Profile</Text>
                </View>
            )
        }}/>
    </Tab.Navigator>
    )
}

export default TabNavigation