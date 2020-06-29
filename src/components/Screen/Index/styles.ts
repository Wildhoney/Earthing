import { StyleSheet } from 'react-native';
import * as t from './types';

export default function getStyles({ isLoading }: t.Styles) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 5,
            alignItems: isLoading ? 'center' : undefined,
            justifyContent: isLoading ? 'center' : undefined,
        },
        scroll: {
            flex: 1,
        },
    });
}
