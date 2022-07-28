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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#F5F5F5',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})