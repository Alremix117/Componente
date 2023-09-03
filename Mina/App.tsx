import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  TextInput,
} from 'react-native';

import Form from './src/component/Form';

const App = () => {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState<{ username: string; password: string }[]>([]);



  const isStrongPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Por favor ingresa un nombre de usuario y contraseña válidos.');
      return;
    }

    if (!isStrongPassword(password)) {
      Alert.alert(
        'La contraseña no cumple con los requisitos mínimos.',
        'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.'
      );
      return;
    }

    // agregar el nuevo usuario a la lista 
    setUserList([...userList, { username, password }]);

    // limpiar 
    setUsername('');
    setPassword('');

    Alert.alert('Registro exitoso');
  };

  const nuevaCitaHandle = () => {
    setModal(!modal);
  };

  return (
    <SafeAreaView style={styles.contains}>
      <ScrollView>
        <View>
          <TextInput
            placeholder="Nombre de Usuario"
            onChangeText={text => setUsername(text)}
            value={username}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            style={styles.input}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <Pressable style={styles.btnNuevaCita} onPress={() => setModal(!modal)}>
            <Text style={styles.btnTextoNuevaCita}>Continuar</Text>
          </Pressable>

          <Modal animationType='slide' visible={modal}>
            <Form modal={modal} userList={userList} setUserList={setUserList} onLogin={() => setModal(false)} />
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  contains: {
    backgroundColor: '#CDCA1C',
    flex: 1
  },
  titulo: {
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 'auto'
  },
  btnNuevaCita: {
    backgroundColor: '#1788ED',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },

  ////////////////////////////////////////////////////////////
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registeredContainer: {
    marginTop: 20,
  },
  registeredText: {
    fontSize: 16,
  },
});

export default App;