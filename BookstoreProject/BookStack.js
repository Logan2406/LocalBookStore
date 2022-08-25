import { createStackNavigator } from '@react-navigation/stack';
import Books from './Books';
import SearchBook from './src/components/SearchBook';
import BookInfo from './src/components/BookInfo';
import GenreBooks from './src/components/GenreBooks';
import ReviewsForBook from './src/components/ReviewsForBook';

const BookStack = () =>
{
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator>
            <Stack.Screen name="Book" component={Books} />
            <Stack.Screen name="BookGenre" component={GenreBooks} />
            <Stack.Screen name="SearchBook" component={SearchBook} />
            <Stack.Screen name="BookInfo" component={BookInfo}/>
            <Stack.Screen name="BookReview" component={ReviewsForBook}/>
        </Stack.Navigator>
    )
}

export default BookStack;