import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import Text from "../../Components/Text";
import {FontAwesome} from "@expo/vector-icons";
export default function CustomTitleSensor({props}){
    const route = useRoute();
    const navigation = useNavigation();
    const name = route.params.name;

    const styles = {
        title : {
            fontSize: 18,
            fontWeight: "bold"
        }
    };
    return (
        <Text style={styles.title}>{name}</Text>
    )
}