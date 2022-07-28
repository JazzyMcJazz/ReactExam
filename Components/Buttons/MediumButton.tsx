import {StyleSheet, View} from "react-native";
import {Button} from "@rneui/themed";

export default function MediumButton(props : any) {

    return (
        <View style={styles.buttonContainer}>
            <Button
                title={props.title}
                buttonStyle={styles.button}
                loading={props.loading}
                disabled={props.disabled}
                onPress={props.onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        marginTop: 0,
    },

    button: {
        backgroundColor: '#5050A5',
        borderRadius: 8,
        justifyContent: 'center',
        padding: 10,
        width: '100%',
    },
})