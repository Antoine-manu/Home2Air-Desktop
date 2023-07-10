import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {UserContext} from "../../Context/UserContext";
import {color, theme} from "../../assets/styles/style";
import Text from '../../Components/Text'
export default function CustomSpaces({props}){

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
            <TouchableOpacity style={[theme[mode].btn, styles.btn]} onPress={() => navigation.navigate('CreateSpace')}>
                <Text style={theme[mode].btnText}>Créer</Text>
            </TouchableOpacity>
        </>
    )
}