import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icone from "./IconeComponent";
import ButtonComponent from "./ButtonComponent";

const RefreshableHeader = ({ onRefresh }) => (
  <View style={styles.container}>
    <ButtonComponent onPress={onRefresh} style={styles.button}>
      <Icone nom={'refresh'} taille={24} color={'#00f'} />
    </ButtonComponent>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
  button: { padding:5, backgroundColor: "rgba(0,0,255,0.2)", borderRadius: 5 },
});

export default RefreshableHeader;