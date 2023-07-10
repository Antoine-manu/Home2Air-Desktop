import {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {UserContext} from "../../Context/UserContext";
import {color} from "../../assets/styles/style";
export default function CustomTitleSensor({props}){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const route = useRoute();
    const navigation = useNavigation();
    const styles = {
        gear : {
            marginEnd: 5
        }
    };
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <FontAwesome name="gear" size={24} color={color[mode].text} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('EditProfil')}>
                <Feather name="edit" size={22} color={color[mode].text} style={{marginStart: 16, alignSelf: "flex-end"}}/>
            </TouchableOpacity>
        </>
    )
}