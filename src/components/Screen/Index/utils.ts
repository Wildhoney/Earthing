import useMount from 'react-use/lib/useMount';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import { camelizeKeys } from 'humps';
// @ts-ignore
import { API_URL } from 'dotenv';
import url from 'url-join';
import * as Location from 'expo-location';
import { Model } from '../../Place/types';
import * as t from './types';
import { useState } from 'react';

export function useResult(): t.State {
    return useAsyncRetry(async () => {
        if (!(await requestPermission())) throw new Error('Permission denied.');

        const heading = getHeading(await Location.getHeadingAsync());
        const { coords } = await Location.getCurrentPositionAsync();

        const response = await fetch(
            url(API_URL, `${coords.latitude}/${coords.longitude}/${heading}`)
        ).then((response) => response.json());

        return { list: camelizeKeys(response.countries) as Model[], heading };
    }, []);
}

export function useHeading(): number | null {
    const [heading, setHeading] = useState<number | null>(null);

    useMount(async () => {
        if (!(await requestPermission())) return;

        const heading = await Location.watchHeadingAsync((heading) =>
            setHeading(getHeading(heading))
        );

        return () => heading.remove();
    });

    return heading;
}

async function requestPermission(): Promise<boolean> {
    const { status } = await Location.requestPermissionsAsync();
    return status === 'granted';
}

function getHeading({ trueHeading, magHeading }: Location.HeadingData): number {
    return trueHeading === -1 ? magHeading : trueHeading;
}

export function getDirection(degree: number): t.Directions {
    if (degree >= 22.5 && degree < 67.5) {
        return 'NE';
    } else if (degree >= 67.5 && degree < 112.5) {
        return 'E';
    } else if (degree >= 112.5 && degree < 157.5) {
        return 'SE';
    } else if (degree >= 157.5 && degree < 202.5) {
        return 'S';
    } else if (degree >= 202.5 && degree < 247.5) {
        return 'SW';
    } else if (degree >= 247.5 && degree < 292.5) {
        return 'W';
    } else if (degree >= 292.5 && degree < 337.5) {
        return 'NW';
    }
    return 'N';
}
