import { StyleSheet, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Logo_app from '../components/Logo_app';
import Botao from '../components/Botao';

export default function PaginaInicial() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tela-inicial.png')}
        style={styles.image}
      />

      <View style={styles.cardLogin}>
        <View style={styles.logoContainer}>
          <Logo_app size={350} />
        </View>

        <Botao
          title="Entre"
          onPress={() => router.push('/login')}
        />

        <Botao
          title="Cadastre-se"
          onPress={() => router.push('/cadastro')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7E0',
  },
  image: {
    width: '100%',
    height: 486,
    resizeMode: 'cover',
    position: 'absolute',
    top: -6,
    left: 0,
  },
  cardLogin: {
    position: 'absolute',
    top: 463,
    width: '100%',
    height: 381,
    backgroundColor: '#FEF7E0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    height: 187,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
