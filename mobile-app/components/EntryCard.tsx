import { View, Text } from 'react-native'
import React from 'react'
import { EntryCardProps } from '@/types/Entry'

const EntryCard: React.FC<EntryCardProps> = ({ title, content, category, date }) => {
    return (
        <View className='px-4 mb-14'>
            <View className='flex flex-row justify-between items-center mb-2'>
                <Text className='text-lg font-bold flex-1 text-white'>{title}</Text>
                <Text className='text-gray-400 text-sm'>{date}</Text>
            </View>
            <View className='mb-2'>
                <Text
                    className='text-base text-white'
                    numberOfLines={2}
                >
                    {content}
                </Text>
            </View>
            <View className='flex flex-row items-center'>
                <Text className='text-gray-400 text-sm'>{category}</Text>
            </View>
        </View>
    )
}

export default EntryCard

