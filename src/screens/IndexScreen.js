import React, { useContext } from 'react';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   Button,
   TouchableOpacity,
} from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
   const { state, addBlogPost, deleteBlogPost } = useContext(Context);

   return (
      <View>
         <Button title="Add a post" onPress={addBlogPost} />
         <FlatList
            data={state}
            keyExtractor={(blogPost) => blogPost.title}
            renderItem={({ item }) => {
               return (
                  <TouchableOpacity
                     onPress={() =>
                        navigation.navigate('show', { id: item.id })
                     }
                  >
                     <View style={styles.row}>
                        <Text style={styles.title}>
                           {item.title} - {item.id}
                        </Text>
                        <TouchableOpacity
                           onPress={() => {
                              deleteBlogPost(item.id);
                           }}
                        >
                           <Feather style={styles.iconStyle} name="trash-2" />
                        </TouchableOpacity>
                     </View>
                  </TouchableOpacity>
               );
            }}
         />
      </View>
   );
};

IndexScreen.navigationOptions = ({ navigation }) => {
   return {
      headerRight: () => (
         <TouchableOpacity onPress={() => navigation.navigate('create')}>
            <Feather style={{ marginRight: 10 }} name="plus" size={30} />
         </TouchableOpacity>
      ),
   };
};

const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: 'gray',
   },

   title: {
      fontSize: 18,
   },

   iconStyle: {
      fontSize: 24,
   },
});

export default IndexScreen;
