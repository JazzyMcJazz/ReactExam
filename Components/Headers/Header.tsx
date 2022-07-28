import {StyleSheet, Text, View} from "react-native";

export default function Header(props: any) {


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {


    },

    title: {
        fontSize: 26,
        color: '#5050A5',
        fontFamily: 'Teko_500Medium',
    }

});