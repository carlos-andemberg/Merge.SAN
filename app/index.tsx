import { StyleSheet, View, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../components/Logo';
import BotaoPrimario from '../components/BotaoPrimario';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1577563908411-50cb98976fea?q=80&w=2070&auto=format&fit=crop' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      
      <View style={styles.bottomSheet}>
        <View style={styles.logoContainer}>
          <Logo size={350} />
        </View>

        <BotaoPrimario 
          title="Entre" 
          onPress={() => router.push('/principal')} 
        />
        
        <BotaoPrimario 
          title="Cadastre-se" 
          onPress={() => router.push('/cadastro')} 
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottomSheet: {
    backgroundColor: '#F7F2DF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 10,
    marginTop: 0,
  },
});
