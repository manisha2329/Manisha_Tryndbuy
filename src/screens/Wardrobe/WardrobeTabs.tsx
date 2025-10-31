import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WardrobeHome from "./WardrobeHome";
import ProfileScreen from "../Profile/ProfileScreen";
import FriendsScreen from "../Friends/FriendsScreen";
import {Image} from 'react-native';
import IMAGES from "../../constants/images";
import WardrobeStackNavigator from "../../navigator/WardrobeStackNavigator";

const Tab = createBottomTabNavigator();

export default function WardrobeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: "#999",
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    borderTopWidth: 0.5,
                    borderTopColor: "#ddd",
                },
            }}
        >
            <Tab.Screen
                name="WardrobeHome"
                component={WardrobeStackNavigator}
                options={{
                    title: "My Wardrobe",
                    tabBarIcon: ({}) => <Image source={IMAGES.hanger} resizeMode="cover" style={{height: 28, width: 28}}/>,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#5C5C5C'
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "My Profile",
                    tabBarIcon: ({}) => <Image source={IMAGES.user} resizeMode="cover" style={{height: 25, width: 25}}/>,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#5C5C5C'
                    }
                }}
            />
            <Tab.Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    title: "Friends",
                    tabBarIcon: ({}) => <Image source={IMAGES.friends} resizeMode="cover" style={{height: 28, width: 28}}/>,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#5C5C5C'
                    }
                }}
            />
        </Tab.Navigator>
    );
}
