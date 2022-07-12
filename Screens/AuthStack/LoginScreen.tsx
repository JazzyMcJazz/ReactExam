import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Card, Icon} from "@rneui/themed";
import {useEffect, useRef, useState} from "react";
import {StackActions, useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {login} from "../../Redux/Actions/UserActions";
import {useDispatch} from "react-redux";
import LargeButton from "../../Components/Buttons/LargeButton";
import Separator from "../../Components/Separator/Separator";
import Logo from "../../Components/Logo/Logo";

export default function LoginScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const passwordRef = useRef();

    const [email, setEmail] = useState('bob@email.com');
    const [password, setPassword] = useState('123456');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (email === '' || password === '' && !isDisabled)
            setIsDisabled(true);
        else if (email !== '' && password !== '' && isDisabled)
            setIsDisabled(false);
    });

    const handleLogin = () => {

        setIsLoading(true);

        setTimeout(async () => {
            const data = await dispatch(login(email, password));

            if (data.error) {
                if (data.error.code === 400) {
                    setIsError(true);
                    setErrorMsg('Wrong email or password');
                }

                setIsLoading(false);
            }
        }, 500);
    }

    return (

        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
                <Logo/>
                <View style={styles.titleContainer}>
                    <Image style={styles.title} source={require('../../assets/login-title.png')}/>
                </View>
                <Card containerStyle={styles.card}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>E-MAIL</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={value => {setEmail(value); setIsError(false)}}
                            value={email}
                            keyboardType={'email-address'}
                            returnKeyType={'next'}
                            onSubmitEditing={() => passwordRef.current.focus()}
                            textContentType={'username'}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <Card.Divider/>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>PASSWORD</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.textInput}
                            value={password}
                            onChangeText={setPassword}
                            returnKeyType={'go'}
                            ref={passwordRef}
                            textContentType={'password'}
                            autoCapitalize={'none'}
                        />
                    </View>
                    { isError ? <Card.Divider/> : <></>}
                    { isError ?
                        <View style={styles.errorContainer}>
                            <Icon name={'cancel'} color={'#b10024'}/>
                            <Text style={styles.error}>{errorMsg}</Text>
                        </View>
                        :
                        <></>
                    }
                </Card>
                <Separator height={70}/>
                <LargeButton
                    title={'Log in'}
                    loading={isLoading}
                    disabled={isDisabled}
                    onPress={handleLogin}

                />
                <View style={styles.signupContainer}>
                    <Text style={{color: '#32305d'}}>Don't have an account? </Text>
                    <Text
                        style={styles.signupLink}
                        onPress={() => navigation.dispatch(StackActions.replace('Sign Up'))}>
                        Sign up
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingLeft: '5%',
        paddingRight: '5%',
    },

    scrollView: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },

    titleContainer: {
        width: '100%',
        justifyContent: 'flex-start',
    },

    title: {
        resizeMode: 'contain',
        width: '20%',
    },

    card: {
        width: '100%',
        padding: 0,
        paddingTop: 10,
        borderRadius: 5,
        elevation: 2,
    },

    inputContainer: {
        width: '100%',
        paddingLeft: 10,
    },

    inputTitle: {
        color: '#32305d',
        fontWeight: 'bold',
    },

    textInput: {
        color: '#32305d'
    },

    errorContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },

    error: {
        color: '#b10024',
        fontWeight: 'bold',
        marginLeft: 10,
    },

    button: {
        marginTop: 70,
    },

    signupContainer: {
        marginTop: 30,
        flexDirection: "row",
        color: '#32305d',
    },

    signupLink: {
        fontWeight: 'bold',
        color: '#32305d'
    }
});