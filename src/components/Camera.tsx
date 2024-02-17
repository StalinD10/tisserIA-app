import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'expo-camera';
import { PermissionsAndroid, Platform, View } from 'react-native';

function CameraPhoto() {

    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [image, setImage] = useState();
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode);
    const cameraRef: any = useRef(null);

    useEffect(() => {
        hasPermission();
    }, [])

    const hasPermission = async () => {
        const permission = Platform.Version >= "33"
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === "granted";
    };


    const takePicture = async () => {

        if (cameraRef) {
            try {

                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <View>
           
        </View>
    )
}

export default CameraPhoto
