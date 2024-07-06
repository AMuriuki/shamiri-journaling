import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/formField'
import CustomButton from '@/components/customButton'
import { Link } from 'expo-router'

const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View
          className='w-full flex justify-center h-full px-4 my-6'
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />
          <Text className='text-2xl font-semibold text-white mt-10 font-psemibold'>
            Log in to Shamiri
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />
          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href="/signUp" className='text-lg font-psemibold text-secondary'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn