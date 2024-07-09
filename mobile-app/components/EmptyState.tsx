import { Image, View, Text } from "react-native"
import images from "@/constants/images"
import { EmptyStateProps } from "@/types/EmptyStateProps";
import CustomButton from "./customButton";
import { router } from "expo-router";

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
    return (
        <View className="flex justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[216px]"
                resizeMode="contain"
            />
            <Text className="text-xl text-center font-psemibold text-primary mt-2">
                {title}
            </Text>
            <Text className="text-sm font-pmedium text-gray-500">
                {subtitle}
            </Text>
            <CustomButton
                title="Create an entry"
                handlePress={() => router.push('/create')}
                containerStyles="w-full my-5"
            />
        </View>
    )
}

export default EmptyState;