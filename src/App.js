import React, {useState, useEffect} from 'react';
import {View,
        SafeAreaView,
        StatusBar,
        StyleSheet,
        Image,
        Button,
        TouchableOpacity,
        Linking} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const corDeFundo = "#1C1C1C";

const App = () => {
  const [toggle, setToggle] = useState(false);

  const iconsDir = "../assets/icons/";

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    // muda o toggle quando o celular for chacoalhado
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    // chamada quando o componente for ser desmontado
    return () => subscription.remove();
  }, []);

  const timedToggle = () => {
    console.log("timedToggle ativado");
    setTimeout(() => {
      handleChangeToggle();
      console.log("timedToggle finalizado");
    }, 300000 ); // 300000 ms = 5 minutos
  };

  const openGitHubURL = async () => {
    let url = 'https://github.com/jultty/dio-flashlight';
    console.log('Abrindo URL: ' + url);
    const response = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  };

  // main App() return
  return (
    <SafeAreaView style={toggle ? style.containerLight : style.container}>
      <StatusBar backgroundColor={corDeFundo} barStyle="light-content"/>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
        accessibilityLabel={"Ícone de uma lâmpada: toque para alternar a lanterna"}
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require(iconsDir + "eco-light.png")
              : require(iconsDir + "eco-light-off.png")
          }
        />
      </TouchableOpacity>
      <Image
        accessibilityLabel={"Logo da DIO"}
        style={style.dioLogo}
        source={
          toggle
            ? require(iconsDir + "logo-dio.png")
            : require(iconsDir + "logo-dio-white.png")
          }
        />
      <Button
        onPress={timedToggle}
        title="Alternar em 5 minutos"
        color="#7764D8"
        accessibilityLabel="Alternar estado da lanterna após 5 minutos"
      />
      <TouchableOpacity onPress={openGitHubURL}>
        <Image
          accessibilityLabel={"Logo do GitHub"}
          style={style.github}
          source={
            toggle
              ? require(iconsDir + "github_black.png")
              : require(iconsDir + "github_white.png")
            }
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corDeFundo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  github: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 45,
    height: 45,
    marginTop: 50,
  },
});
