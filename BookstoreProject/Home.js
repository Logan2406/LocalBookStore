import { ScrollView,Text,ImageBackground,Image, Dimensions } from "react-native"
import CurrentReading from "./src/components/CurrentReading";
import BooksRead from "./src/components/BooksRead";
import PeopleChoice from "./src/components/PeopleChoice";
import Authors from "./src/components/Authors";
import NewArrivals from "./src/components/NewArrivals";
const Home = () =>
{
    return(
       
        <ImageBackground resizeMode="cover" source={require("./assets/homebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
        <ScrollView style={{flex:1,alignContent:"center",marginBottom:160}}>
          
            <CurrentReading/>
            <BooksRead/>
            <PeopleChoice/>
            <Authors/>
       
        </ScrollView>
        </ImageBackground>
    )
}

export default Home;