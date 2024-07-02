import { View } from "react-native";
import { PickerStyle } from "../styles/Picker.style";
import { Picker } from "@react-native-picker/picker";
import { SupportLevel } from "../types/student.type";

interface SupportLevelSelectProps {
    onSelectFn: (itemValue: SupportLevel) => void;
}

export function SupportLevelSelect(props: SupportLevelSelectProps) {
    return (
        <View style={PickerStyle.pickerContainer}>
          <Picker
            onValueChange={(itemValue: SupportLevel) => props.onSelectFn(itemValue)}
            style={PickerStyle.picker}
          >
            <Picker.Item label="Selecione o Grau de Suporte" value="" />
            <Picker.Item label="Grau 1" value="SLIGHT" />
            <Picker.Item label="Grau 2" value="MODERATE" />
            <Picker.Item label="Grau 3" value="SEVERE" />

          </Picker>
        </View>
    )
}