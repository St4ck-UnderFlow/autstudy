import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SupportLevel } from '../types/student.type';

interface SupportLevelSelectProps {
  onSelectFn: (itemValue: SupportLevel) => void;
}

export function SupportLevelSelect(props: SupportLevelSelectProps) {
    return (
        <View style={styles.pickerContainer}>
            <RNPickerSelect
                onValueChange={(itemValue: SupportLevel) => props.onSelectFn(itemValue)}
                items={[
                  { label: "Grau 1", value: "SLIGHT" },
                  { label: "Grau 2", value: "MODERATE" },
                  { label: "Grau 3", value: "SEVERE" }
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Selecione o Grau de Suporte", value: "" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: { }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, 
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, 
    },
});
