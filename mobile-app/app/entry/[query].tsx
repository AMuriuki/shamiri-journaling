import { View, Text, ActivityIndicator, ScrollView, RefreshControl, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApi } from '@/contexts/ApiProvider';
import { EntryType } from '@/types/Entry';
import { format } from 'date-fns';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Entry = () => {
  const { query } = useLocalSearchParams();
  const api = useApi();

  const [entry, setEntry] = useState<EntryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEntry = async () => {
    try {
      const response = await api.get(`/entry/${query}`);
      if (response.ok) {
        setEntry(response.body);
      } else {
        setEntry(null);
      }
    } catch (error) {
      console.error('Error fetching entry:', error);
      setEntry(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntry();
  }, [api, query]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEntry();
    setRefreshing(false);
  };

  const formattedDate = (timestamp: string) => {
    return format(new Date(timestamp), 'MMMM dd, yyyy');
  }

  const handleEdit = () => {

  }

  const handleDelete = async () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: confirmDelete }
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/entry/${query}`);
      if (response.ok) {
        Alert.alert('Success', 'Entry deleted successfully', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        Alert.alert('Error', 'Failed to delete entry');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      Alert.alert('Error', 'Failed to delete entry');
    }
  };


  return (
    <SafeAreaView className='bg-white h-full px-4 mt-4'>
      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : entry && entry !== undefined ? (
        <>
          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Image
              source={icons.backArrow}
              className='w-6 h-6 mb-8'
              resizeMode='contain'
            />
          </TouchableOpacity>
          <ScrollView className='flex-1'
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View className='mb-4'>
              <Text className='text-gray-500 text-sm mb-4'>
                {formattedDate(entry.timestamp)}
              </Text>
              <Text className='font-pbold text-primary text-3xl'>
                {entry.title}
              </Text>
              <Text className='text-gray-500 text-sm'>
                {entry.category.title}
              </Text>
            </View>
            <View>
              <Text className='text-primary text-2xl leading-8'>
                {entry.content}
              </Text>
            </View>
          </ScrollView>
          <View className='absolute bottom-6 left-0 right-0 flex-row justify-center px-4'>
            <View className='flex-row bg-white border border-primary rounded-3xl p-3'>
              <TouchableOpacity
                className='mx-4'
                onPress={handleEdit}
              >
                <Image
                  source={icons.edit}
                  className='w-6 h-6'
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity
                className='mx-4'
                onPress={handleDelete}
              >
                <Image
                  source={icons.del}
                  className='w-6 h-6'
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-red'>Failed to load entry</Text>
        </View>
      )}
      <StatusBar backgroundColor='#fff' style='dark' />
    </SafeAreaView>
  )
}

export default Entry