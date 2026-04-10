import React from "react";
import { Text, View , StyleSheet} from "react-native";


export default function GestionRdv(){
    return(
        <View style={styles.container}>
            <Text>Gestion RDV Admin</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})