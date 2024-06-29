import { primaryColor } from "./Global.style";
import { StyleSheet } from 'react-native';

export const ButtonStyle = StyleSheet.create({
    primaryButton: {
        backgroundColor: primaryColor,
        height: 48,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'medium',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        height: 48,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: primaryColor,
        borderStyle: 'solid',
    },
    secondaryButtonText: {
        color: primaryColor,
        fontSize: 16,
        fontWeight: 'medium',
    },
})