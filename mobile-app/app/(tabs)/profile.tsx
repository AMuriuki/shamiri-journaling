import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";

import icons from "@/constants/icons";
import InfoBox from "@/components/InfoBox"
import EmptyState from "@/components/EmptyState";
import { useUser } from "@/contexts/UserProvider";
import { EntryType } from "@/types/Entry";
import { useCallback, useState } from "react";
import { useApi } from "@/contexts/ApiProvider";
import { useFocusEffect } from "@react-navigation/native";
import FormField from "@/components/formField";
import CustomButton from "@/components/customButton";

const Profile = () => {
  
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user, setIsLogged, logout } = useUser();
  const api = useApi();

  const hanleLogout = async () => {
    setIsLogged(false);
    logout();
    router.replace("/signIn");
  };

  const fetchEntries = async () => {
    const entriesResponse = await api.get(`/user/${user?.id}/entries`);
    if (entriesResponse.ok) {
      setEntries(entriesResponse.body.data);
    } else {
      setEntries([]);
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchEntries();
    }, [user])
  );

  if (loading) {
    return (
      <SafeAreaProvider className='bg-white h-full flex justify-center items-center'>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaProvider>
    )
  }

  const submit = async () => {

  }

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No entries Found"
            subtitle="You don't have any journal entries yet"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={hanleLogout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={entries.length.toString() || "0"}
                subtitle="Entries"
                titleStyles="text-xl"
              />
            </View>

            <FormField
              title="Username"
              value={form.username}
              handleTextChange={(e) => setForm({ ...form, username: e })}
              otherStyles='mt-10'
              fieldType='input'
            />

            <FormField
              title="Password"
              value={form.password}
              handleTextChange={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-10'
              fieldType='input'
            />

            <CustomButton
              title='Update Profile'
              handlePress={submit}
              containerStyles='mt-7 w-full'
              isLoading={isSubmitting}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
