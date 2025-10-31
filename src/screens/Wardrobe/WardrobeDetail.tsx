import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  FlatList
} from 'react-native';
import IMAGES from '../../constants/images';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const wardrobeItems = [
  { id: 1, label: 'Dresses', icon: IMAGES.dress1 },
  { id: 2, label: 'Tops', icon: IMAGES.tops },
  { id: 3, label: 'Pants', icon: IMAGES.pants },
  { id: 4, label: 'Jeans' , icon: IMAGES.jeans},
];

const WardrobeDetail = ({ route }: { route: any }) => {
  const { wardrobeData } = route.params;

  const navigation = useNavigation();
  const [mappedList, setMappedList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getMappedDetails();
  }, []);

  const getMappedDetails = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled(
        wardrobeData.map(async (item: any, index: number) => {
          const imageUrl = `https://demo03.tryndbuy.com/images/tn${item.SKUID}.jpg`;
          const isValid = await checkImageExists(imageUrl);
          return {
            ...item,
            imageUrl: isValid ? imageUrl : Image.resolveAssetSource(wardrobeItems[index]?.icon).uri,
            label: wardrobeItems[index]?.label || "...",
          };
        })
      );
      const data = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value);

      setMappedList(data);
    } catch (error) {
      console.error('Error fetching mapped list:', error);
    }
    finally {
      setLoading(false);
    }
  };
  const checkImageExists = async (url: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(url, { method: 'GET', signal: controller.signal });
      clearTimeout(timeout);
      return res.ok && res.status !== 404;
    } catch {
      return false;
    }
  };

  const onClickImage = (data: any) => {
    ToastAndroid.show(`Selected SKU: ${data?.SKUID}`, ToastAndroid.BOTTOM);
  }

  const renderItem = ({ item } : {item: any}) => {
    return(
      <TouchableOpacity style={styles.typeItem} onPress={() => onClickImage(item)}>
        <Image
          source={item.imageUrl ? { uri: item.imageUrl} : item.icon}
          style={styles.typeImage}
          resizeMode="contain"
          onError={({ nativeEvent }) => {
            console.log('Image failed:', nativeEvent?.error);
          }}
        />
        <Text style={styles.typeLabel}>{item.label}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={navigateBack}>
          <Image source={IMAGES.leftBlackArrow} style={styles.leftArrow} />
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.points}>💰 5,000</Text>
          <Text style={styles.points}>⏳ 225/100</Text>
          <Text style={styles.points}>💎 1,200</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.modelContainer}>
          <Image
            source={IMAGES.landingBg}
            style={styles.bgImg}
            resizeMode="cover"
          />
          <View style={styles.absolute}>
            <Image
              source={IMAGES.model}
              style={styles.model}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={styles.typesContainer}
        >
          <Text style={styles.typesTitle}>Types</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#000" style={{ marginTop: 30 }} />
          ) 
          : mappedList.length === 0 ? (
            <Text style={styles.emptyText}>No images available</Text>
          ) 
          : (
            <FlatList
              data={mappedList}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.listRow}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
            />
          )}
          
        </View>
      </View>
    </View>
  );
};

export default WardrobeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 20,
  },
  points: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    flex: 1,
    justifyContent: 'center',
  },
  leftArrow: {
    height: 15,
    width: 15,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  bgImg: {
    height: '100%',
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: -height * 0.13,
  },
  model: {
    height: height * 0.7,
    width: width * 0.55,
  },
  modelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typesContainer: {
    flex: 0.8,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  typesTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeItem: {
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingBottom: 6
  },
  typeImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginTop: 4
  },
  typeLabel: {
    marginVertical: 6,
    fontSize: 13,
    fontWeight: '600',
  },
  listRow: { justifyContent: 'space-between' },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#666', fontSize: 14 },
});
