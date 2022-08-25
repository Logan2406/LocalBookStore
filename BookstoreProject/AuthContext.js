import {createContext,useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>
{
    const [userDet,setUserDet] = useState({name:'',id:'',accTok:'',auth:false});
    const [isLoading,setIsLoading] = useState(true);


    const login = async(user) =>
    {
        setIsLoading(true)
        let error = "";
        let response = await axios.post('http://10.0.2.2:5000/login',{username:user.name,password:user.pass}).then(data=>data.data).catch(err=>(error=err));
        
        if(error==="")
        {
            setUserDet({...userDet,name:response.name,id:response.id,accTok:response.accTok,auth:true});
            await AsyncStorage.setItem('data',JSON.stringify(response))
        }
        else
        {

        }
        setIsLoading(false) 
    }

    const logout = async() =>
    {
        setIsLoading(true)
       
        let error=""
        let response = await axios.get('http://10.0.2.2:5000/logout', {
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data).catch(err=>(error=err));
        if(error==="")
        {
            await AsyncStorage.removeItem('data')
            setUserDet({...userDet,name:'',id:'',accTok:'',auth:false})
        }
        else
        {
            await AsyncStorage.removeItem('data')
            setUserDet({...userDet,name:'',id:'',accTok:'',auth:false})
        }
        setIsLoading(false);
    }


    const isLoggedIn = async() =>
    {
        try{
            setIsLoading(true)
            let data = await AsyncStorage.getItem('data')
            if(data!=null || data!=undefined)
            {
                setUserDet({...userDet,...JSON.parse(data),auth:true});
            }
            else
            {
                setUserDet({...userDet,auth:false})
            }
           
            setIsLoading(false);
        }
        catch(e)
        {
            console.log(e)
        }
    }

    useEffect(()=>
    {   
        isLoggedIn()
    },[])

    return(
        <AuthContext.Provider value={{login,logout,setUserDet,isLoading,userDet}}>
            {children}
        </AuthContext.Provider>
    )
}

