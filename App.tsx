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
import {Teko_500Medium, useFonts} from "@expo-google-fonts/dev";
import Header from "./Components/Headers/Header";
import {Icon} from "@rneui/themed";
import MenuHome from "./Screens/MenuStack/MenuHome";
import EditProfile from "./Screens/MenuStack/EditProfile";

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

    let   [fontsLoaded] = useFonts({
        Teko_500Medium,
    });

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasDisplayName, setHasDisplayName] = useState(false);

    useEffect(() => {
        if (user.loggedInUser.displayName)
            setHasDisplayName(true);
        else
            setHasDisplayName(false);

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

    if (isLoading || !fontsLoaded)
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator/>
            </View>
        );

    else return isSignedIn ? (
        <NavigationContainer>
            { hasDisplayName ?
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: { height: 70, paddingTop: 10, paddingBottom: 10 }
                    }}
                >
                    <Tab.Screen
                        name={'HOME'}
                        component={HomeStack}
                        options={{
                            headerShown: false,
                            tabBarActiveTintColor: '#5050A5',
                            tabBarInactiveTintColor: '#707070',
                            tabBarLabelStyle: {fontFamily: 'Teko_500Medium', fontSize: 16},
                            tabBarIcon: ({color, size}) => <Icon name={'home'} color={color} size={size}/>,
                        }}
                    />
                    <Tab.Screen
                        name={'DISCOVER'}
                        component={DiscoverStack}
                        options={{
                            headerShown: false,
                            tabBarActiveTintColor: '#5050A5',
                            tabBarInactiveTintColor: '#707070',
                            tabBarLabelStyle: {fontFamily: 'Teko_500Medium', fontSize: 16},
                            tabBarIcon: ({color, size}) => <Icon name={'search'} color={color} size={size}/>,
                        }}
                    />
                    <Tab.Screen
                        name={'CHAT'}
                        component={ChatStack}
                        options={{
                            headerShown: false,
                            tabBarActiveTintColor: '#5050A5',
                            tabBarInactiveTintColor: '#707070',
                            tabBarLabelStyle: {fontFamily: 'Teko_500Medium', fontSize: 16},
                            tabBarIcon: ({color, size}) => <Icon name={'question-answer'} color={color} size={size}/>,
                        }}
                    />
                    <Tab.Screen
                        name={'MENU'}
                        component={MenuStack}
                        options={{
                            headerShown: false,
                            tabBarActiveTintColor: '#5050A5',
                            tabBarInactiveTintColor: '#707070',
                            tabBarLabelStyle: {fontFamily: 'Teko_500Medium', fontSize: 16},
                            tabBarIcon: ({color, size}) => <Icon name={'menu'} color={color} size={size}/>,
                        }}
                    />
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
            <Stack.Screen
                options={{
                    headerTitle: () => <Header title={'FEED'}/>,
                    headerTitleAlign: 'center',
                }}
                name={'HomeScreen'}
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}

function DiscoverStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTitle: () => <Header title={'DISCOVER'}/>,
                    headerTitleAlign: 'center',
                }}
                name={'DiscoverScreen'}
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}

function ChatStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTitle: () => <Header title={'CHAT'}/>,
                    headerTitleAlign: 'center',
                }}
                name={'ChatScreen'}
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}

function MenuStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTitle: () => <Header title={'MENU'}/>,
                    headerTitleAlign: 'center',
                }}
                name={'MenuScreen'}
                component={MenuHome}
            />
            <Stack.Screen
                options={{
                    headerTitle: () => <Header title={'EDIT PROFILE'}/>,
                    headerTitleAlign: 'center',
                }}
                name={'EditProfile'}
                component={EditProfile}
            />
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