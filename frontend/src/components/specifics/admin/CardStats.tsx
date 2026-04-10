import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Loader from "../../commons/LoadingComponent";



export default function CardStats({loading, titre, nombre, error}){
    return(
         <View style={styles.conu}>
            <View style={styles.conupd}>
                <Text style={styles.conuo}>{titre}</Text>
                {loading ? (
                    <Loader couleur={'white'} />
                ):( 
                    <Text style={styles.conuotr}>{nombre}</Text>
                    )}

                {error && (<Text style={styles.er}>{error}</Text>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    coi:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hide:{
        display: 'none'
    },
    aucun:{
        color: 'gray',
        textAlign: 'center'
    },
    er:{
        color: '#f00',
        fontWeight: 'bold'
    },
    contain:{
        marginTop: 40,
        gap: 20
    },
    conupd:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        width:180,
        gap: 20,
        padding: 20,
        borderRadius: 5
    },
    conud:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        justifyContent: 'flex-start',
        gap: 20,
        padding: 20,
        borderRadius: 5
    },
    conu:{
        
        paddingTop: 30
    },
    conuo:{
        fontWeight: 'bold',
        fontSize: 18,
        color:'#fff'
    },
    conuotr:{
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 15
    },
    conuot:{
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        padding: 20,
        borderRadius: 15
    },
    container:{
        marginHorizontal: 20,
        flex: 1
    }
})