import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Image } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Logo from '../components/Logo';

export default function PrincipalScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <FontAwesome5 name="user-circle" size={28} color="#4caf50" />
          <Text style={styles.greeting}>Olá Usuário!</Text>
        </View>
        <Logo size={110} />
        <MaterialIcons name="mail-outline" size={28} color="#333" style={styles.mailIcon} />
      </View>

      {/* Tabs Menu */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Cozinha{'\n'}Comunitária</Text>
        </View>
        <View style={[styles.tabItem, styles.tabActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Restaurante{'\n'}Popular</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Banco de{'\n'}Alimentos</Text>
        </View>
        <View style={styles.menuIconContainer}>
          <MaterialIcons name="menu" size={24} color="#333" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop' }} 
            style={styles.infoImage} 
          />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Restaurante Popular</Text>
            <Text style={styles.infoDescription}>
              São equipamentos públicos de segurança alimentar criados para oferecer refeições saudáveis, balanceadas e de qualidade a preços muito acessíveis ou gratuitamente.
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Pesquisar..." 
            placeholderTextColor="#888"
          />
          <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop' }} 
            style={styles.mapImage} 
          />
          <View style={styles.mapPin}>
            <FontAwesome5 name="map-marker-alt" size={24} color="#e53935" />
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.hideButtonContainer}>
            <MaterialIcons name="arrow-drop-down" size={24} color="#333" />
          </View>
          <View style={styles.bottomCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop' }} 
              style={styles.bottomCardImage} 
            />
            <View style={styles.bottomCardContent}>
              <Text style={styles.bottomCardTitle}>Restaurante Popular de Maceió</Text>
              <Text style={styles.bottomCardLabel}>Endereço: <Text style={styles.bottomCardText}>R. Barão de Maceió, 2-46 - Centro, Maceió - AL, 57020-360</Text></Text>
              <Text style={styles.bottomCardLabel}>Horário de funcionamento:</Text>
              <Text style={styles.bottomCardText}>Segunda a sexta-feira</Text>
              <Text style={styles.bottomCardText}>10:00 às 14:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2DF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50, // safe area estimate
    paddingBottom: 16,
    backgroundColor: '#fff',
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8832A',
    opacity: 0.8,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
  },
  tabActive: {
    backgroundColor: '#E8832A',
    opacity: 1,
  },
  tabText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: 'bold',
  },
  menuIconContainer: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8832A',
  },
  scrollContent: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 11,
    color: '#666',
    lineHeight: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3E3AE',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 8,
  },
  mapContainer: {
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#add8e6',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPin: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  hideButtonContainer: {
    backgroundColor: '#F7F2DF',
    paddingHorizontal: 24,
    paddingVertical: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#e0d8b0',
    marginBottom: -1,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCard: {
    backgroundColor: '#F7F2DF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e0d8b0',
    width: '100%',
  },
  bottomCardImage: {
    width: 70,
    height: 70,
    borderRadius: 4,
    marginRight: 12,
  },
  bottomCardContent: {
    flex: 1,
  },
  bottomCardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bottomCardLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  bottomCardText: {
    fontWeight: 'normal',
    color: '#555',
  },
});
