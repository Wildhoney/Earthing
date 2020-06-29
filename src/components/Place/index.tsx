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
                source={{ uri: `https://www.countryflags.io/${model.code}/flat/64.png` }}
            />

            <View>
                <Text style={style.name}>{model.name}</Text>
                <Text style={style.distance}>
                    {numeral(model.minimumDistance / 1000).format('0,0')}km
                </Text>
            </View>
        </View>
    );
}

Place.propTypes = {
    model: PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        minimumDistance: PropTypes.number.isRequired,
    }).isRequired,
};
