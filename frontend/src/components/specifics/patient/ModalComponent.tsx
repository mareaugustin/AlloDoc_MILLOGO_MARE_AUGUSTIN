import React from "react";
import { FlatList, Modal, Text, View, StyleSheet } from "react-native";
import HeaderModal from "./HeaderModal";
import Loader from "../../commons/LoadingComponent";
import ChargementData from "../../commons/Chargement";
import NoData from "../../commons/NoData";


export default function ModalComponent({visible, title, onPress, data, renderFooter, onEndReached, renderItem, loading}){
    return(
        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >
            <View style={styles.modal}>
                <HeaderModal 
                    onPress={onPress}
                    title={title}
                />

                {data.length === 0 && loading ? (
                    <ChargementData />
                ) : data.length === 0 ? (
                        <NoData />
                ) : (
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10, paddingBottom: 20 , paddingHorizontal: 10}}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={renderItem}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                )}
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    aucun:{
        color: 'gray',
        textAlign: 'center'
    },
    modal:{
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 70,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position:'relative',
    },
})