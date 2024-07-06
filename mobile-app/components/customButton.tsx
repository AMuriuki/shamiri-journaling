import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types/CustomButtonProps'

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""
                }`}
            disabled={isLoading}
        >
            <Text className={`text-primary font-psemibold text-lg px-4 ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton