import React from 'react';
import { TextInput, StyleSheet, View, Text, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import { moderateScale, verticalScale } from '../utilities/Reponsive';

// Define types for the component props
interface TextInputComponentProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  label,
  errorMessage,
  containerStyle,
  inputStyle,
  labelStyle,
  ...props
}) => {
  return (
    <View style={[containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle]}
        {...props}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize:moderateScale(16),
    fontWeight: '500',
    color: '#333',
    marginBottom:verticalScale(5),
  },
  input: {
    borderColor: '#ccc',
    borderWidth: moderateScale(1),
    borderRadius:moderateScale(5),
    paddingHorizontal: moderateScale(10),
    fontSize: moderateScale(16),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default TextInputComponent;
