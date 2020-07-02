import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import styles from './styles';

export default function Title(): ReactElement {
    return <Text style={styles.container}>Earthing</Text>;
}
