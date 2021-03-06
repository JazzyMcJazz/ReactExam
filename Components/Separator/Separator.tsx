import {View} from "react-native";

export default function Separator(props : any) {

    return (
        <View style={{
            height: props.height,
            width: props.width,
            borderTopWidth: props.borderTopWidth,
            borderTopColor: props.borderTopColor,
            borderBottomWidth: props.borderBottomWidth,
            borderBottomColor: props.borderBottomColor,
        }}/>
    )
}