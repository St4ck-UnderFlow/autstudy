import { View } from "react-native";
import { PickerStyle } from "../styles/Picker.style";
import { Picker } from "@react-native-picker/picker";
import { DegreeLevel } from "../types/teacher.type";

interface DegreeLevelSelectProps {
    onSelectFn: (itemValue: DegreeLevel) => void;
}

export function DegreeLevelSelect(props: DegreeLevelSelectProps) {
    return (
        <View style={PickerStyle.pickerContainer}>
          <Picker
            onValueChange={(itemValue: DegreeLevel) => props.onSelectFn(itemValue)}
            style={PickerStyle.picker}
          >
            <Picker.Item label="Selecione o Grau de Formação" value="" />
            <Picker.Item label="Bacharel" value="BACHELORS" />
            <Picker.Item label="Mestre" value="MASTERS" />
            <Picker.Item label="Doutor" value="PHD" />
            <Picker.Item label="Pós-Doutor" value="POSTDOC" />
            <Picker.Item label="Licenciado" value="BACHELORS" />
          </Picker>
        </View>
    )
}