/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [dataArray, setDataArray] = useState([
    {name: '', email: '', password: ''},
    {name: '', email: '', password: ''},
  ]);
  const [isSecure, setIsSecure] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  function validatePassword(password) {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  function validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            dataArray.pop();
            setRefresh(!refresh);
          }}>
          <Image style={styles.btnImg} source={require('./assets/minus.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            let params = {name: '', email: '', password: ''};
            dataArray.push(params);
            setRefresh(!refresh);
          }}>
          <Image style={styles.btnImg} source={require('./assets/plus.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={backgroundStyle}>
        <FlatList
          data={dataArray}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator100} />;
          }}
          ListEmptyComponent={() => {
            return (
              <Text style={styles.emptyListTxt}>{'No data available'}</Text>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.mainView,
                  index === 0 && styles.marginTop20,
                  index + 1 === dataArray.length && styles.listStyle,
                ]}>
                <Text>{`User Form ${index + 1}`}</Text>
                <TextInput
                  keyboardType="default"
                  label="Name"
                  style={styles.textInput}
                  outlineColor="#F2F7FD"
                  mode="outlined"
                  placeholder="Test Name"
                  onChangeText={text => {
                    dataArray[index].name = text;
                    setRefresh(!refresh);
                  }}
                />
                {item.name.trim().length < 5 && (
                  <Text style={styles.errorTxt}>
                    {'Name must be 5 character long'}
                  </Text>
                )}
                <TextInput
                  keyboardType="default"
                  label="Email"
                  style={styles.textInput}
                  autoCapitalize={'none'}
                  outlineColor="#F2F7FD"
                  mode="outlined"
                  placeholder="abc@gmail.com"
                  onChangeText={text => {
                    dataArray[index].email = text;
                    setRefresh(!refresh);
                  }}
                />
                {!validateEmail(item.email) && (
                  <Text style={styles.errorTxt}>
                    {'Please enter valid email'}
                  </Text>
                )}
                <TextInput
                  keyboardType="default"
                  label="Password"
                  style={styles.textInput}
                  outlineColor="#F2F7FD"
                  mode="outlined"
                  secureTextEntry={isSecure}
                  placeholder="*********"
                  onChangeText={text => {
                    dataArray[index].password = text;
                    setRefresh(!refresh);
                  }}
                  right={
                    <TextInput.Icon
                      name={isSecure ? 'eye-off' : 'eye'}
                      onPress={() => setIsSecure(!isSecure)}
                    />
                  }
                />
                {!validatePassword(item.password) && (
                  <Text style={styles.errorTxt}>
                    {
                      'Password must be 8 characters long including 1 uppercase letter, 1 special character, and alphanumeric characters '
                    }
                  </Text>
                )}
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '80%',
    alignSelf: 'center',
  },
  marginTop20: {
    marginTop: 20,
  },
  textInput: {
    backgroundColor: '#F2F7FD',
    marginTop: 20,
    borderRadius: 15,
    borderBottomColor: '#FFFFFF',
    color: '#011E46',
    fontSize: 16,
  },
  headerView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnImg: {
    height: 15,
    width: 15,
  },
  separator100: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 20,
  },
  listStyle: {
    marginBottom: 80,
  },
  errorTxt: {
    top: 5,
    color: 'red',
  },
  emptyListTxt: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'grey',
    marginTop: '60%',
  },
});

export default App;
