import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Animated, TouchableOpacity, Linking, Platform, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Cabecalho from '../components/Cabecalho';
import Card_detalhes_mapa from '../components/Card_detalhes_mapa';
import Card_Equipamento from '../components/Card_Equipamento';
import Mapa from '../components/Mapa';
import Botao from '../components/Botao';
import Menu_Dropdown, { TabItem } from '../components/Menu_Dropdown';
import Pesquisa from '../components/Pesquisa';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getGeminiRecommendations } from '../utils/geminiAPI';
import * as Location from 'expo-location';

const LOADING_PHRASES = [
  "Buscando locais de alimentação próximos...",
  "Mapeando assistência social na sua região...",
  "Estamos configurando para que você tenha uma boa experiência...",
  "Falta muito pouco! Salvando os dados...",
];

const COLORS = ['#F28322', '#44A641', '#0378A6'];

export default function PrincipalScreen() {
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [userCity, setUserCity] = useState('');
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [mapCoords, setMapCoords] = useState<{latitude: number, longitude: number} | null>(null);
  const [loadingMap, setLoadingMap] = useState(false);
  
  const [loadingIndex, setLoadingIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current;
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (retrying) {
      interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 3000);
    } else {
      setLoadingIndex(0);
    }
    return () => clearInterval(interval);
  }, [retrying]);

  const fetchUserData = async () => {
    setLoadingInitial(true);
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserCity(data.cidade || '');
          if (data.locaisSugeridos && Array.isArray(data.locaisSugeridos) && data.locaisSugeridos.length > 0) {
            const mapped = data.locaisSugeridos.map((item: any, index: number) => ({
              id: index.toString(),
              title: item.nome || 'Local S/ Nome',
              description: item.descricao || '',
              address: item.endereco || '',
              hours: item.horario || ['Sem horário'],
              coordinate: item.coordinate || { latitude: 0, longitude: 0 },
              imageUri: item.imageUri
            }));
            setServicesData(mapped);
            if (mapped.length > 0) {
              setSelectedServiceId(mapped[0].id);
            }
          } else {
            setServicesData([]);
          }
        }
      } catch (error) {
        console.log("Erro ao buscar dados na principal:", error);
      }
    }
    setLoadingInitial(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRetryAI = async () => {
    if (!userCity) {
      Alert.alert('Erro', 'Sua cidade não está definida no cadastro.');
      return;
    }
    setRetrying(true);
    const user = auth.currentUser;
    if (user) {
      const novosLocais = await getGeminiRecommendations(userCity);
      if (novosLocais.length > 0) {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            locaisSugeridos: novosLocais
          });
          await fetchUserData(); // Recarrega os dados na tela
        } catch (e) {
          console.log("Erro ao atualizar", e);
        }
      } else {
        Alert.alert("Aviso", "A IA não conseguiu encontrar locais no momento. Tente novamente mais tarde.");
      }
    }
    setRetrying(false);
  };

  const selectedService = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];

  useEffect(() => {
    const geocodeAddress = async () => {
      if (!selectedService || !selectedService.address) return;

      // Otimização: Se a coordenada já existe e não é 0,0, pula o geocoding
      if (selectedService.coordinate && selectedService.coordinate.latitude !== 0) {
        setMapCoords(selectedService.coordinate);
        return;
      }

      setLoadingMap(true);
      try {
        const results = await Location.geocodeAsync(selectedService.address);
        let newCoords = { latitude: -9.665984, longitude: -35.735275 }; // Fallback Maceió
        if (results.length > 0) {
          newCoords = {
            latitude: results[0].latitude,
            longitude: results[0].longitude
          };
        }
        
        setMapCoords(newCoords);

        // Salva no Firestore para as próximas vezes (Desempenho)
        const user = auth.currentUser;
        if (user) {
           const updatedServices = [...servicesData];
           const index = updatedServices.findIndex(s => s.id === selectedService.id);
           if (index !== -1) {
             updatedServices[index].coordinate = newCoords;
             setServicesData(updatedServices);

             const locaisParaSalvar = updatedServices.map(item => ({
               nome: item.title,
               descricao: item.description,
               endereco: item.address,
               horario: item.hours,
               coordinate: item.coordinate,
               imageUri: item.imageUri || ""
             }));

             await updateDoc(doc(db, 'users', user.uid), {
               locaisSugeridos: locaisParaSalvar
             });
           }
        }
      } catch (error) {
        console.log('Erro de geocoding', error);
        setMapCoords({ latitude: -9.665984, longitude: -35.735275 });
      }
      setLoadingMap(false);
    };
    geocodeAddress();
  }, [selectedService]);

  const TAB_ITEMS: TabItem[] = servicesData.map(s => ({
    id: s.id,
    title: s.title.replace(' ', '\n'), // Quebra de linha
  }));

  const openRouteInMaps = () => {
    if (!selectedService) return;
    const query = encodeURIComponent(`${selectedService.title}, ${selectedService.address}`);
    
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`
    });

    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
        }
      });
    }
  };

  const toggleCard = () => {
    const distance = cardHeight > 0 ? cardHeight : 150;
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? distance : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacityAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
    setIsOpen(!isOpen);
  };

  const currentColor = COLORS[loadingIndex % COLORS.length];

  if (loadingInitial) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F28322" />
        <Text style={{ marginTop: 10, fontFamily: 'Inter_500Medium', color: '#31302C' }}>Carregando dados...</Text>
      </View>
    );
  }

  // FALLBACK SE A IA FALHOU E O ARRAY VEIO VAZIO
  if (servicesData.length === 0) {
    return (
      <View style={styles.container}>
        <Cabecalho />
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackTitle}>Nenhum local encontrado</Text>
          <Text style={styles.fallbackText}>Aconteceu uma falha de comunicação com a Inteligência Artificial durante o seu cadastro ou não há dados disponíveis para a sua região.</Text>
          
          {retrying ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={currentColor} style={{ marginBottom: 12 }} />
              <Text style={[styles.loadingText, { color: currentColor }]}>
                {LOADING_PHRASES[loadingIndex]}
              </Text>
            </View>
          ) : (
            <Botao title="Tentar carregar locais por IA" onPress={handleRetryAI} />
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Cabecalho />

      <Menu_Dropdown
        items={TAB_ITEMS}
        selectedId={selectedServiceId}
        onSelect={setSelectedServiceId}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card_Equipamento
          title={selectedService.title}
          description={selectedService.description}
          imageUri={selectedService.imageUri}
        />

        <Pesquisa
          data={servicesData}
          onSelect={setSelectedServiceId}
        />

        {loadingMap || !mapCoords ? (
          <View style={[styles.mapContainerFallback, { height: 300, marginBottom: 16 }]}>
            <ActivityIndicator size="large" color="#F28322" />
            <Text style={{ marginTop: 10, fontFamily: 'Inter_500Medium' }}>Buscando coordenadas...</Text>
          </View>
        ) : (
          <Mapa
            coordinate={mapCoords}
            markerText={selectedService.title}
          />
        )}
      </ScrollView>

      {/* Bottom Section */}
      <Animated.View style={[styles.bottomSection, { transform: [{ translateY: slideAnim }] }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={toggleCard} style={styles.hideButtonContainer}>
          <MaterialIcons name={isOpen ? "arrow-drop-down" : "arrow-drop-up"} size={30} color="#31302C" />
        </TouchableOpacity>

        <View onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)} style={styles.bottomCardWrapper}>
          <Card_detalhes_mapa
            title={selectedService.title}
            address={selectedService.address}
            hours={selectedService.hours}
            imageUri={selectedService.imageUri}
          />
        </View>
      </Animated.View>

      <Animated.View 
        style={[styles.floatingButtonContainer, { opacity: buttonOpacityAnim }]}
        pointerEvents={isOpen ? 'none' : 'auto'}
      >
        <Botao title="Ir até o local" onPress={openRouteInMaps} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7E0',
  },
  scrollContent: {
    padding: 16,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },
  mapContainerFallback: {
    width: '100%',
    maxWidth: 338,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#94AE9F',
    backgroundColor: '#FEF7E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#31302C',
    textAlign: 'center',
  },
  fallbackText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#31302C',
    textAlign: 'center',
    marginBottom: 20,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hideButtonContainer: {
    backgroundColor: '#F7DDB9',
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: -1,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCardWrapper: {
    width: '100%',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    alignItems: 'center',
    zIndex: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    minHeight: 80,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
