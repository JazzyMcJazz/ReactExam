import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import MediumButton from "../Buttons/MediumButton";
import {Icon} from "@rneui/themed";
import Separator from "../Separator/Separator";
import SPAccordion from "../StudyProgrammes/SPAccordion";
import {useState} from "react";
import dummyData from "./DummyData";

export default function StudyProgrammePicker(props : any) {

    const [programme, setProgramme] = useState('');

    const data = dummyData;

    return (
        <View style={styles.container}>
            <Separator height={10}/>
            <View
                style={styles.titleContainer}
            >
                <Text></Text>
                <Text style={styles.title}>STUDY PROGRAMME</Text>
                <TouchableOpacity style={styles.close} onPress={props.close}>
                    <Icon name={'close'}/>
                </TouchableOpacity>
            </View>
            <Separator height={30} borderBottomWidth={1} borderBottomColor={'#f5f5f5'}/>
            <ScrollView style={styles.scrollView}>
                {data.map((l, i) =>
                    <SPAccordion
                        key={i}
                        data={l}
                        setProgramme={setProgramme}
                    />
                )}
            </ScrollView>
            <Separator height={30} borderTopWidth={1} borderTopColor={'#f5f5f5'}/>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <MediumButton
                        title={'OK'}
                        onPress={() => props.ok(programme)}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '90%',
    },

    titleContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25,

    },

    title: {
        color: '#5050A5',
        fontSize: 26,
        fontFamily: 'Teko_500Medium'
    },

    close: {
        backgroundColor: '#eeeeee',
        padding: 6,
        borderRadius: 100
    },

    scrollView: {

    },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },

    button: {
        width: 160,
        marginBottom: -35
    }

});