import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface TabItem {
  id: string;
  title: string;
}

export interface TabMenuProps {
  items: TabItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function TabMenu({ items, selectedId, onSelect }: TabMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderedItems, setOrderedItems] = useState(items);

  useEffect(() => {
    if (items.length !== orderedItems.length) {
      setOrderedItems(items);
    }
  }, [items]);
  
  const mainItems = orderedItems.slice(0, 3);
  const extraItems = orderedItems.slice(3);

  const handleSelect = (id: string) => {
    const clickedIndex = orderedItems.findIndex(i => i.id === id);
    if (clickedIndex >= 3) {
      // Está no menu dropdown. Troca com o item atualmente selecionado nas abas principais.
      const currentSelectedIndex = orderedItems.findIndex(i => i.id === selectedId);
      const swapIndex = currentSelectedIndex !== -1 && currentSelectedIndex < 3 ? currentSelectedIndex : 2;
      
      const newOrdered = [...orderedItems];
      const temp = newOrdered[swapIndex];
      newOrdered[swapIndex] = newOrdered[clickedIndex];
      newOrdered[clickedIndex] = temp;
      
      setOrderedItems(newOrdered);
    }

    onSelect(id);
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {mainItems.map((item) => {
          const isActive = item.id === selectedId;
          return (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.tabItem, isActive && styles.tabActive]}
              onPress={() => handleSelect(item.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
        {extraItems.length > 0 && (
          <TouchableOpacity 
            style={styles.menuIconContainer} 
            onPress={() => setIsMenuOpen(true)}
            activeOpacity={0.7}
          >
            <Feather name="menu" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownMenu}>
              {extraItems.map((item) => {
                const isActive = item.id === selectedId;
                return (
                  <TouchableOpacity 
                    key={item.id} 
                    style={[styles.dropdownItem, isActive && styles.dropdownItemActive]}
                    onPress={() => handleSelect(item.id)}
                  >
                    <Text style={[styles.dropdownText, isActive && styles.tabTextActive]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10, // Ensure dropdown overlays properly if we didn't use Modal
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8832A',
    opacity: 0.9,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
  },
  tabActive: {
    backgroundColor: '#DA761E',
    opacity: 1,
  },
  tabText: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: 'bold',
  },
  menuIconContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8832A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdownMenu: {
    marginTop: 130, // Adjust this based on header height
    marginRight: 16,
    backgroundColor: '#E8832A', // Mesmo padrão do menu principal
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemActive: {
    backgroundColor: '#DA761E', // Mesma cor da aba ativa
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
});
