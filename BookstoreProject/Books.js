import { useState,useContext } from "react";
import { ScrollView,View,Text,TouchableOpacity,Modal,Button,Image,TextInput,ImageBackground,Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NewArrivals from "./src/components/NewArrivals";
import RomanticSection from "./src/components/RomaticSection";

import { AuthContext } from "./AuthContext";




const Books = () =>
{
    const navigation = useNavigation();
    const [modalVisible,setModalVisible] = useState(false);
    const [searchValue,setSearchValue] = useState("");

    const [languages,setLanguages] = useState({english:false,bengali:false})
    const [genres,setGenres]  = useState({romantic:false,horror:false,kids:false,thriller:false,fantasy:false,mythology:false})

    const {userDet} = useContext(AuthContext)

    const searchRoute =() =>
    {
        setModalVisible(false);
        navigation.navigate("SearchBook",{genres,languages,searchValue})
    }



    const selectLanguage = (language) =>
    {
        if(languages[language]===false)
        {
            setLanguages({...languages,[language]:true});
        }
        else
        {
            setLanguages({...languages,[language]:false});
        }
    }

    const selectGenres = (genre) =>
    {
        if(genres[genre]===false)
        {
            setGenres({...genres,[genre]:true})
        }
        else
        {
            setGenres({...genres,[genre]:false})
        }
    }


    const clickModal = () =>
    {
        setModalVisible(true)
    }

    const closeModal= () =>
    {
        setModalVisible(false)
    }

    const changeSearch = (text) =>
    {
        setSearchValue(text)
    }

    const bookInfo = () =>
    {
        navigation.navigate("BookInfo")
    }

    return(
        <ImageBackground resizeMode="cover" source={require("./assets/homebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
    <View style={{flex:1,marginBottom:160}}>
   
    
    <Modal
        animationType="slide"
        visible={modalVisible}
      >
    <View style={{padding:20}}>
        <Text>Select Language</Text>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{selectLanguage("bengali")}} style={{margin:10,padding:10,backgroundColor:languages.bengali?'aqua':'grey',borderRadius:20}}><Text>Bengali</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{selectLanguage("english")}} style={{margin:10,padding:10,backgroundColor:languages.english?'aqua':'grey',borderRadius:20}}><Text>English</Text></TouchableOpacity>
        </View>
        <Text style={{marginTop:20}}>Select Genre</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <TouchableOpacity onPress={()=>{selectGenres("romantic")}} style={{margin:10,padding:10,backgroundColor:genres.romantic?'aqua':'grey',borderRadius:20}}><Text>Romantic</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{selectGenres("thriller")}} style={{margin:10,padding:10,backgroundColor:genres.thriller?'aqua':'grey',borderRadius:20}}><Text>Thriller</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{selectGenres("mythology")}} style={{margin:10,padding:10,backgroundColor:genres.mythology?'aqua':'grey',borderRadius:20}}><Text>Mythology</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{selectGenres("kids")}} style={{margin:10,padding:10,backgroundColor:genres.kids?'aqua':'grey',borderRadius:20}}><Text>Kids</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{selectGenres("horror")}} style={{margin:10,padding:10,backgroundColor:genres.horror?'aqua':'grey',borderRadius:20}}><Text>Horror</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{selectGenres("fantasy")}} style={{margin:10,padding:10,backgroundColor:genres.fantasy?'aqua':'grey',borderRadius:20}}><Text>Fantasy</Text></TouchableOpacity>
        </View>
    </View>

         <TextInput
            style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius:20}}
            onChangeText={changeSearch}
            value={searchValue}
            placeholder="Search Books"
      />
      <Text>{searchValue}</Text>
        <Button title="Search for Books" onPress={searchRoute}/>
        <Button title="Close Button" onPress={closeModal}/>
      </Modal>
            
        
            
        <TouchableOpacity onPress={clickModal} style={{
                                        position:'absolute',
                                        bottom:15,
                                        right:15,
                                        padding:10,
                                        alignSelf:'flex-end',
                                        zIndex:2,
                                        }}>
            <View style={{}}>
                <Image style={{height:50,width:50,borderColor:"black",borderWidth:2,borderRadius:25}} source={require("./assets/icons/seo.png")}/>
            </View>
            
        </TouchableOpacity>

        <ScrollView>
                <RomanticSection name={'Romantic'}/>
                <RomanticSection name={'Kids'}/>
                <RomanticSection name={'Thriller'}/>
                <RomanticSection name={'Mythology'}/>
                <RomanticSection name={'Horror'}/>
                <RomanticSection name={'Fantasy'}/>                 
        </ScrollView>

        </View>
        </ImageBackground>
    )
}

export default Books;