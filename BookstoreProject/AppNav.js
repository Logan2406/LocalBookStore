import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useContext } from 'react';
import {View,ActivityIndicator} from 'react-native';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

import { AuthContext } from './AuthContext';


const AppNav = () =>
{
    const {isLoading,userDet} = useContext(AuthContext)


    if(isLoading)
    {
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>)
    }


    return(
        <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer>
       
        {userDet.auth ?<AppStack/>: <AuthStack/>}

        </NavigationContainer>
    </GestureHandlerRootView>
    )
}
export default AppNav;