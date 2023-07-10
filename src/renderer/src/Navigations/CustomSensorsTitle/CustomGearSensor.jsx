import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";
import {color} from "../../assets/styles/style";
import {UserContext} from "../../Context/UserContext";
export default function CustomTitleSensor({props}){
    const route = useRoute();
    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const navigation = useNavigation();
    const id = route.params.id;

    const styles = {
        gear : {
            marginEnd: 5
        }
    };
    return (
        <TouchableOpacity onPress={() => navigation.navigate('EditSensor', {id : 2})}>
            <FontAwesome name="gear" color={color[mode].text} size={24} />
        </TouchableOpacity>
    )
}