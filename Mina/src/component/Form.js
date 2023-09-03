import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Alert, View, StyleSheet } from 'react-native';

const Form = ({ modal, userList, onLogin, setUserList }) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showHours, setShowHours] = useState(false);
  const [records, setRecords] = useState([]);

  const handleLogin = () => {
    const user = userList.find(user => user.username === loginUsername && user.password === loginPassword);
    if (user) {
      setLoggedInUser(user);
    } else {
      Alert.alert('Datos incorrectos');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    onLogin();
  };

  const handleRegisterHours = () => {
    if (selectedEndTime) {
      const hoursWorked = calculateHoursWorked(selectedStartTime, selectedEndTime, amPm);

      const newRecord = {
        date: selectedDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        totalHours: hoursWorked,
      };

      setRecords([...records, newRecord]);

      setShowHours(true);
    } else {
      Alert.alert('Ingresa la hora de salida.');
    }
  };

  const calculateHoursWorked = (startTime, endTime, amPm) => {
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1].split(' ')[0]);
    let endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);

    if (amPm === 'PM' && endHour !== 12) {
      endHour += 12;
    }

    const hoursDiff = endHour - startHour + (endMinute - startMinute) / 60;
    return `${hoursDiff.toFixed(2)} horas`;
  };

  const [selectedDate, setSelectedDate] = useState('');
  const selectedStartTime = '07:00 AM';
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [amPm, setAmPm] = useState('AM');
  const [totalHours, setTotalHours] = useState('');

  return (
    <ScrollView style={styles.container}>
      {modal && (
        <React.Fragment>
          {loggedInUser ? (
            <React.Fragment>
              <Text style={styles.titulo}>Bienvenido, {loggedInUser.username}!</Text>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.btnTextoNuevaCita}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={styles.titulo}>Inicio de Sesión</Text>
              <TextInput
                placeholder="Nombre de Usuario"
                onChangeText={text => setLoginUsername(text)}
                value={loginUsername}
                style={styles.input}
              />
              <TextInput
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={text => setLoginPassword(text)}
                value={loginPassword}
                style={styles.input}
              />
              <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}

          {loggedInUser && (
            <View>
              <Text style={styles.titulo}>Registro de Horas</Text>
              <TextInput
                placeholder="Fecha (DD/MM/YYYY)"
                onChangeText={text => setSelectedDate(text)}
                value={selectedDate}
                style={styles.input}
              />
              <Text style={styles.titulo}>Hora de Inicio: {selectedStartTime}</Text>
              <TextInput
                placeholder="Hora de Salida (HH:mm) (Ejemplo: 4:00)"
                onChangeText={text => setSelectedEndTime(text)}
                value={selectedEndTime}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setAmPm(amPm === 'AM' ? 'PM' : 'AM')}>
                <Text style={styles.btnTextoNuevaCita}>{amPm}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registerButton} onPress={handleRegisterHours}>
                <Text style={styles.buttonText}>Registrar Horas</Text>
              </TouchableOpacity>
              {showHours && (
                <View>
                  <Text style={styles.titulo}>Registros de Horas:</Text>

                  {records.map((record, index) => (
                    <View key={index} style={styles.registeredContainer}>
                      <Text>Fecha: {record.date}</Text>
                      <Text>Hora de Inicio: {record.startTime}</Text>
                      <Text>Hora de Salida: {record.endTime}</Text>
                      <Text>Total de horas trabajadas: {record.totalHours}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </React.Fragment>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CDCA1C',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 'auto',
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
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  registeredContainer: {
    marginTop: 20,
  },
});

export default Form;


