import { expect, test } from '@jest/globals';
import { Text } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Button, View } from 'react-native';

import { type BottomTabScreenProps, createBottomTabNavigator } from '../index';

type BottomTabParamList = {
  A: undefined;
  B: undefined;
};

test('renders a bottom tab with a custom badge on buttons', async () => {
  const Test = ({
    route,
    navigation,
  }: BottomTabScreenProps<BottomTabParamList>) => (
    <View>
      <Text>Screen {route.name}</Text>
      <Button onPress={() => navigation.navigate('A')} title="Go to A" />
      <Button onPress={() => navigation.navigate('B')} title="Go to B" />
    </View>
  );

  const Tab = createBottomTabNavigator<BottomTabParamList>();

  render(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="A"
          component={Test}
          options={{
            tabBarBadge: () => (
              <View>
                <Text>Test badge</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="B"
          component={Test}
          options={{
            tabBarBadge: '10',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

  await waitFor(() => {
    expect(screen.getByText('Test badge')).not.toBeNull();
    expect(screen.getByText('10')).not.toBeNull();
  });
});
