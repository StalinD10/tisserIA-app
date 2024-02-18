import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Text, TouchableOpacity, View, Platform, PermissionsAndroid, useWindowDimensions, Image, Button } from 'react-native';
import * as  ImagePicker from 'expo-image-picker';
import * as  MediaLibrary from 'expo-media-library';
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyleIcon = styled(AntDesign);
const StyleOtherPhoto = styled(Ionicons);
const StyleIcongallery = styled(Ionicons);
const StyleIconCamera = styled(Feather);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);

function PhotoScreen() {

    const [image, setImages]: any = useState();
    const [type, setType] = useState(CameraType.back);
    const [showCamera, setShowCamera] = useState(true);
    const cameraRef: any = useRef();
    const isFocused = useIsFocused();
    const { width, height } = useWindowDimensions();
    const [hasPermission, setHasPermission]: any = useState(null);
    const { navigate }: any = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (isFocused) {
            setShowCamera(true);
        } else {
            setShowCamera(false)
        }

    }, [isFocused])



    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [9, 16],
            quality: 1,
        })

        if (!result.canceled) {
            setImages(result.assets[0].uri);
        }
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setImages(photo.uri)
            } catch (error) {
                console.error('Failed to take picture: ', error);
            }
        } else {
            console.warn('La cámara no está lista para tomar una foto.');
        }
    };


    const changeCamera = () => {
        setImages();
        setShowCamera(true);
    }
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No se ha concedido permiso para usar la cámara.</Text>;
    }
    return (
        <StyledView className='flex-1 bg-white dark:bg-black'>

            {/* header */}
            <Header screen='HomeScreen' image={image} />

            <StyledView className='flex-1 mt-3'>
                {image ?
                    <>
                        <StyledView className='flex-1 mt-3 items-center justify-center'>
                            <StyledImage source={{ uri: image }} className='w-4/5 h-5/6 rounded-3xl' />
                            <StyledView className='flex-row mt-6  items-center justify-center '>
                                <StyledTouchable onPress={changeCamera} className='items-center'>
                                    <StyleOtherPhoto name="repeat-outline" size={32}
                                        className='color-red-300 dark:color-gray-300 border border-red-400 rounded-2xl dark:border-gray-200 p-2 mx-3' />
                                </StyledTouchable>

                                <StyledTouchable onPress={pickImages} className='items-center '>
                                    <StyleIcongallery name="grid" size={32}
                                        className='color-red-300 dark:color-gray-300 border border-red-400 rounded-2xl dark:border-gray-200 p-2 mx-3' />
                                </StyledTouchable>


                            </StyledView>
                        </StyledView>

                    </>
                    :
                    <>
                        <StyledView className='flex-1'>
                            {showCamera &&
                                <Camera style={{ flex: 1, borderRadius: 20 }}
                                    type={type}
                                    ref={cameraRef}
                                >

                                    <StyledView className='flex-1 items-center justify-center'>
                                        <StyledTouchable className='absolute bottom-0 self-start mb-11 px-5' onPress={() => setShowCamera(false)}>
                                            <EvilIcons name="close" size={45} color="white" />
                                        </StyledTouchable>

                                        <StyledTouchable className='absolute bottom-0 self-center mb-5' onPress={takePhoto}>
                                            <FontAwesome name="circle-thin" size={80} color="white" />
                                        </StyledTouchable>

                                        <StyledTouchable className='absolute bottom-0 self-end mb-9 px-5' onPress={pickImages}>
                                            <Ionicons name="grid" size={40} color="white" />
                                        </StyledTouchable>
                                    </StyledView>
                                </Camera>

                            }
                        </StyledView>

                    </>
                }
            </StyledView>
        </StyledView>
    );
}

export default PhotoScreen;