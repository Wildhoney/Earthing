import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ImageBackground } from 'react-native';
import numeral from 'numeral';
import getStyles from './styles';
import * as utils from './utils';

type Place = { name: string; minimumDistance: number };

type Props = {
    model: Place;
    isActive: boolean;
    onClick: (name: string | null) => any;
};

export default function Place({ model, isActive, onClick }: Props) {
    const style = getStyles({ isActive });

    const handleClick = useCallback(() => onClick(isActive ? null : model.name), [model, isActive]);

    return (
        <View style={style.container} onClick={handleClick}>
            <ImageBackground
                source={utils.getImage(model.name)}
                style={style.background}
                imageStyle={{ resizeMode: 'cover' }}
            >
                <Text style={style.name}>{model.name}</Text>
                {model.minimumDistance > 0 && (
                    <Text style={style.distance}>
                        {numeral(model.minimumDistance / 1000).format('0,0')}km
                    </Text>
                )}
            </ImageBackground>
        </View>
    );
}

Place.propTypes = {
    model: PropTypes.shape({
        name: PropTypes.string.isRequired,
        minimumDistance: PropTypes.number.isRequired,
    }).isRequired,
};
