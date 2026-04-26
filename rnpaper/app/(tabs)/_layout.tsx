import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const tabs = [
  {name:'index',title:'Home',iconName:'home'},
  {name:'details',title:'Details',iconName:'info'}
] as const;

export default function TabLayout(){
  return (
    <Tabs>
      {tabs.map((tab)=>(
        <Tabs.Screen
          name={tab.name}
          options={{
            title:tab.title,
            tabBarIcon:({color,size})=>{
              return <Feather name={tab.iconName} size={size} color={color} />
            }
          }}
        />
      ))}
    </Tabs>
  );
}