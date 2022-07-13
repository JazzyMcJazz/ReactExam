import {Image, StyleSheet, Text, View} from "react-native";
import Logo from "../../Components/Logo/Logo";
import MediumButton from "../../Components/Buttons/MediumButton";
import {useEffect, useState} from "react";
import {Icon} from "@rneui/themed";
import Separator from "../../Components/Separator/Separator";
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerOptions, MediaTypeOptions} from 'expo-image-picker';
import {connectActionSheet, useActionSheet} from '@expo/react-native-action-sheet';

export default connectActionSheet(BeforeStartScreen)

function BeforeStartScreen() {

    const { showActionSheetWithOptions } = useActionSheet();

    const [image, setImage] = useState(null);

    useEffect(() => {
        // const uri = '../../assets/dummy-portrait.png'
        // setImage(require(uri));
    })

    const handleUpload = async () => {

        const options = ['Take photo', 'Choose photo', 'Cancel'];
        const destructiveButtonIndex = 2;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
        },
            (async buttonIndex => {
                let imageData;

                switch (buttonIndex) {
                    case 0:
                        imageData = await pickPhoto(0);
                        break;
                    case 1:
                        imageData = await pickPhoto(1);
                        break;
                    default:
                        return;
                }

                console.log(imageData);
                if (!imageData.cancelled) {
                    const uri : string = imageData.uri;
                    // const req = require(uri);
                    console.log(imageData);
                    // setImage(require(uri))
                }
            }));
    }

    const pickPhoto = async (index : number) => {

        const options : ImagePickerOptions = {
            allowsEditing: true,
            aspect: [3, 4],
            mediaTypes: MediaTypeOptions.Images,
        }

        if (index === 0)
            return await ImagePicker.launchCameraAsync(options);
        else
            return await ImagePicker.launchImageLibraryAsync(options);
    }

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.titleContainer}>
                <Image style={styles.title} source={require('../../assets/before-start-title.png')}/>
            </View>
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
                            <Image style={styles.image} source={image}/>
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
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
       height: '100%',
       width: '100%',
       backgroundColor: 'white',
       flexDirection: 'column',
       alignItems: 'center',
       paddingLeft: '5%',
       paddingRight: '5%',
   },

    titleContainer: {
        width: '100%',
        justifyContent: 'flex-start',
    },

    title: {
        resizeMode: 'contain',
        width: '55%',
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
       color: '#32305d',
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
        resizeMode: 'repeat',
        borderRadius: 50,
    }
});