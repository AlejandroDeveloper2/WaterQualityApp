import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ViewStyle } from "react-native";
import { Icon } from "@rneui/themed";

import useTheme from "../hooks/useTheme";

import CustomDrawer from "../components/customDrawer/CustomDrawer";
import HomeScreen from "../screens/homeScreen/HomeScreen";
import LoadingScreen from "../screens/loadingScreen/LoadingScreen";
import MeasurementScreen from "../screens/measurementsScreen/MeasurementScreen";
import AnalysisResultScreen from "../screens/analysisResultScreen/AnalysisResultScreen";

type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
};

type DrawerNavParamList = {
  Inicio: undefined;
  Mediciones: undefined;
};

type SecondaryParamList = {
  Home: undefined;
  AnalysisResult: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const DrawerNav = createDrawerNavigator<DrawerNavParamList>();
const SecondaryStack = createNativeStackNavigator<SecondaryParamList>();

const StackNavigator = (): JSX.Element => {
  return (
    <RootStack.Navigator initialRouteName="Loading">
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Loading" component={LoadingScreen} />
        <RootStack.Screen name="Home" component={DrawerNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

const SecondaryStackNavigator = (): JSX.Element => {
  return (
    <SecondaryStack.Navigator initialRouteName="Home">
      <SecondaryStack.Group screenOptions={{ headerShown: false }}>
        <SecondaryStack.Screen name="Home" component={HomeScreen} />
        <SecondaryStack.Screen
          name="AnalysisResult"
          component={AnalysisResultScreen}
        />
      </SecondaryStack.Group>
    </SecondaryStack.Navigator>
  );
};

const DrawerNavigator = (): JSX.Element => {
  const { themeColors } = useTheme();

  const labelStyle = {
    fontFamily: "LibreFranklin_500Medium",
    marginLeft: -25,
    fontSize: 16,
  };

  const itemStyle: ViewStyle = {
    marginTop: 0,
    borderRadius: 10,
    width: 200,
    height: 60,
    justifyContent: "space-around",
    paddingLeft: 20,
  };

  const drawerStyle = {
    width: 200,
  };

  return (
    <DrawerNav.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <DrawerNav.Group
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: themeColors?.secondaryColor,
          drawerInactiveBackgroundColor: themeColors?.gray,
          drawerActiveTintColor: themeColors?.white,
          drawerInactiveTintColor: themeColors?.white,
          drawerLabelStyle: labelStyle,
          drawerItemStyle: itemStyle,
          drawerStyle: drawerStyle,
        }}
      >
        <DrawerNav.Screen
          name="Inicio"
          component={SecondaryStackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                color={color}
                type="material"
                name="dashboard"
                brand={true}
              />
            ),
          }}
        />
        <DrawerNav.Screen
          name="Mediciones"
          component={MeasurementScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                color={color}
                type="material"
                name="straighten"
                brand={true}
              />
            ),
          }}
        />
      </DrawerNav.Group>
    </DrawerNav.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
