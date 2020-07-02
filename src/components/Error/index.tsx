import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import styles from './styles';

export default function Error(): ReactElement {
    return (
        <Text style={styles.container}>
            Unfortunately we were unable to fetch the countries. Please try again later.
        </Text>
    );
}
