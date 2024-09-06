import React, { FC, useState } from 'react';
import { Button, Input, XStack } from 'tamagui';


interface IncrementNumberInputProps {
  label: string;
  value?: number;
  delta: number;
  onChange?: (value: number) => void;
  // Defaults to False.
  disableFloats?: boolean;
}

/** 
 * Displays an input with the ability to increment/decrement the value.
 * Floats are limited to two decimal places.
 * Example drawing: <-> [Enter a value] <+>
 */
const IncrementNumberInput: FC<IncrementNumberInputProps> =
  ({ label, value = "", delta, onChange, disableFloats = false }) => {
    const [valueStr, setValueStr] = useState(value.toString())
    const setValueNum = (val: string, change: number) => {
      if (!val) val = '0';
      let valNum = disableFloats ? parseInt(val) : parseFloat(val);
      if (!isNaN(valNum)) {
        // Rond to two decimal places
        valNum = Math.round(valNum * 100) / 100;
        const newVal = Math.max(valNum + change, 0);
        setValueStr(newVal.toString());
        if (onChange) onChange(newVal);
      }
    }
    return (
      <XStack>
        <Button onPress={() => setValueNum(valueStr, -delta)}>-</Button>
        <Input
          placeholder={label}
          onChangeText={(text) => setValueStr(text)}
          onBlur={() => setValueNum(valueStr, 0)}
          keyboardType="numeric"
          value={valueStr} />
        <Button onPress={() => setValueNum(valueStr, delta)}>+</Button>
      </XStack>
    )
  };

export default IncrementNumberInput;
