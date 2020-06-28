import React from 'react';
import { Text } from 'react-native';
import style from './styles';

export default function Error() {
    return (
        <Text style={style.container}>
            Unfortunately we were unable to fetch the countries. Please try again later.
        </Text>
    );
}
