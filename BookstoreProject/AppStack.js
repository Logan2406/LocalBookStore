import { StyleSheet, Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import TabNavigation from './TabNavigation';
import Setting from './Setting';
import CustomDrawer from './CutomDrawer';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LogoTitle = (props) =>
{
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'#324650',fontSize:30,fontWeight:'bold'}}>Bookstore</Text>    
    </View>
  )
}


const AppStack = () =>
{
    const Drawer = createDrawerNavigator();

  return (
    
    <Drawer.Navigator initialRouteName="Home" drawerContent={props=><CustomDrawer {...props}/>}>
        <Drawer.Screen name="Home" component={TabNavigation} options={{ 
                                                              headerTitle: (props) => <LogoTitle {...props}/>, 
                                                              headerStyle:{ backgroundColor:'orange',height:120},
                                                              headerTintColor:'#324650',
                                                              drawerActiveTintColor:'white',
                                                              drawerActiveBackgroundColor:"#324650"
                                                      
                                                              }} />
        <Drawer.Screen name="Setting" component={Setting} options={{
                                                                    headerStyle:{ backgroundColor:'orange',height:120},
                                                                    drawerActiveTintColor:'white',
                                                                    drawerActiveBackgroundColor:"#324650"
                                                                    }}/>
                                                            
        <Drawer.Screen name="About" component={Setting} options={{
                                                                    headerStyle:{ backgroundColor:'orange',height:120},
                                                                    drawerActiveTintColor:'white',
                                                                    drawerActiveBackgroundColor:"#324650"
                                                                    }}/>

          <Drawer.Screen name="Book Request" component={Setting} options={{
                                                                    headerStyle:{ backgroundColor:'orange',height:120},
                                                                    drawerActiveTintColor:'white',
                                                                    drawerActiveBackgroundColor:"#324650"
                                                                    }}/>                                                             

         <Drawer.Screen name="Change Password" component={Setting} options={{
                                                                    headerStyle:{ backgroundColor:'orange',height:120},
                                                                    drawerActiveTintColor:'white',
                                                                    drawerActiveBackgroundColor:"#324650"
                                                                    }}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default AppStack;