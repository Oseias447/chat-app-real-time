import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, Alert, TouchableOpacity, TextInput, View } from 'react-native';

export default class LoginScreen extends Component {
  state = {
    phone: '',
    name: ''
  }

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Telefone em Branco');
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Nome em Branco');
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
    }
  }

  render() {

    const { username, name } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Número Telefone"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={text => this.setState({ phone: text})}
        />
        <TextInput 
          placeholder="Nome"
          style={styles.input}
          value={this.state.name}
          onChangeText={text => this.setState({ name: text})}
        />

      <TouchableOpacity onPress={this.submitForm}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    marginBottom: 10,
    borderRadius: 5,
  },
  btnText: {
    color: 'darkblue',
    fontSize: 20
  }
});
