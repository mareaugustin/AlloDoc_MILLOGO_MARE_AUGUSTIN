import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Loader from "./LoadingComponent";


export default function RenderFooter({loading}){
    if (!loading) return null;
    return (
        <View style={styles.footer}>
            <Loader couleur="#00f" />
            <Text style={styles.loadingText}>Chargement...</Text>
        </View>
    );
           
}


const styles = StyleSheet.create({
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    loadingText: {
        color: 'gray',
        marginTop: 5,
    },
})