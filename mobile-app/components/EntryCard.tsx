import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { EntryCardProps } from '@/types/Entry'
import { format } from 'date-fns';
import { router } from 'expo-router';

const EntryCard: React.FC<EntryCardProps> = ({ id, title, content, category, date }) => {
    const formattedDate = format(new Date(date), 'MMMM dd, yyyy');

    const handleOnPress = (query: number) => {
        router.push(`/entry/${query}`);
    }

    return (
        <TouchableOpacity
            onPress={() => handleOnPress(id)}
            style={{
                borderWidth: 1,
                borderColor: '#FF9C01',
                borderRadius: 8,
                backgroundColor: '#00000',
                marginHorizontal: 5,
                marginBottom: 10
            }}
        >
            <View className='p-4'>
                <View className='flex flex-row justify-between items-center mb-2'>
                    <Text className='text-lg font-bold flex-1 text-primary'>{title}</Text>
                    <Text className='text-gray-500 text-sm'>{formattedDate}</Text>
                </View>
                <View className='mb-2'>
                    <Text
                        className='text-base text-primary'
                        numberOfLines={2}
                    >
                        {content}
                    </Text>
                </View>
                <View className='flex flex-row items-center'>
                    <Text className='text-gray-500 text-sm'>{category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default EntryCard

