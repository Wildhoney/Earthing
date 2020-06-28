import React from 'react';
import { useAsync } from 'react-use';
import { camelizeKeys } from 'humps';
import { SafeAreaView } from 'react-native';
import getStyles from './styles';
import Place, { Model as PlaceModel } from '../../Place';
import Loading from '../../Loading';
import Error from '../../Error';

export default function App() {
    const places = useAsync(async () => {
        const response = await fetch('http://localhost:5000/51.5074/0.1278/90').then((response) =>
            response.json()
        );
        return camelizeKeys(response);
    });

    const style = getStyles({ isLoading: places.loading });

    return (
        <SafeAreaView style={style.container}>
            {places.error ? (
                <Error />
            ) : (
                <>
                    {places.loading ? (
                        <Loading />
                    ) : (
                        places.value.countries
                            .filter((place: PlaceModel) => place.minimumDistance > 0)
                            .map((place: PlaceModel) => <Place key={place.name} model={place} />)
                    )}
                </>
            )}
        </SafeAreaView>
    );
}
