import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface SearchItem {
  id: string;
  title: string;
}

export interface SearchBarProps {
  data: SearchItem[];
  onSelect: (id: string) => void;
}

export default function SearchBar({ data, onSelect }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    onSelect(id);
    setSearchQuery('');
    setIsSearchFocused(false);
    inputRef.current?.blur();
  };

  return (
    <View style={styles.container} importantForAutofill="noExcludeDescendants">
      <View style={styles.searchContainer}>
        <TextInput 
          ref={inputRef}
          style={styles.searchInput} 
          placeholder="Pesquisar..." 
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          autoComplete="off"
          autoCorrect={false}
          importantForAutofill="no"
          textContentType="none"
          spellCheck={false}
          contextMenuHidden={true}
        />
        <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
      </View>

      {isSearchFocused && (
        <View style={styles.recommendationsContainer}>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.recommendationItem}
                onPress={() => handleSelect(item.id)}
              >
                <Text style={styles.recommendationText}>{item.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>Nenhum local encontrado.</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'relative',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3E3AE',
    borderRadius: 8,
    paddingHorizontal: 12,
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
  recommendationsContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#E3E3AE',
    borderRadius: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
  },
  recommendationItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
  },
});
