import {Provider, useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import stores from "./Redux/store";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeStack/HomeScreen";
import SignupScreen from "./Screens/AuthStack/SignupScreen";
import LoginScreen from "./Screens/AuthStack/LoginScreen";
import {ActivityIndicator, StatusBar, View} from "react-native";
import {restore_auth} from "./Redux/Actions/UserActions";
import BeforeStartScreen from "./Screens/BeforeStartStack/BeforeStartScreen";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export default function AppContainer() {

  return (
      <ActionSheetProvider>
        <Provider store={stores}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
            <App/>
        </Provider>
      </ActionSheetProvider>
  );
}

function App() {
    const dispatch = useDispatch();

    // @ts-ignore
    const user = useSelector(state => state.user);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasDisplayName, setHasDisplayName] = useState(false);

    useEffect(() => {
        if (user.loggedInUser.displayName)
            setHasDisplayName(true);
        else
            setHasDisplayName(true);

        if (isSignedIn && !user.isAuthenticated) {
            setIsLoading(true);
            setIsSignedIn(user.isAuthenticated);
            setTimeout(() => setIsLoading(false), 1000);
        } else
            setIsSignedIn(user.isAuthenticated);
    })

    // only called once
    useEffect(() => {
        dispatch(restore_auth())
        setTimeout(() => setIsLoading(false), 1000)
    }, [])

    if (isLoading)
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator/>
            </View>
        );

    return isSignedIn ? (
        <NavigationContainer>
            { hasDisplayName ?
                <Tab.Navigator>
                    <Tab.Screen options={{headerShown: false}} name={'Home'} component={HomeStack}/>
                </Tab.Navigator>
                :
                <BeforeStartStack/>
            }

        </NavigationContainer>
    ) : (
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    );
}

function AuthStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={'Sign Up'} component={SignupScreen}/>
            <Stack.Screen options={{headerShown: false}} name={'Log In'} component={LoginScreen}/>
        </Stack.Navigator>
    );
}

function HomeStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={'HomeScreen'} component={HomeScreen}/>
        </Stack.Navigator>
    )
}

function BeforeStartStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={'BeforeStart'} component={BeforeStartScreen}/>
        </Stack.Navigator>
    )
}

