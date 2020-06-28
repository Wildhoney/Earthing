import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import numeral from 'numeral';
import style from './styles';
import * as utils from './utils';

export type Model = { name: string; minimumDistance: number };

type Props = {
    model: Model;
};

export default function Place({ model }: Props) {
    return (
        <View style={style.container}>
            <Image style={style.flag} source={utils.getFlag(model.name)} />

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
        minimumDistance: PropTypes.number.isRequired,
    }).isRequired,
};
