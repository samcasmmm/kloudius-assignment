# Kloudius Assignment

A React Native application built with Expo and Expo Router, featuring a custom authentication system.

## Features

- **Authentication**: Custom AuthContext with Login, Signup, and Logout functionality.
- **Navigation**: File-based routing using Expo Router.
- **Styling**: Native components with persistent layouts.
- **Theme Support**: Integrated with Expo's status bar and system UI.

## Technology Stack

- **Framework**: [Expo](https://expo.dev/)
- **State Management**: React Context API (AuthContext)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Icons**: [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app on your mobile device (to test on physical hardware)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd kloudius-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm start
```

From the terminal, you can:

- Press **`a`** to open on Android.
- Press **`i`** to open on iOS.
- Press **`w`** to open on web.
- Scan the QR code with **Expo Go** to open on your phone.

## Project Structure

- `app/`: Contains the application routes (Expo Router).
  - `index.tsx`: Loading/Redirect logic.
  - `login.tsx` & `signup.tsx`: Authentication screens.
  - `home.tsx`: Main dashboard screen.
  - `modal.tsx`: Informational modal.
  - `_layout.tsx`: Root layout with `AuthProvider`.
- `context/`: Global state management (`AuthContext.tsx`).
- `components/`: Reusable UI components and theme-aware views.
- `constants/`: Application constants and color schemes.
- `hooks/`: Custom React hooks (e.g., `useColorScheme`).
- `assets/`: Static assets like images and fonts.

## License

This project is licensed under the MIT License.
