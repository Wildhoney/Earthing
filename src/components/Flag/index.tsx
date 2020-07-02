import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styles from './styles';
import * as t from './types';

export default function Flag({ code }: t.Props): ReactElement {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: `https://www.countryflags.io/${code}/flat/64.png` }}
            />
        </View>
    );
}

Flag.propTypes = { code: PropTypes.string.isRequired };
