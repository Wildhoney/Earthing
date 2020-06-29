import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Layout from './components/Layout';

export default function App() {
    return (
        <>
            <Layout />
            <StatusBar style="auto" />
        </>
    );
}
