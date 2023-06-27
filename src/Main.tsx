import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {
  ButtonCus,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  TextCus,
  TextInputCus,
} from './Components';
import {Color} from './Utils';
import {HeaderCus} from './Components/headerCustom';
import {
  font18,
  font20,
  iconSize18,
  iconSize24,
  iconSize5,
  px5,
  width,
} from './Constants';
import LinearGradient from 'react-native-linear-gradient';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

interface MainProps {}

export const Main: React.FC<MainProps> = () => {

  const player1Ref = useRef<TextInput>(null);
  const player2Ref = useRef<TextInput>(null);

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [listAllPlayers, setListAllPlayers] = useState<Array<string>>([]);
  const [listAllPlayersTmp, setListAllPlayersTmp] = useState<Array<string>>([]);

  const addPlayers = () => {
    if (player1 != '' || player2 != '') {
      let listAll = [...listAllPlayers];
      let listAllTmp = [...listAllPlayersTmp];
      let couple = player1 + '-' + player2;
      listAll.push(couple);
      listAllTmp.push(couple);
      setListAllPlayers(listAll);
      setListAllPlayersTmp(listAllTmp);

      setPlayer1('');
      setPlayer2('');
    }
  };

  const randomTeam = () => {
    let listAll = [...listAllPlayers];
    let listAllTmp = [] as any;
    listAll.map((value: any) => {
      let i = Math.floor(Math.random() * 10);
      let splitItem = value.split('-');
      if (i % 2 == 0) {
        listAllTmp.push(splitItem[1] + '-' + splitItem[0]);
      } else {
        listAllTmp.push(splitItem[0] + '-' + splitItem[1]);
      }
    });
    setListAllPlayersTmp(listAllTmp);
  };

  const removeCouple = (i: number) => {
    let listAll = [...listAllPlayers];
    let listAllTmp = [...listAllPlayersTmp];

    listAll.splice(i, 1);
    listAllTmp.splice(i, 1);

    setListAllPlayers(listAll);
    setListAllPlayersTmp(listAllTmp);
  };

  const removeAll = () => {
    setListAllPlayers([]);
    setListAllPlayersTmp([]);
  };

  const rightSwipe = (i: number) => {
    return (
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={[Color.red, Color.orange]}
        style={{}}>
        <ButtonCus
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: width / 6,
            height: '100%',
          }}
          children={
            <FontAwesome
              name="trash-o"
              size={iconSize5 * 4}
              color={Color.white}
            />
          }
          onPress={() => removeCouple(i)}
        />
      </LinearGradient>
    );
  };

  let rowRefs = new Map();

  const renderItem = ({item, index}: {item: any; index: number}) => {
    let splitItem = item.split('-');

    return (
      <GestureHandlerRootView>
        <Swipeable
          ref={ref => {
            if (ref && !rowRefs.get(index)) {
              rowRefs.set(index, ref);
            }
          }}
          onSwipeableWillOpen={() => {
            [...rowRefs.entries()].forEach(([key, ref]) => {
              if (key !== index && ref) ref.close();
            });
          }}
          renderRightActions={() => rightSwipe(index)}
          containerStyle={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: index < listAllPlayersTmp.length - 1 ? 1 : 0,
              borderColor: Color.borderInput,
              paddingVertical: px5 * 4,
            }}>
            <View style={{flex: 0.4, alignItems: 'center'}}>
              <TextCus
                children={splitItem[0]}
                style={{fontSize: font20 * 1.2}}
              />
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <Ionicons name="ios-remove-outline" size={iconSize18} />
            </View>
            <View style={{flex: 0.4, alignItems: 'center'}}>
              <TextCus
                children={splitItem[1]}
                style={{fontSize: font20 * 1.2}}
              />
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          data={listAllPlayersTmp}
          contentContainerStyle={{paddingHorizontal: px5 * 4}}
          ListHeaderComponent={
            <View
              style={{
                alignItems: 'center',
                paddingTop: px5 * 6,
                marginBottom: px5 * 3,
              }}>
              <HeaderCus
                title="Chia team"
                styleTitle={{
                  fontWeight: 'bold',
                  fontSize: font18 * 2,
                }}
                rightComponent={
                  <ButtonCus
                    style={{paddingRight: px5 * 1.5}}
                    children={
                      <FontAwesome5
                        name="recycle"
                        size={iconSize24 * 1.3}
                        color={Color.thinblue}
                      />
                    }
                    isOpacity
                    onPress={removeAll}
                  />
                }
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width,
                  paddingHorizontal: px5 * 4,
                  marginTop: px5 * 6,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Color.borderInput,
                    flex: 0.35,
                    borderRadius: px5,
                  }}>
                  <TextInputCus
                    onRef={player1Ref}
                    placeholder="Player 1..."
                    value={player1}
                    onTextChange={setPlayer1}
                    styleContainerTextInput={{
                      paddingHorizontal: px5 * 2,
                    }}
                    styleTextInput={{fontSize: font18, height: px5 * 12}}
                    autoCapitalize="none"
                    onSubmitEditing={() => player2Ref.current?.focus()}
                  />
                </View>
                <View style={{flex: 0.1, alignItems: 'center'}}>
                  <Ionicons name="ios-remove-outline" size={iconSize24} />
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Color.borderInput,
                    flex: 0.35,
                    borderRadius: px5,
                  }}>
                  <TextInputCus
                    onRef={player2Ref}
                    placeholder="Player 2..."
                    value={player2}
                    onTextChange={setPlayer2}
                    styleContainerTextInput={{
                      paddingHorizontal: px5 * 2,
                    }}
                    styleTextInput={{fontSize: font18, height: px5 * 12}}
                    autoCapitalize="none"
                  />
                </View>
                <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                  <LinearGradient
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={[Color.darkgreen, Color.orange]}
                    style={{borderRadius: px5}}>
                    <ButtonCus
                      style={{
                        paddingHorizontal: px5 * 3,
                        height: px5 * 12,
                        justifyContent: 'center',
                      }}
                      children={
                        <FontAwesome
                          name="user-plus"
                          size={iconSize24}
                          color={Color.white}
                        />
                      }
                      isOpacity
                      onPress={addPlayers}
                    />
                  </LinearGradient>
                </View>
              </View>

              <ButtonCus
                style={{marginTop: px5 * 6, marginBottom: px5 * 8}}
                children={
                  <FontAwesome5
                    name="optin-monster"
                    size={iconSize24 * 3}
                    color={Color.skyblue}
                  />
                }
                isOpacity
                onPress={randomTeam}
              />

              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.4, alignItems: 'center'}}>
                  <Ionicons
                    name="shirt"
                    size={iconSize24 * 2.5}
                    color={Color.gray}
                  />
                </View>
                <View style={{flex: 0.2}}></View>
                <View style={{flex: 0.4, alignItems: 'center'}}>
                  <Ionicons
                    name="shirt"
                    size={iconSize24 * 2.5}
                    color={Color.blue}
                  />
                </View>
              </View>
            </View>
          }
          showsVerticalScrollIndicator={false}
          style={{width: '100%', paddingVertical: px5 * 1.5}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  navigation: {
    backgroundColor: Color.white,
  },
  body: {
    alignItems: 'center',
  },
});
