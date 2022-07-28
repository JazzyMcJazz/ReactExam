import {Image, StyleSheet, View} from "react-native";

export default function Logo() {

    return (
        <Image style={styles.logo} source={require('../../assets/logo.png')}/>
    )
}

const styles = StyleSheet.create({

    logo: {
        margin: 20
    },
})