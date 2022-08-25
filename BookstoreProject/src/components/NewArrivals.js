import { View,Text,Image } from "react-native";

const NewArrivals = () =>
{
    return(
        <View style={{borderColor:"rgb(92, 214, 184)",
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        borderWidth:2,
        margin:15,
        backgroundColor:'rgba(92, 214, 184, 0.7)'}}>
            <Text>New Arrivals</Text>
        </View>
    )
}

export default NewArrivals;