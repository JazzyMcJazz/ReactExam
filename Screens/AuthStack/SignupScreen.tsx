import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Card, CheckBox, Icon} from "@rneui/themed";
import {useEffect, useRef, useState} from "react";
import {StackActions, useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useDispatch} from "react-redux";
import {login} from "../../Redux/Actions/UserActions";
import LargeButton from "../../Components/Buttons/LargeButton";
import Logo from "../../Components/Logo/Logo";

export default function SignupScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [TOCCheck, setTOCCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!TOCCheck || email === '' || password === '' || repeatPassword === ''  || !passwordsMatch && !isDisabled)
            setIsDisabled(true);
        else if (TOCCheck && email !== '' && password !== '' && repeatPassword !== '' && passwordsMatch && isDisabled)
            setIsDisabled(false);

        if (password === repeatPassword)
            setPasswordsMatch(true);
        else
            setPasswordsMatch(false);
    });

    const handleSignup = () => {

        setIsLoading(true);

        setTimeout(async () => {
            const data = await dispatch(login(email, password, true));

            if (data.error) {
                console.log(data);
                if (data.error.message.includes('WEAK_PASSWORD')) {
                    setErrorMsg('Password too weak');
                    setIsError(true);

                } else if (data.error.message.includes('INVALID_EMAIL')) {
                    setErrorMsg('Invalid email');
                    setIsError(true);
                } else if (data.error.message.includes('EMAIL_EXISTS')) {
                    setErrorMsg('Email address already in use');
                    setIsError(true);
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
                    <Text style={styles.title}>Sign up to get access</Text>
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
                            onChangeText={value => {setPassword(value); setIsError(false)}}
                            returnKeyType={'next'}
                            ref={passwordRef}
                            onSubmitEditing={() => repeatPasswordRef.current.focus()}
                            textContentType={'newPassword'}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <Card.Divider/>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>REPEAT PASSWORD</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.textInput}
                            value={repeatPassword}
                            onChangeText={value => {setRepeatPassword(value); setIsError(false)}}
                            returnKeyType={'go'}
                            ref={repeatPasswordRef}
                            textContentType={'newPassword'}
                            autoCapitalize={'none'}
                        />
                    </View>
                    { passwordsMatch ? <></> : <Card.Divider/>}
                    { passwordsMatch ?
                        <></>
                        :
                        <View style={styles.errorContainer}>
                            <Icon name={'cancel'} color={'#b10024'}/>
                            <Text style={styles.error}>Passwords don't match</Text>
                        </View>
                    }
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
                <View style={styles.termsContainer}>
                    <CheckBox
                        checked={TOCCheck}
                        checkedColor={'#5050A5'}
                        uncheckedColor={'#5050A5'}
                        onPress={() => setTOCCheck(!TOCCheck)}
                    />
                    <Text style={{color: '#5050A5'}}>I agree to the </Text>
                    <Text style={{textDecorationLine: 'underline', color: '#5050A5'}}>terms and conditions</Text>
                </View>
                <LargeButton
                    title={'Get acces'}
                    loading={isLoading}
                    disabled={isDisabled}
                    onPress={handleSignup}
                />
                <View style={styles.loginContainer}>
                    <Text style={{color: '#5050A5'}}>Already have a user? </Text>
                    <Text
                        style={styles.loginLink}
                        onPress={() => navigation.dispatch(StackActions.replace('Log In'))}>
                        Log in
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
        paddingRight: '5%'
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
        color: '#32305D',
        fontFamily: 'Teko_500Medium',
        fontSize: 26,
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
        color: '#32305D'
    },

    inputTitle: {
        color: '#32305D',
        fontWeight: 'bold',
    },

    textInput: {
        color: '#32305D',
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

    termsContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    buttonContainer: {
        width: '100%',
        marginLeft: '10%',
    },

    button: {
        backgroundColor: '#5050A5',
        borderRadius: 8,
        justifyContent: 'flex-start',
        padding: 20,
        width: '90%',
    },

    loginContainer: {
        marginTop: 30,
        flexDirection: "row",
        color: '#5050A5'
    },

    loginLink: {
        fontWeight: 'bold',
        color: '#5050A5'
    }
})