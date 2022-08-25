import { createStackNavigator } from '@react-navigation/stack';
import MyWishlist from './src/components/MyWishlist';
import AddReview from './src/components/AddReview';
import MyReviews from './src/components/MyReviews';
import Profile from './Profile';
const ProfileStack =() =>
{
    const Stack = createStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Wishlist" component={MyWishlist}/>
            <Stack.Screen name="Add Review" component={AddReview}/>
            <Stack.Screen name="My Reviews" component={MyReviews}/>
        </Stack.Navigator>
    )
}

export default ProfileStack