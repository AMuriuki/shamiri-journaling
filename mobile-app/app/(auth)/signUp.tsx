import { View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import images from '@/constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/formField'
import CustomButton from '@/components/customButton'
import { Link, router } from 'expo-router'
import { useApi } from "../../contexts/ApiProvider";
import { extractErrorMessages } from '@/ShamiriAPIClient'
import { StatusBar } from 'expo-status-bar'

const SignUp = () => {

  const api = useApi();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Fill all fields to sign up");
      return;
    }
    setIsSubmitting(true);
    const data = await api.post('/new-user', {
      username: form.username,
      email: form.email,
      password: form.password
    });
    
    if (!data.ok) {
      const message = extractErrorMessages(data.body)
      Alert.alert("Error", message);
    } else {
      Alert.alert('Success!', 'You have successfully registered');
      router.replace("/home");
    }
    setIsSubmitting(false);
  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View
          className='w-full flex justify-center h-full px-4 my-6'
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            source={images.logoDark}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />
          <Text className='text-2xl font-semibold text-primary mt-10 font-psemibold'>
            Sign up to Shamiri
          </Text>
          <FormField
            title='Username'
            value={form.username}
            handleTextChange={(e) => setForm({ ...form, username: e })}
            otherStyles='mt-10'
            fieldType='input'
          />
          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-10'
            keyboardType='email-address'
            fieldType='input'
          />
          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-10'
            fieldType='input'
          />
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-500 font-pregular'>
              Already have an account?
            </Text>
            <Link href="/signIn" className='text-lg font-psemibold text-secondary'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#fff' style='dark' />
    </SafeAreaView>
  )
}

export default SignUp