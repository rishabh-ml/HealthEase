import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import welcomeBg from '../assets/welcome-bg.png'; // Sticker-like image

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Sticker or background image */}
      <View style={styles.stickerContainer}>
        <Image source={welcomeBg} style={styles.sticker} />
      </View>

      {/* Logo + App Title */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Welcome to HealthEase</Text>
        <Text style={styles.subtitle}>Your health, our priority</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Optional Version or Footer Text */}
      <Text style={styles.footerText}>Version 1.0.0</Text>
    </View>
  );
};

// ---------------------------------------------
// Styles
// ---------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sticker near the top
  stickerContainer: {
    position: 'absolute',
    top: 100, // Adjust as needed for placement
    alignItems: 'center',
  },
  sticker: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
  },
  // Logo + Text
  logoContainer: {
    alignItems: 'center',
    marginTop: 180, // space for sticker
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  // Buttons
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Footer
  footerText: {
    position: 'absolute',
    bottom: 10,
    color: '#777',
    fontSize: 12,
  },
});

export default WelcomeScreen;