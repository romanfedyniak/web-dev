import React from "react" 
import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator} from "@react-navigation/drawer"


const Drawer = createDrawerNavigator()

export default function Filter(){
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName = "Filter">
                <Drawer.Screen name="First" component={First}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}