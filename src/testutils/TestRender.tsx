import React from 'react';
import { getDefaultTamaguiConfig } from '@tamagui/config-default'
import { TamaguiProvider, createTamagui } from 'tamagui';
import { render as renderNative} from '@testing-library/react-native';

const conf = createTamagui(getDefaultTamaguiConfig());

export function render(jsx: React.JSX.Element) {
    return renderNative(
        <TamaguiProvider config={conf}>
            {jsx}
        </TamaguiProvider>
    )
}
