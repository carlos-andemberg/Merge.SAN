import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Animated, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import InfoCard from '../components/InfoCard';
import BottomCard from '../components/BottomCard';
import MapDisplay from '../components/MapDisplay';
import TabMenu, { TabItem } from '../components/TabMenu';
import SearchBar from '../components/SearchBar';

// Dados simulados para os diferentes serviços
const SERVICES_DATA = [
  {
    id: 'restaurante_popular',
    title: 'Restaurante Popular',
    description: 'São equipamentos públicos de segurança alimentar criados para oferecer refeições saudáveis, balanceadas e de qualidade a preços muito acessíveis ou gratuitamente.',
    address: 'R. Barão de Maceió, 2-46 - Centro, Maceió - AL, 57020-360',
    hours: ['Segunda a sexta-feira', '10:00 às 14:00'],
    coordinate: { latitude: -9.665984, longitude: -35.735275 },
    imageUri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'cozinha_comunitaria',
    title: 'Cozinha Comunitária',
    description: 'Unidades que visam garantir alimentação adequada e saudável para a população em situação de vulnerabilidade, oferecendo refeições diárias gratuitas ou a preço simbólico.',
    address: 'Rua do Sol, 123 - Centro, Maceió - AL',
    hours: ['Segunda a sábado', '11:00 às 13:30'],
    coordinate: { latitude: -9.663111, longitude: -35.737111 },
    imageUri: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'banco_alimentos',
    title: 'Banco de Alimentos',
    description: 'Central de captação e distribuição de alimentos provenientes de doações, evitando o desperdício e encaminhando para instituições assistenciais cadastradas.',
    address: 'Av. Fernandes Lima, 400 - Farol, Maceió - AL',
    hours: ['Segunda a sexta-feira', '08:00 às 17:00'],
    coordinate: { latitude: -9.645000, longitude: -35.730000 },
    imageUri: 'https://images.unsplash.com/photo-1593113554162-8e1cb160100f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'horta_comunitaria',
    title: 'Horta Comunitária',
    description: 'Espaço para cultivo coletivo de hortaliças e plantas medicinais, promovendo integração social, educação ambiental e geração de renda.',
    address: 'Av. Menino Marcelo, S/N - Serraria, Maceió - AL',
    hours: ['Todos os dias', '06:00 às 18:00'],
    coordinate: { latitude: -9.580000, longitude: -35.750000 },
    // sem imagem para testar o fallback da Logo
  }
];

const TAB_ITEMS: TabItem[] = SERVICES_DATA.map(s => ({
  id: s.id,
  title: s.title.replace(' ', '\n'), // Quebra de linha para ficar igual ao layout original
}));

export default function PrincipalScreen() {
  const [isOpen, setIsOpen] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [cardHeight, setCardHeight] = useState(0);
  
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_DATA[0].id);

  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const toggleCard = () => {
    const distance = cardHeight > 0 ? cardHeight : 150;
    Animated.timing(slideAnim, {
      toValue: isOpen ? distance : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Ionicons name="person-circle-outline" size={36} color="#4caf50" />
          <Text style={styles.greeting}>Olá Usuário!</Text>
        </View>
        <Logo size={110} />
        <FontAwesome name="envelope" size={24} color="#333" style={styles.mailIcon} />
      </View>

      {/* Tabs Menu Componentizado */}
      <TabMenu 
        items={TAB_ITEMS}
        selectedId={selectedServiceId}
        onSelect={setSelectedServiceId}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        
        <InfoCard 
          title={selectedService.title}
          description={selectedService.description}
          imageUri={selectedService.imageUri}
        />

        {/* Search Component */}
        <SearchBar 
          data={SERVICES_DATA} 
          onSelect={setSelectedServiceId} 
        />

        <MapDisplay 
          coordinate={selectedService.coordinate}
          markerText={selectedService.title}
        />

      </ScrollView>

      {/* Bottom Section */}
      <Animated.View style={[styles.bottomSection, { transform: [{ translateY: slideAnim }] }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={toggleCard} style={styles.hideButtonContainer}>
          <MaterialIcons name={isOpen ? "arrow-drop-down" : "arrow-drop-up"} size={24} color="#333" />
        </TouchableOpacity>
        
        <View onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)} style={styles.bottomCardWrapper}>
          <BottomCard 
            title={selectedService.title}
            address={selectedService.address}
            hours={selectedService.hours}
            imageUri={selectedService.imageUri}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FEF7E0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  mailIcon: {
    marginLeft: 10,
  },
  scrollContent: {
    padding: 16,
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
    paddingHorizontal: 32,
    paddingVertical: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: -1,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCardWrapper: {
    width: '100%',
  },
});
