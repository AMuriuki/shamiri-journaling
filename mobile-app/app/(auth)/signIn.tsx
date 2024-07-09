import { View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/formField'
import CustomButton from '@/components/customButton'
import { Link, router } from 'expo-router'
import { useUser } from '@/contexts/UserProvider'
import { StatusBar } from 'expo-status-bar'

const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { login } = useUser();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true)

    const result = await login(form.email, form.password);

    if (result === 'fail') {
      Alert.alert("Error", "Invalid credentials");
    } else if (result === "ok") {
      Alert.alert("Success", "Signed in successfully");
      router.replace("/home");
    }

    setIsSubmitting(false);
  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View
          className='w-full flex justify-center h-full px-4 my-6'
        >
          <Image
            source={images.logoDark}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />
          <Text className='text-2xl font-semibold text-primary mt-10 font-psemibold'>
            Log in to Shamiri
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
            fieldType='input'
          />
          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
            fieldType='input'
          />
          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-500 font-pregular'>
              Don't have an account?
            </Text>
            <Link href="/signUp" className='text-lg font-psemibold text-secondary'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#fff' style='dark' />
    </SafeAreaView>
  )
}

export default SignIn