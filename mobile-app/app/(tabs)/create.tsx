import { View, Text, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/formField'
import { CategoryType } from '@/types/Entry'

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

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: new Date(),
    content: ""
  });

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
    </SafeAreaView>
  )
}

export default Create