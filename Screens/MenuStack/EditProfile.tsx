import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Logo from "../../Components/Logo/Logo";
import MediumButton from "../../Components/Buttons/MediumButton";
import {useEffect, useState} from "react";
import {Card, Icon, Overlay} from "@rneui/themed";
import Separator from "../../Components/Separator/Separator";
import * as ImagePicker from 'expo-image-picker';
import {ImageInfo, ImagePickerOptions} from 'expo-image-picker';
import {connectActionSheet, useActionSheet} from '@expo/react-native-action-sheet';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import LargeButton from "../../Components/Buttons/LargeButton";
import StudyProgrammePicker from "../../Components/Pickers/StudyProgrammePicker";
import {useDispatch, useSelector} from "react-redux";
import {update_user} from "../../Redux/Actions/UserActions";

export default connectActionSheet(EditProfile)

function EditProfile(props: any) {

    // @ts-ignore
    const user = useSelector(state => state.user.loggedInUser);
    const dispatch = useDispatch();

    const { showActionSheetWithOptions } = useActionSheet();

    const [image, setImage] = useState(user.imageUrl);
    const [name, setName] = useState(user.displayName);
    const [studyProgramme, setStudyProgramme] = useState(user.studyProgramme);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleStudyProgrammePicker = (programme : string) => {
        setStudyProgramme(programme);
        setVisible(!visible)
    }

    const handleUpload = async () => {

        const options = ['Take photo', 'Choose photo', 'Cancel'];
        const destructiveButtonIndex = 2;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
                options,
                cancelButtonIndex,
                destructiveButtonIndex,

            }, (async buttonIndex => {
                let imgData;

                switch (buttonIndex) {
                    case 0:
                        imgData = await pickPhoto(0);
                        break;
                    case 1:
                        imgData = await pickPhoto(1);
                        break;
                    default:
                        return;
                }

                if (!imgData.cancelled) {
                    setImage(imgData.uri);
                }
            })
        );
    }

    const pickPhoto = async (index : number) => {

        const options : ImagePickerOptions = {
            allowsEditing: true,
            aspect: [3, 4],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }

        if (index === 0)
            return await ImagePicker.launchCameraAsync(options);
        else
            return await ImagePicker.launchImageLibraryAsync(options);
    }

    const handleSave = () => {
        setLoading(true);
        setTimeout(async () => {
            await dispatch(update_user(user, name.trim(), studyProgramme, image ? image : undefined));
            setLoading(false);
            props.navigation.pop();
        }, 500);
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
                <Separator height={20}/>
                <View style={styles.profilePicContainer}>
                    <View style={styles.uploadContainer}>
                        <Text style={styles.profilePictureText}>PROFILE PICTURE</Text>
                        <Separator height={10}/>
                        <MediumButton
                            title={'Upload'}
                            onPress={handleUpload}
                        />
                    </View>
                    <View style={styles.imageContainer}>
                        { image ?
                            <View style={styles.imageBorder}>
                                <Image style={styles.image} source={{uri: image}}/>
                            </View>
                            :
                            <Icon
                                type={'material'}
                                name={'person'}
                                size={140}
                                iconStyle={styles.imagePlaceholder}
                            />
                        }
                    </View>
                </View>
                <Separator height={20}/>
                <Card containerStyle={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>WHAT IS YOUR NAME?</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={value => setName(value)}
                            value={name}
                            placeholder={'First name and last name'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            textContentType={'name'}
                            autoCapitalize={'words'}
                            placeholderTextColor={'#bbbbdd'}
                        />
                    </View>
                </Card>
                <Card containerStyle={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>STUDY PROGRAMME</Text>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            {studyProgramme
                                ?
                                <Text style={styles.textInput}>{studyProgramme}</Text>
                                :
                                <Text style={styles.selectFromList}>Select from list</Text>
                            }

                        </TouchableOpacity>
                    </View>
                </Card>
                <Separator height={20}/>
                <LargeButton
                    title={'Save changes'}
                    onPress={handleSave}
                    loading={loading}
                />
                <Overlay overlayStyle={styles.overlay} isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                    <StudyProgrammePicker
                        ok={handleStudyProgrammePicker}
                        close={() => setVisible(!visible)}
                    />
                </Overlay>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
    },

    scrollView: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
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

    profilePicContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    uploadContainer: {
        width: '50%',
        flexDirection: "column",
        justifyContent: "flex-start"
    },

    profilePictureText: {
        color: '#32305D',
        fontWeight: 'bold'
    },

    imageContainer: {
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderColor: '#dddddd',
        borderWidth: 1,
        borderRadius: 60,
        overflow: "hidden"
    },

    imagePlaceholder: {
        color: '#dddddd',
        right: 10,
    },

    imageBorder: {
        width: '100%',
        height: '100%',
        borderColor: 'white',
        borderRadius: 60,
        borderWidth: 5,
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
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
        color: '#32305D',
        fontWeight: 'bold',
    },

    textInput: {
        color: '#32305D',
        paddingTop: 5,
        paddingBottom: 5,
    },

    selectFromList: {
        color: '#bbbbdd',
        paddingTop: 5,
        paddingBottom: 5
    },

    overlay: {
        width: '90%',
        borderRadius: 20,
        padding: 0
    }
});