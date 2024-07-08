import { View, Text, ScrollView, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/formField'
import { CategoryType } from '@/types/Entry'
import CustomButton from '@/components/customButton'
import { useApi } from '@/contexts/ApiProvider'
import { router } from 'expo-router'

const Create = () => {

  const categories: CategoryType[] = [
    {
      id: 1,
      title: "Wellness"
    },
    {
      id: 2,
      title: "Social"
    },
    {
      id: 3,
      title: "Work"
    },
    {
      id: 4,
      title: "Outdoors"
    },
    {
      id: 5,
      title: "Family"
    }
  ]

  const api = useApi();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: new Date(),
    content: ""
  });

  console.log(form);

  const submit = async () => {
    if (form.title === "" || form.category === "" || form.content === "") {
      return Alert.alert("Please provide all fields");
    }

    setIsSubmitting(true);

    const response = await api.post("/entries", {
      title: form.title,
      category: form.category,
      date: form.date,
      content: form.content
    });

    if (response.ok) {
      Alert.alert("Success", "Entry published successfully");
      router.push("/home");
    }
    else {
      if (response.body.errors) {
        Alert.alert(response.body.errors.json);
      }
    }

    setForm({
      title: "",
      category: "",
      date: new Date(),
      content: ""
    })

    setIsSubmitting(false);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Create an Entry
        </Text>

        <FormField
          title='Entry Title'
          value={form.title}
          placeHolder='In under 20 characters'
          handleTextChange={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
          maxLength={20}
          fieldType='input'
        />

        <FormField
          title='Category'
          value={form.category}
          handleTextChange={(e) => setForm({ ...form, category: e })}
          otherStyles='mt-10'
          fieldType='select'
          options={categories}
        />

        <FormField
          title='Date'
          value={form.date}
          handleTextChange={(e) => setForm({ ...form, date: e })}
          otherStyles='mt-10'
          fieldType='date'
        />

        <FormField
          title='Content'
          value={form.content}
          placeHolder='Type your entry here...'
          handleTextChange={(e) => setForm({ ...form, content: e })}
          otherStyles='mt-10'
          multiline
          numberOfLines={4}
          fieldType='input'
        />
      </ScrollView>
      <CustomButton
        title="Publish Entry"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={isSubmitting}
      />
    </SafeAreaView>
  )
}

export default Create