# Welcome to Shamiri Journaling App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Prerequisites
Before you begin, ensure you have the following tools installed:

1. **Node.js**: Install the latest version from [Node.js official website](https://nodejs.org/)

2. **Expo CLI**: Install Expo CLI globally using npm:
```$
$ npm install -g expo-cli
```

3. Android Studio: If you plan to run the app on an Android emulator, install [Android Studio](https://developer.android.com/studio). Ensure you have the Android SDK and AVD (Android Virtual Device) set up

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

3. Configuring API Access

To access the backend API, especially if running your app from Expo Go, use the Ngrok URL provided during the Ngrok set-up on the [Backend README](backend/README.md)

4. Update API Base URL

Go to `mobile-app/ShamiriAPIClient.ts` and provide the `BASE_API_URL` variable with Ngrok URL as the value:

```typescript
const BASE_API_URL = "https://9994-41-72-216-66.ngrok-free.app
```
