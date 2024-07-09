import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import images from '@/constants/images';
import CustomButton from '@/components/customButton';
import { useUser } from '@/contexts/UserProvider';

export default function App() {
    const { isLoading, isLogged } = useUser();

    if (!isLoading && isLogged) return <Redirect href="/home" />;

    return (
        <SafeAreaProvider className='bg-primary h-full'>
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='w-full flex justify-center items-center h-full px-4'>
                    <Image
                        source={images.logo}
                        className='w-[130px] h-[84px]'
                        resizeMode='contain'
                    />
                    <Image
                        source={images.grateful}
                        className='max-w-[380px] w-full h-[298px]'
                    />
                    <View className='relative mt-5'>
                        <Text
                            className='text-3xl text-white font-bold text-center text-pbold'>
                            Gratitude Journal
                        </Text>
                        <Text className='text-sm text-gray-100 font-pregular mt-7 text-center'>
                            Keeping a log of what you're thankful for can lower stress, help you sleep better, and may even reduce the risk of heart disease
                        </Text>
                    </View>
                    <CustomButton
                        title="Continue with email"
                        handlePress={() => router.push('/signIn')}
                        containerStyles='w-full mt-7'
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaProvider>
    )
}