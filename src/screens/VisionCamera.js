import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Camera, CameraCapturedPicture } from 'react-native-vision-camera';

const VisionCamera = () => {

  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const takePicture = async () => {
    setLoading(true);
    const photo = await Camera.takePicture();
    setPhoto(photo);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.preview}
        type={Camera.Type.BACK}
        onTap={() => takePicture()}
      />
      {loading && <Text style={styles.loading}>Analyzing Image...</Text>}
      {photo && <Image source={{uri: photo.uri}} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loading: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 20
  }
});

export default VisionCamera;
