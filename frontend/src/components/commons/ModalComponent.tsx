import React from "react";
import { Modal } from "react-native";

export default function ModalComponent({animationType,onRequestClose, visible, children}){
    return <Modal
        visible={visible}
        animationType={animationType}
        onRequestClose={onRequestClose}
        backdropColor={'rgba(255,255,255,0.1)'}
    >
        {children}
    </Modal>
}