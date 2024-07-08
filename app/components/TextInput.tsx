import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <RNTextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default TextInput;
