import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import IMAGES from '../constants/images';
import { useNavigation } from '@react-navigation/native';

const UploadScreen = () => {
    const navigation = useNavigation()

    const [selectedImage, setSelectedImage] = useState('');

    const selectFromGallery = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            console.log('image.>>', image);
            setSelectedImage(image.path);
        });
    };

    const selectFromCamera = async () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            useFrontCamera: true,
        }).then(image => {
            console.log('image.>>', image);
            setSelectedImage(image.path);
        });
    };

    const onclickUpload =() => {
        navigation.navigate('PreviewScreen')
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Let's add a Photo</Text>
                </View>
                <View style={styles.center}>
                    {selectedImage ? (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: selectedImage }} style={styles.image} />
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.faceOval}
                            activeOpacity={0.8}
                            onPress={() => selectFromCamera()}
                        >
                            <Text style={styles.plus}>＋</Text>
                            <Text style={styles.text}>Add an image</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {
                    selectedImage?
                    <TouchableOpacity
                    style={styles.uploadBtn}
                    onPress={onclickUpload}
                >
                    <Text style={[styles.btnText, {color:'#FFFFFF'}]}>Upload</Text>
                    </TouchableOpacity>

                :
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => selectFromGallery()}
                    >
                        <Image source={IMAGES.gallery} style={styles.icon} />
                        <Text style={styles.btnText}>From Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => selectFromCamera()}
                    >
                        <Image source={IMAGES.camera} style={styles.icon} />
                        <Text style={styles.btnText}>Take a Selfie</Text>
                    </TouchableOpacity>
                </View>
}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    titleView: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#5C5C5C',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
    },
    faceOval: {
        width: 180,
        height: 240,
        borderWidth: 2,
        borderColor: '#D3D3D8',
        borderStyle: 'dashed',
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
    },
    plus: {
        fontSize: 50,
        color: '#888',
    },
    text: {
        marginTop: 8,
        fontSize: 16,
        color: '#B0B0B5',
        fontWeight: '500',
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 45,
        width: 45,
        marginBottom: 10,
    },
    btn: {
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        height: 240,
        width: 240,
        borderRadius: 240,
        borderColor: '#74B72E',
        borderWidth: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        height: 230,
        width: 230,
        overflow:'hidden',
        borderRadius: 230
    },
    uploadBtn:{
        width:'95%',
        backgroundColor:'#0A0A0A',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems:'center'
    },
    btnText:{
        fontSize: 16,
        lineHeight: 20,
        color: '#5C5C5C',
    }
});

export default UploadScreen;
