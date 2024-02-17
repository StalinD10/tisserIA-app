import { AntDesign, Fontisto } from '@expo/vector-icons';
import { styled } from 'nativewind'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Keyboard, Text, TextInput, View, useColorScheme } from 'react-native';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import GoogleIcon from '../icons/GoogleIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';
import { onLog } from 'firebase/app';
import LoadingScreen from '../screens/LoadingScreen';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledIcon = styled(Fontisto);
const StyledIconLock = styled(AntDesign);
const StyledTouchable = styled(TouchableOpacity);

function RegisterUser() {

  const colorScheme = useColorScheme();
  const { singUp, errorMessage, removeError } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);


  const { email, password, username, onChange } = useForm({
    email: '',
    password: '',
    username: ''
  });

  const onRegister = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      await singUp({ email, password, username });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledView className='flex-1 justify-center dark:bg-black'>

      <StyledText className='text-center font-bold text-2xl dark:text-white m-1'>Registrar</StyledText>

      <StyledView className='flex-row items-center mx-4 border-b-2 border-red-200 dark:border-sky-900'>
        <StyledIcon name="email" size={24} className='color-gray-400' />
        <StyledTextInput
          className='w-60 m-3 p-2 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white focus:ring-red-400
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          inputMode='email'
          placeholder='E-mail'
          value={email}
          onChangeText={(value) => onChange(value, 'email')}
          onSubmitEditing={onRegister}
          placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
          contextMenuHidden={true}
        />
      </StyledView>

      <StyledView className='flex-row items-center mx-4 border-b-2 border-red-200 dark:border-sky-900'>
        <StyledIconLock name="user" size={24}  className='color-gray-400' />
        <StyledTextInput
          className='w-60 m-3 p-2 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white focus:ring-red-400
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
          placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
          placeholder='Username'
          value={username}
          onChangeText={(value) => onChange(value, 'username')}
          onSubmitEditing={onRegister}
        />
      </StyledView>

      <StyledView className='flex-row items-center mx-4 border-b-2 border-red-200 dark:border-sky-900'>
        <StyledIconLock name="lock" size={24} color="black" className='color-gray-400' />
        <StyledTextInput
          className='w-60 m-3 p-2 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white focus:ring-red-400
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
          placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
          secureTextEntry={true}
          placeholder='Contraseña'
          value={password}
          onChangeText={(value) => onChange(value, 'password')}
          onSubmitEditing={onRegister}
        />
      </StyledView>

      {isLoading ? (
        <LoadingScreen isLoading={true} />
      ) :
        <>
          <StyledView className='items-center mb-2'>
            <StyledTouchable className='flex-row items-center my-5 rounded-lg border-2 p-1 border-gray-300 dark:border-sky-900'>
              <GoogleIcon
                width={30}
                height={30}
              />
              <StyledText className='text-gray-600 dark:text-gray-300'>Registrate con Google</StyledText>

            </StyledTouchable>

            <Button
              title='Registrarse'
              textSize='text-sm'
              marginText='m-3 px-10'
              onPress={onRegister}
            />

          </StyledView>
        </>}
    </StyledView>
  )
}

export default RegisterUser