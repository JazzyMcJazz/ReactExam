import {Icon, ListItem} from "@rneui/themed";
import {useState} from "react";
import {StyleSheet} from "react-native";

export default function SPAccordion(props : any) {

    const [expanded, setExpanded] = useState(false);

    return (
        <ListItem.Accordion
            containerStyle={styles.container}
            content={
                <>
                    <ListItem.Content style={styles.title}>
                        <ListItem.Title style={styles.title}>{props.data.title}</ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
            icon={<Icon name={'chevron-down'} type="material-community" color={'white'}/>}
        >
            {props.data.categories.map((l: any, i: any) => {
                const [expanded, setExpanded] = useState(false);
                return (
                    <ListItem.Accordion
                        containerStyle={styles.itemContainer}
                        key={i+1000}
                        content={
                            <>
                                <ListItem.Content>
                                    <ListItem.Title>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded}
                        onPress={() => setExpanded(!expanded)}
                        bottomDivider
                    >
                        {l.programmes.map((l:any, i:any) => {
                            const [checked, setChecked] = useState(false);
                            return (
                                <ListItem
                                    key={i+10000}
                                    bottomDivider
                                    onPress={() => {
                                        setChecked(!checked)
                                        props.setProgramme(l);
                                    }}
                                    containerStyle={styles.item}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{l}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.CheckBox
                                        key={i}
                                        checked={checked}
                                        checkedIcon={
                                            <Icon
                                                name="check-circle"
                                                type="material"
                                                color="#32305D"
                                                size={30}
                                            />
                                        }
                                        uncheckedIcon={
                                            <Icon
                                                name="radio-button-unchecked"
                                                type="material"
                                                color="#32305D"
                                                size={30}
                                            />
                                        }
                                        onPress={() => {
                                            setChecked(!checked)
                                            props.setProgramme(l);
                                        }}
                                    />

                                </ListItem>
                            )
                        })}
                </ListItem.Accordion>
            )})}

        </ListItem.Accordion>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1
    },

    title: {
        color: 'white',
        fontWeight: 'bold'
    },

    itemContainer: {
        backgroundColor: '#f5f5f5',
    },

    item: {
        // padding: 0
    }
})