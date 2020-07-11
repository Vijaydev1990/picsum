import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Button,
  Modal,
  TouchableHighlight,
  TouchableHighlightComponent,
  Dimensions,
} from 'react-native';

import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
function CustomModal(props) {
  const {isModalVisible, imagelist, isPortrait} = props;
  return (
    <>
      <View style={styles.wrapper}>
        <Modal transparent={true} visible={isModalVisible} animationType="fade">
          <View
            onPress={() => {
              props.toggleModal(false);
            }}
            style={styles.container}>
            <View
              style={
                isPortrait
                  ? styles.modalBodyPortrait
                  : styles.modalBodyLandscape
              }>
              <Image
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
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
                <TouchableHighlight
                  underlayColor="#ffffff00"
                  activeOpacity={0.9}
                  style={{height: 50, width: 50}}
                  onPress={() => props.downloadImage(imagelist.download_url)}>
                  <Image
                    source={require('../../../assets/img/download.png')}
                    style={styles.downloadImg}
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="#ffffff00"
                  activeOpacity={0.9}
                  style={{height: 50, width: 50}}
                  onPress={() => props.shareImage(imagelist.download_url)}>
                  <Image
                    source={require('../../../assets/img/share.png')}
                    style={styles.shareImg}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.closeWrapper}>
                <TouchableHighlight
                  underlayColor="#ffffff00"
                  activeOpacity={0.9}
                  style={{height: 50, width: 50}}
                  onPress={() => props.toggleModal()}>
                  <Image
                    source={require('../../../assets/img/close.png')}
                    style={styles.closeImg}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

export default CustomModal;
