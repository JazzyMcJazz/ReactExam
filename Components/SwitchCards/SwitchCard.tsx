import {Card, Switch} from "@rneui/themed";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";

export default function SwitchCard(props: any) {

    return (
        <Card containerStyle={styles.card}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.subtitle}>{props.subtitle}</Text>
                </View>
                <Switch
                    value={props.checked}
                    onValueChange={(value) => props.callback(value)}
                    thumbColor={props.checked ? '#5050A5' : '#F5F5F5'}
                    color={props.checked ? '#BABADD' : '#AAAAAA'}
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({

    card: {
        elevation: 2,
        borderRadius: 5,
        margin: 0
    },

    container: {
       flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    titleContainer: {
    },

    title: {
        fontWeight: 'bold',
        fontSize: 16
    },

    subtitle: {
        fontSize: 12,
        color: '#707070',
    },
});