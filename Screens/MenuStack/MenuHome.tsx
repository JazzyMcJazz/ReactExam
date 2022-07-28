import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {logout} from "../../Redux/Actions/UserActions";
import Avatar from "../../Components/Avatar/Avatar";
import MediumButton from "../../Components/Buttons/MediumButton";
import {Divider} from "@rneui/themed";
import SwitchCard from "../../Components/SwitchCards/SwitchCard";
import LargeWhiteButton from "../../Components/Buttons/LargeWhiteButton";
import Separator from "../../Components/Separator/Separator";

export default function MenuHome(props: any) {

    const navigation = props.navigation;
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector(state => state.user.loggedInUser)
    const [chatChecked, setChatChecked] = useState(true);
    const [eventChecked, setEventChecked] = useState(false);



    const handleChatSwitch = (value: boolean) => {
        setChatChecked(value)
        // logic
    }

    const handleEventSwitch = (value: boolean) => {
        setEventChecked(value)
        // logic
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.accountInfoContainer}>
                <Avatar source={user.imageUrl} size={70}/>
                <View style={styles.accountInfo}>
                    <Text style={styles.displayName}>{user.displayName}</Text>
                    <View style={styles.infoWrap}>
                        <Text style={styles.info}>{user.email}</Text>
                    </View>
                    <View style={styles.infoWrap}>
                        <Text style={styles.info}>{user.studyProgramme}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <MediumButton
                    title={'Edit profile'}
                    onPress={() => navigation.push('EditProfile')}
                />
            </View>
            <Divider style={{margin: 19}} color={'#AAAAAA'}/>
            <View style={styles.notificationsContainer}>
                <Text style={styles.notificationsTitle}>NOTIFICATIONS</Text>
                <Separator height={20}/>
                <SwitchCard
                    title={'Chat'}
                    subtitle={'When you receive a new message'}
                    checked={chatChecked}
                    callback={handleChatSwitch}
                />
                <Separator height={24}/>
                <SwitchCard
                    title={'Event reminder'}
                    subtitle={'An hour before events you are \'going to\''}
                    checked={eventChecked}
                    callback={handleEventSwitch}
                />
            </View>
            <Divider style={{margin: 19}} color={'#AAAAAA'}/>
            <View style={styles.buttonContainer}>
                <LargeWhiteButton
                    title={'LOG OUT'}
                    onPress={handleLogout}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#F5F5F5',
        flexDirection: 'column',
    },

    accountInfoContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 19,
        marginRight: 19,
        marginBottom: 17
    },

    accountInfo: {
        marginLeft: 19,
        flexDirection: 'column',
        width: '90%'
    },

    displayName: {
        fontFamily: 'Teko_500Medium',
        fontSize: 26,
        color: '#32305D'
    },

    infoWrap: {
        flexDirection: 'row',
        width: '100%'
    },

    info: {
        color: '#333333',
        marginBottom: 7,
    },

    buttonContainer: {
        margin: 19
    },

    notificationsContainer: {
        margin: 19,

    },

    notificationsTitle: {
        color: '#32305D',
        fontSize: 26,
        fontFamily: 'Teko_500Medium'
    }
})