import {Image, StyleSheet, View} from "react-native";
import {Icon} from "@rneui/themed";

export default function Avatar(props: any) {

    return (
        <View style={{
            justifyContent: 'center',
            width: props.size,
            height: props.size,
            borderColor: '#dddddd',
            borderWidth: 1,
            borderRadius: props.size,
            overflow: "hidden"

        }}>
            { props.source ?
                <Image style={styles.image} source={{uri: props.source}}/>
                :
                <Icon
                    type={'material'}
                    name={'person'}
                    size={props.size + 20}
                    iconStyle={{
                        color: '#dddddd',
                        right: 10,
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({

    imagePlaceholder: {
        color: '#dddddd',
        right: 10,
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
    },
})