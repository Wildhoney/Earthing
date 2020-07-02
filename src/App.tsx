import React, { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import Layout from './components/Layout';

export default function App(): ReactElement {
    return (
        <>
            <Layout />
            <StatusBar style="auto" />
        </>
    );
}
