import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Button,
  Modal,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Dimensions,
} from 'react-native';

import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

import CustomModal from '../customModal';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

function Imgcontainer(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const {imagelists} = props;
  Dimensions.addEventListener('change', () => {
    checkisPortrait();
  });
  function checkisPortrait() {
    const dim = Dimensions.get('window');
    if (dim.height >= dim.width) {
      setIsPortrait(true);
    }
    if (dim.width >= dim.height) {
      setIsPortrait(false);
    }
  }
  function toggleModal() {
    setModalVisible(false);
  }
  const checkPermission = async () => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading
          downloadImage();
        } else {
          //If permission denied then show alert 'Storage Permission Not Granted'
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    }
  };
  const downloadImage = (url) => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to download Photos',
      },
    ).then((result) => {
      if (result === 'granted') {
        downloadUrl(url);
      }
    });
  };

  function downloadUrl(url) {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    //Image URL which we want to download
    let image_URL = url;
    //Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + 'jpg';
    //Get config and fs from RNFetchBlob
    //config: To pass the downloading related options
    //fs: To get the directory path in which we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        //Showing alert after successful downloading
        ToastAndroid.show('Downloaded Successfully..!', ToastAndroid.BOTTOM);
      });
  }

  const getExtention = (filename) => {
    //To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  function convertBase64(url) {
    ToastAndroid.show('Loading..!', ToastAndroid.BOTTOM);
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', url)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then((base64Data) => {
        // here's base64 encoded image
        shareImage(base64Data);
        // remove the file from storage
      });
  }

  function shareImage(url) {
    const shareOptions = {
      title: 'Share via',
      url: 'data:image/png;base64,' + url,

      social: Share.Social.WHATSAPP,
      whatsAppNumber: '9199999999', // country code + phone number
      filename: 'Image', // only for base64 file in Android
    };

    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }
  return (
    <>
      <View style={styles.wrapper}>
        {imagelists &&
          imagelists.length > 0 &&
          imagelists.map((imagelist, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.container}
                onPress={() => {
                  setSelectedImage(imagelist);
                  setModalVisible(true);
                }}>
                <Image
                  style={styles.displayImage}
                  source={{
                    uri: imagelist.download_url,
                  }}
                />
                <View style={styles.infoWrapper}>
                  <Image
                    source={require('../../../assets/img/author.png')}
                    style={styles.authorImg}
                  />
                  <Text style={styles.authorText}>{imagelist.author}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
      <CustomModal
        isModalVisible={isModalVisible}
        imagelist={selectedImage}
        toggleModal={toggleModal}
        downloadImage={downloadImage}
        shareImage={convertBase64}
        isPortrait={isPortrait}
      />
    </>
  );
}

export default Imgcontainer;
