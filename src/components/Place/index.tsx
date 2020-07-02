import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import numeral from 'numeral';
import Flag from '../Flag';
import styles from './styles';
import * as t from './types';

export default function Place({ model }: t.Props): ReactElement {
    return (
        <View style={styles.container}>
            <Flag code={model.code} />

            <View>
                <Text style={styles.name}>
                    {model.name}{' '}
                    {model.occurrences > 1 && (
                        <Text style={styles.count}>×{model.occurrences}</Text>
                    )}
                </Text>

                <Text style={styles.distance}>
                    Walking {numeral(model.minimumDistance / 1000).format('0,0')}km for{' '}
                    {numeral(model.minimumDistance / 1000 / 5).format('0,0')} days
                </Text>
            </View>
        </View>
    );
}

Place.propTypes = {
    model: PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        occurrences: PropTypes.number.isRequired,
        minimumDistance: PropTypes.number.isRequired,
    }).isRequired,
};
