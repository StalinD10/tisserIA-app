import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { styled } from 'nativewind';
import React, { useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native'
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyleIcon = styled(Feather);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledIcon = styled(Fontisto);
const StyledIconLock = styled(AntDesign);

function UserInformationScreen() {

  const { user } = useContext(AuthContext);
  const colorScheme = useColorScheme();

  return (
    <StyledView className='flex-1 bg-white dark:bg-black'>
     
        <Header screen='SettingsScreen' />
        <StyledView className='items-center m-8 justify-center'>
          <StyledImage source={user && user.image && user.image.image_url ? { uri: user.image.image_url } : require('../img/default-user.jpg')}
            className='w-28 h-28 rounded-full '
          />
          <StyledTouchable className='bg-red-400 dark:bg-sky-800  absolute bottom-0 left-1/2 rounded-full border-2 
       border-gray-300 dark:border-gray-100 p-3'>
            <StyleIcon name="camera" size={23} className='color-gray-100 dark:color-gray-200' />
          </StyledTouchable>
        </StyledView>

        <StyledView className='flex-1 items-center'>
          <StyledView className='self-start mx-11'>
            <StyledText className='text-gray-600 dark:text-gray-300 font-semibold text-lg'>Username</StyledText>
          </StyledView>
          <StyledView className='flex-row items-center  border-b-2 border-red-200 dark:border-sky-900'>
            <StyledIconLock name="user" size={24} className='color-gray-400' />
            <StyledTextInput
              className='w-3/4 h-12 m-3 p-3 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white 
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              inputMode='text'
              value={user?.username}
              placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
              contextMenuHidden={true}
            />
          </StyledView>

          <StyledView className='self-start mx-11 mt-4'>
            <StyledText className='text-gray-600 dark:text-gray-300  font-semibold text-lg'>Correo</StyledText>
          </StyledView>
          <StyledView className='flex-row items-center  border-b-2 border-red-200 dark:border-sky-900'>
            <StyledIcon name="email" size={24} className='color-gray-400' />
            <StyledTextInput
              className='w-3/4 h-12 m-3 p-3 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white 
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              inputMode='text'
              value={user?.email}
              placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
              contextMenuHidden={true}
            />
          </StyledView>

          <StyledView className='self-start mx-11 mt-4'>
            <StyledText className='text-gray-600 dark:text-gray-300 font-semibold text-lg'>Contraseña</StyledText>
          </StyledView>
          <StyledView className='flex-row items-center  border-b-2 border-red-200 dark:border-sky-900'>
            <StyledIconLock name="lock" size={24} className='color-gray-400' />
            <StyledTextInput
              className='w-3/4 h-12 m-3 p-3 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white 
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              inputMode='text'
              value={user?.id}
              placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
              contextMenuHidden={true}
            />
          </StyledView>
        </StyledView>
        <StyledView className='self-center mt-9'>
          <Button onPress={() => console.log('Actualizando')} title='Actualizar' width='w-40' textSize='text-lg' />
        </StyledView>

    </StyledView>
  )
}

export default UserInformationScreen
