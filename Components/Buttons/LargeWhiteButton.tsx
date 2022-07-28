import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Card} from "@rneui/themed";

export default function LargeWhiteButton(props : any) {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Card containerStyle={styles.card}>
                <Text style={styles.title}>{props.title}</Text>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    card: {
        elevation: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 26,
        fontFamily: 'Teko_500Medium',
        color: '#32305D',
        paddingTop: 5,
    }

})