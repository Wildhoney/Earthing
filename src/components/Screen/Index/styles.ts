import { StyleSheet } from 'react-native';
import * as t from './types';

export default function getStyles({ isLoading }: t.Styles) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#121212',
            marginTop: 5,
            alignItems: isLoading ? 'center' : undefined,
            justifyContent: isLoading ? 'center' : undefined,
        },
        description: {
            color: 'darkgray',
            padding: 40,
            paddingBottom: 20,
            fontSize: 12,
            lineHeight: 18,
        },
        scroll: {
            flex: 1,
        },
    });
}
