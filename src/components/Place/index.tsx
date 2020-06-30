import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import numeral from 'numeral';
import style from './styles';
import * as utils from './utils';
import * as t from './types';

export default function Place({ model }: t.Props) {
    return (
        <View style={style.container}>
            <Image
                style={style.flag}
                source={{ uri: `https://www.countryflags.io/${model.code}/shiny/64.png` }}
            />

            <View>
                <Text style={style.name}>
                    {model.name}{' '}
                    {model.occurrences > 1 && <Text style={style.count}>×{model.occurrences}</Text>}
                </Text>

                <Text style={style.distance}>
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
