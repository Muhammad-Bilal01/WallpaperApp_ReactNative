import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {MEAL_FILTERS} from '../Data';
import {API_KEY, APP_ID} from '../Keys';
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getTrendyRecipes();
  }, []);

  const getTrendyRecipes = () => {
    let myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    let requestOption = {
      method: 'GET',
      headers: myHeaders,
      redirects: 'follow',
    };

    // Call API
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=${APP_ID}&app_key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.hits[0]);
        setRecipes(result.hits);
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={style.container}>
      <View style={style.topView}>
        <Image style={style.banner} source={require('../assets/bg-food.jpg')} />
        <View style={style.transparentView}>
          <Text style={style.welcome}>Welcome</Text>
          <TouchableOpacity activeOpacity={0.95} style={style.searchBar}>
            <Image
              source={require('../assets/ic_search.png')}
              style={style.searchIcon}
            />
            <Text style={style.placeholderText}>Search Recipee ...</Text>
          </TouchableOpacity>
          <Text style={style.tagLine}>
            Search 1000+ recipes easily with one click
          </Text>
        </View>
      </View>
      <Text style={style.heading}>Categories</Text>
      <View style={style.listContainer}>
        <FlatList
          contentContainerStyle={{marginTop: 10}}
          horizontal
          data={MEAL_FILTERS}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity activeOpacity={0.8} style={style.categoryItem}>
                <View style={style.categoryCard}>
                  <Text style={style.categoryTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Text style={style.heading}>Trendy Recipes</Text>
      <View>
        <FlatList
          contentContainerStyle={{marginTop: 10, marginLeft: 10}}
          horizontal
          data={recipes}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details');
                }}
                activeOpacity={0.8}
                style={style.recipeItem}>
                <Image
                  source={{uri: item.recipe.image}}
                  style={style.recipeImage}
                />
                <View
                  style={[
                    style.transparentView,
                    {
                      borderRadius: 15,
                      justifyContent: 'flex-end',
                    },
                  ]}>
                  <Text style={style.recipeLabel}>{item.recipe.label}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9CACE',
  },
  topView: {
    width: '100%',
    height: '40%',
    backgroundColor: 'red',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  transparentView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    marginTop: 20,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  placeholderText: {
    marginLeft: 10,
    color: '#9E9E9E',
    fontSize: 16,
    fontWeight: '300',
  },
  welcome: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    position: 'absolute',
    top: 30,
    left: 30,
  },
  tagLine: {
    fontWeight: '300',
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
    color: 'black',
  },
  listContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  categoryItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 5,
  },
  categoryCard: {
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 0.5,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    padding: 10,
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  recipeItem: {
    width: 180,
    height: 220,
    marginLeft: 10,
    borderRadius: 15,
  },
  recipeImage: {
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  recipeLabel: {
    width: '90%',
    fontSize: 14,
    color: 'white',
    marginBottom: 15,
  },
});

export default HomeScreen;
