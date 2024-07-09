import React from 'react';
import { Tabs } from 'expo-router';
import { TabIconProps } from '../../types/TabProps';
import { View, Image, Text } from 'react-native';
import icons from "../../constants/icons";

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
    return (
        <View className='flex items-center justify-center gap-2'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='h-6 w-6'
            />
            <Text
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#161622',
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderTopWidth: 1,
                        borderTopColor: '#E0E0E0',
                        height: 84
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name='Home'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout