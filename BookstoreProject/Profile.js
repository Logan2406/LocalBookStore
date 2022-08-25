import { View,Text,Image,TouchableOpacity,ScrollView,ImageBackground,Dimensions } from "react-native"
import { useState,useEffect,useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios'
import { AuthContext } from "./AuthContext";


const Profile = () =>
{
    const {userDet} = useContext(AuthContext)

    const navigator = useNavigation()

    const [user,setUser] = useState({})
    
    const [tableData,setTableData] = useState([])
    const  getData = async() =>
    {
        let response =  await axios.get(`http://10.0.2.2:5000/user/userdata`,{
                headers: {'Content-Type': 'application/json','token':userDet.accTok}
              }).then(data=>data.data.user).catch(err=>err);
        
        setUser(response)
    }

    const getBooksData = async() =>
    {
        let response =  await axios.get(`http://10.0.2.2:5000/user/booksdata`,{
                headers: {'Content-Type': 'application/json','token':userDet.accTok}
              }).then(data=>data.data.issues).catch(err=>err);
        setTableData(response)
        
    }

    useEffect(()=>
    {
        getData()
        getBooksData()

    },[])

    return(
        <ImageBackground resizeMode="cover" source={require("./assets/profilebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
        <ScrollView style={{flex:1,marginBottom:180}}>
           <View style={{flexDirection:"row",justifyContent:'space-around',padding:20}}>
                <View style={{flex:1,alignItems:"center",justifyContent:"center",marginLeft:10,marginRight:30}}>
                    <Text>Total Penalty</Text>
                    <Image style={{height:30,width:30}} resizeMode='contain' source={require("./assets/icons/coins.png")}/>
                    <Text style={{fontSize:35}}>20</Text>
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                    <View style={{elevation:20,backgroundColor:"rbga(127,127,127,0.6)",borderRadius:130/2}}>
                        <Image style={{height:130,width:130}} resizeMode='contain' source={require("./assets/icons/man.png")}/>
                    </View>
                    <Text style={{fontSize:20}}>{user.name}</Text>
                    <Text style={{fontSize:10}}>{user.aadhar}</Text>
                </View>
                <View style={{flex:1,alignItems:"center",justifyContent:"center",marginLeft:30,marginRight:10}}>
                    <Text>Total Reads</Text>
                    <Image style={{height:30,width:30}} resizeMode='contain' source={require("./assets/icons/book_pile.png")}/>
                    <Text style={{fontSize:35}}>44</Text>
                </View>
           </View>
           <View style={{backgroundColor:'rgba(141, 16, 122,0.8)',padding:10,margin:20,borderRadius:20}}>
                <View style={{borderBottomWidth:1,borderColor:'rgba(127,127,127,0.7)',paddingLeft:20,paddingRight:20,paddingBottom:10,borderRadius:20,marginTop:10}}>
                    <Text style={{color:'white'}}>Full Name : {user.name}</Text>
                </View>
                <View style={{borderBottomWidth:1,borderColor:'rgba(127,127,127,0.7)',paddingTop:10,paddingLeft:20,paddingRight:20,paddingBottom:10,borderRadius:20}}>
                    <Text style={{color:'white'}}>Addrres : {user.address}</Text>
                </View>
                <View style={{borderBottomWidth:1,borderColor:'rgba(127,127,127,0.7)',paddingTop:10,paddingLeft:20,paddingRight:20,paddingBottom:10,borderRadius:20}}>
                    <Text style={{color:'white'}}>Adhaar No : {user.aadhar}</Text>
                </View>

                <View style={{borderBottomWidth:1,borderColor:'rgba(127,127,127,0.7)',paddingTop:10,paddingLeft:20,paddingRight:20,paddingBottom:10,borderRadius:20}}>
                    <Text style={{marginBottom:10,color:'white'}}>Primary Ph no : {user.pri_mob}</Text>
                    <Text style={{color:'white'}}>Secondary Ph no : {user.sec_mob}</Text>
                </View>

               <TouchableOpacity style={{backgroundColor:'#3BEA9B',height:60,width:60,marginTop:20,marginRight:10,justifyContent:"center",alignItems:'center',alignSelf:'flex-end',borderRadius:60/2}}>
                    <Text>Edit</Text>
               </TouchableOpacity>

           </View>
            <View style={{margin:20,borderRadius:30,backgroundColor:'rgba(7, 49, 30,0.8)',padding:20}}>
                <Text style={{textAlign:'center',fontSize:30,color:'#B6C6BF'}}>Reviews</Text>
                <TouchableOpacity onPress={()=>navigator.navigate("My Reviews")} style={{backgroundColor:'rgba(244, 205, 8,0.9)',borderRadius:30,padding:30,margin:10}}>
                    <Text style={{textAlign:'center',fontSize:18}}>See my Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigator.navigate("Add Review")} style={{backgroundColor:'rgba(116, 244, 8,0.9)',borderRadius:30,padding:30,margin:10}}>
                    <Text style={{textAlign:'center',fontSize:18}}>Add Reviews</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={()=>navigator.navigate("Wishlist")} style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgba(8, 211, 244,0.8)',margin:20,borderRadius:30,padding:20}}>
                    <View style={{alignSelf:'center'}}>
                        <Text style={{color:'#3E363D',fontSize:20}}>My Wishlist</Text>
                    </View>
                    <View style={{alignSelf:'center'}}>
                       <Image style={{width:60,height:60}}source={require('./assets/icons/heart.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
           <View style={{flex:1,margin:20}}>
                <Text style={{textAlign:'center',margin:20}}>My Reads</Text>
                <ScrollView horizontal={true}>
                    <View style={{backgroundColor:'white'}}>
                        <Table borderStyle={{borderWidth:1,borderColor:'black'}}>
                            <Row data={['#','Book','Issue Date','Retrun Date','Penalty']} widthArr={[20,120,80,80,50]} style={{height:50,backgroundColor:'#537791',fontWeight:"bold"}} textStyle={{textAlign:'center'}}/>
                        </Table>
                        <ScrollView>
                            <Table borderStyle={{borderWidth:1,borderColor:'black'}}>
                                {tableData.map((rowData,index)=>(
                                    <Row key={index}
                                         data={[index+1,...rowData]}
                                         widthArr={[20,120,80,80,50]}
                                         textStyle={{textAlign:'center',fontWeight:'100'}}
                                    />
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
           </View>
        </ScrollView>
        </ImageBackground>

    )
}

export default Profile;