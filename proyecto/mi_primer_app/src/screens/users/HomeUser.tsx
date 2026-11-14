import { useEffect } from 'react';
import { T } from '../../theme/colors';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { UserCard } from '../../components/UserCard';
import { UserRespose } from '../../interfaces/pandoraApiRest';
import { useUserApi } from '../../hooks/useUserApi';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackUserParams } from '../../navigator/UserStackNavigator';

export const HomeUSer = () => {

  const { isLoading, loadUsers, listUser } = useUserApi();
  const navigation = useNavigation<StackNavigationProp<StackUserParams>>();
  const focused = useIsFocused();

  useEffect( () =>  {
    loadUsers();
  },[ focused ]);

  const create: UserRespose = {
    id_user: 0,
    username: '',
    email: '',
    password: '',
    image: '',
    location: '',
    update: new Date(),
  };

  return (
    <View
      style={ appTheme.container }
    >
      <FlatList
        data={ listUser }
        keyExtractor={ (item) => `#${item.id_user}` }
        ListHeaderComponent={(
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <Text
              style={ appTheme.text }
            >
              Entrenadores
            </Text>
            <BtnTouch
              title='Registrar entrenador'
              color={T.primario}
              borderColor={T.acentoSuave}
              onPress={ () => navigation.navigate('FormUser',{...create}) }
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        refreshControl={(
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ loadUsers }
            colors={[ T.acento, T.secundario, T.primario ]}
            progressBackgroundColor={T.tarjeta}
          />
        )}
        renderItem={ ({ item }) => (
          <UserCard
            user={ item }
          />
        )}
      />
    </View>
  );

}
