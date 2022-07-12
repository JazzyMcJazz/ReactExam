import {View, Text, StyleSheet, Button} from "react-native";
import {useDispatch} from "react-redux";
import {logout} from "../../Redux/Actions/UserActions";

export default function HomeScreen() {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button
                title={'Logout'}
                onPress={handleLogout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
})