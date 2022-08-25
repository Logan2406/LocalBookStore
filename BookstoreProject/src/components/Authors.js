import {View,Text,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
const Authors = () =>
{
    const navigator = useNavigation()

    return(
        <View style={{margin:20,backgroundColor:'rgba(16,68,75,0.8)',padding:20,borderRadius:10,borderWidth:2,borderColor:'#BAC0C1'}}>
            <Text style={{color:'white',textAlign:'center',marginBottom:20}}>Auhtor's Section</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{flex:2,marginRight:20,color:'white'}}>We have a collection of 100 Authors adadad adadgaudga audaurdtaud faud uayyfduaydu </Text>
                <TouchableOpacity onPress={()=>navigator.navigate("Authors")} style={{flex:1,borderRadius:20,backgroundColor:'rgba(127,246,127,0.7)',alignItems:'center',justifyContent:'center'}}>
                    <Text>View All Authors</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Authors