import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUsers } from '../../src/hooks/useUsers';

export default function HomeScreen() {
  const {data, loading, error} =  useUsers();
  console.log("DATA:", data);
  console.log("LOADING:", loading);
  console.log("ERROR:", error);

  const [visibleData, setVisibleData] = useState([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;   

  useEffect(() => {
  const initialData = data.slice(0, ITEMS_PER_PAGE);
  setVisibleData(initialData);
  }, [data]);

  const loadMore = () => {
    if (visibleData.length >= data.length) return;
    const nextPage = page + 1;
    const newData = data.slice(0, nextPage * ITEMS_PER_PAGE);

    setVisibleData(newData);
    setPage(nextPage);
  };
  
  //console.log(JSON.stringify(data, null, 2));
  return(
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
        
        <Text style ={styles.title}>Rendering Lists using fetch and useEffect</Text>

        <FlatList
          data={visibleData}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.id}>ID: {item.id}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            visibleData.length < data.length ? (
              <TouchableOpacity style={styles.button} onPress={loadMore}>
                <Text style={styles.buttonText}>Load More</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.endText}>No more data</Text>
            )
          }
        />
  
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    backgroundColor: '#1081f2ff',
    padding: 10,
    fontSize:18,
    color: '#fff'

  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  id: {
    fontSize: 14,
    color: 'black',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#0586dcff',
  },
  button: {
  backgroundColor: '#007bff',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
},
endText: {
  textAlign: 'center',
  marginTop: 10,
  color: 'gray',
}
});