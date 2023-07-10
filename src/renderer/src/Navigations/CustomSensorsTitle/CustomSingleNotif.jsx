import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {UserContext} from "../../Context/UserContext";
import {color, theme} from "../../assets/styles/style";
import Text from '../../Components/Text'
export default function CustomCreateNotif({props}){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const route = useRoute();
    const navigation = useNavigation();
    const styles = {
        btn : {
            marginTop: 0,
            padding : 6,
            paddingEnd: 20,
            paddingStart: 20,
        }
    };
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('EditNotification')}>
                <Feather name="edit" size={22} color={color[mode].text} style={{marginStart: 16, alignSelf: "flex-end"}}/>
            </TouchableOpacity>
        </>
    )
}