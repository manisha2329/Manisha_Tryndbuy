import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    StatusBar,
} from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import IMAGES from '../../constants/images';
import axios from 'axios';
import { API_URL } from '../../constants/Api';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const WardrobeHome = () => {
    const navigation = useNavigation();
    const [wardrobeData, setWardrobeData] = useState([]);

    useEffect(() => {
        hitServiceToGetData();
    }, []);

    const hitServiceToGetData = () => {
        axios
            .get(API_URL.SKU_Details, {
                headers: {
                    authID: '3c643a25e11144ad',
                },
            })
            .then(res => {
                const parsedMappedSkuList = JSON.parse(res.data)?.MappedSkuList;
                console.log('parsedMappedSkuList...>>', parsedMappedSkuList);
                setWardrobeData(parsedMappedSkuList);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const menuItems = [
        { label: 'Dresses', icon: IMAGES.dress },
        { label: 'Makeup', icon: IMAGES.brush },
        { label: 'Goggles', icon: IMAGES.glasses },
        { label: 'Shoes', icon: IMAGES.sneakers },
        { label: 'Location', icon: IMAGES.location },
    ];

    const onClickMenu = item => {
        navigation.navigate('WardrobeDetail', {
            wardrobeData,
            SKUID: wardrobeData?.[0]?.SKUID,
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={IMAGES.landingBg}
                style={styles.bgImg}
                resizeMode="cover"
            />
            <View style={styles.absolute}>
                <Image
                    source={IMAGES.model}
                    style={styles.model}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.sideMenu}>
                <ScrollView
                    contentContainerStyle={styles.menuList}
                    showsVerticalScrollIndicator={false}
                >
                    {menuItems.map((item, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInRight.delay(index * 150).springify()}
                        >
                            <TouchableOpacity
                                style={styles.menuButton}
                                onPress={() => onClickMenu(item)}
                            >
                                <View style={styles.iconCircle}>
                                    <Image source={item.icon} style={styles.iconStyle} />
                                </View>
                                <View style={styles.menuView}>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default WardrobeHome;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    bgImg: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    absolute: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        bottom: -height * 0.13,
    },
    model: {
        height: height * 0.7,
        width: width * 0.55,
    },
    sideMenu: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
    },
    menuList: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: 'transparent',
    },
    menuButton: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 60,
        height: 60,
        backgroundColor: '#rgba(255,255,255,0.95)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 0,
    },
    menuView: {
        padding: 6,
        backgroundColor: '#rgba(0,0,0,0.2)',
        borderRadius: 4,
        marginTop: 6,
    },
    menuLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    iconStyle: {
        height: 30,
        width: 30,
    },
});
