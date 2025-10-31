import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Text style={styles.text}>Profile Screen</Text>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor:"#FFFFFF"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#000'
    },
});

export default ProfileScreen;
