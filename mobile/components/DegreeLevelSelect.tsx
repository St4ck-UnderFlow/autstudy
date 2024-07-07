import { View, StyleSheet } from "react-native";
import { DegreeLevel } from "../types/teacher.type";
import RNPickerSelect from 'react-native-picker-select';

interface DegreeLevelSelectProps {
    onSelectFn: (itemValue: DegreeLevel) => void;
}

export function DegreeLevelSelect(props: DegreeLevelSelectProps) {
    return (
      <View>
        <RNPickerSelect
            onValueChange={(itemValue: DegreeLevel) => props.onSelectFn(itemValue)}
            items={[
              { label: "Bacharel", value: "BACHELORS" },
              { label: "Mestre", value: "MASTERS" },
              { label: "Doutor", value: "PHD" },
              { label: "Pós-Doutor", value: "POSTDOC" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Selecione o Grau de Formação", value: "" }}
        />
    </View>
    )
}

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