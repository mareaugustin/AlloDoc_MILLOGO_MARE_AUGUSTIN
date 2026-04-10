import React from "react";
import { Text, View, StyleSheet } from "react-native";


export default function HeaderComponent({title, children1, children2}){
    return(
        <View style={styles.header} >
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.headerContent}>
                {children1}
            </View>
            <View style={styles.headerInfo}>
                {children2}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 80,
        justifyContent: 'space-between'
    },
    header:{
        backgroundColor: 'rgba(0,0,255,0.7)',
        paddingTop: 80,
        paddingBottom: 30,
        height:300,
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        justifyContent: 'space-between'
        // paddingLeft: 20
    },
    headerTitle:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
        marginHorizontal: 35,
        letterSpacing: 2
    },
    headerContent:{
        marginHorizontal: 35,
        gap: 2
    },
    headerInfo:{
        flexDirection: 'row',
        marginHorizontal: 35,
        gap: 5
    },
    text:{
        fontSize: 18,
        fontWeight:'500',
        color: '#fff',
        letterSpacing: 2
    },
    tex:{
        fontSize: 16,
        fontWeight:'400',
        color: '#fff',
        letterSpacing: 2
    },
    error:{
        color: '#f00',
    },
    button:{

    },
    icon:{
        position: 'absolute',
        top: 10,
        right: 45
    },
    
    form:{
        gap: 17
    },
    register:{
       backgroundColor: 'rgba(0,0,255,0.7)',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 35,
        
    },
    textB:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

})