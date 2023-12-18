import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Login(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const backgroundStyle = {
    backgroundColor:  Colors.darker,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 50 }}>
        <View style={{ justifyContent: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"rgba(43, 34, 119, 1)"}
              onChangeText={newMail => setMail(newMail)}
              defaultValue={mail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"rgba(43, 34, 119, 1)"}
              onChangeText={newPassword => setPassword(newPassword)}
              defaultValue={password}
              secureTextEntry={true}
            />
          </View>
          <View style={{paddingHorizontal: 50}}>
            <Pressable style={styles.primaryButton} onPress={() => { console.log("pressed") }}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => { console.log("pressed") }}>
              <Text style={styles.secondaryButtonText}>Register</Text>
            </Pressable>
          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  input: {
    borderColor: "rgba(66, 59, 142, 1)",
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    height: 40,
    backgroundColor: "rgba(197, 192, 255, 1)",
    marginBottom: 10
  },
  primaryButton: {
    borderColor: "#3F3C8F",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 40,
    backgroundColor: "#282377",
    marginVertical: 10,
  },
  primaryButtonText: {
    color: "white",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "900",
  },
  secondaryButton: {
    width: "100%",
    padding: 10,
    height: 40,
  },
  secondaryButtonText: {
    color: "#E5E1E6",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "400",
  }
});

export default Login;
