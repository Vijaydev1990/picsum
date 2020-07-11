import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, ToastAndroid} from 'react-native';
import Header from '../../components/header';
import Imgcontainer from '../../components/imgcontainer';
import Loader from '../../components/loader';
import styles from './style';
function List() {
  const [totallists, setTotalLists] = useState([]);
  const [imagelists, setImageLists] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [imgCount, setImgCount] = useState(1);
  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=1&limit=50')
      .then((response) => response.json())
      .then((res) => {
        setTotalLists(res);
        showedCount(res);
        setIsloading(false);
      })
      .catch((err) => {
        console.log('error', err);
        setIsloading(false);
        ToastAndroid.show('Network error..!', ToastAndroid.BOTTOM);
      });
  }, []);

  function showedCount(tot) {
    let tempList = [];
    if (tot && tot.length > 0) {
      let currCount = imgCount + 1;
      tempList = tot.filter((totalList, i) => {
        return i <= currCount * 6;
      });
      setImgCount(currCount);
      setImageLists(tempList);
    }
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 2;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  function reachedBottom() {
    ToastAndroid.show('Loading more.....', ToastAndroid.BOTTOM);
    showedCount(totallists);
  }
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerstyle={styles.Viewscroller}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            reachedBottom();
          }
        }}
        scrollEventThrottle={1400}>
        <Header title={'List'} />
        {isloading ? <Loader /> : <Imgcontainer imagelists={imagelists} />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default List;
