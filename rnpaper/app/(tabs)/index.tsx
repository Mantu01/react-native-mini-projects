import {  ScrollView, View } from "react-native";
import { Avatar, Button, Card, Chip, DataTable, Divider, Text } from "react-native-paper";

const nutritionItems = [
  { key: 1, name: 'Chocolate Cake', calories: 350, fat: 16, protein: 5 },
  { key: 2, name: 'Strawberry Cheesecake', calories: 420, fat: 28, protein: 8 },
  { key: 3, name: 'Vanilla Pudding', calories: 180, fat: 8, protein: 4 },
  { key: 4, name: 'Tiramisu', calories: 380, fat: 22, protein: 6 },
  { key: 5, name: 'Brownie', calories: 290, fat: 14, protein: 4 },
];

export default function Index() {
  return (
    <ScrollView style={{flex:1,padding:16}}>
      <Card style={{marginBottom:20,borderRadius:12,overflow:'hidden'}} >
        <Card.Cover source={{uri:'https://images.unsplash.com/photo-1551024601-bec78aea704b'}} />
        <Card.Title
          title="Dessert Nutrition"
          subtitle="React Native Paper"
          left={(props)=><Avatar.Icon {...props} icon='food' />}
        />
        <Card.Content>
          <Text variant="bodyMedium">
            Simple example of Card, Chips, and DataTable compoinents.
          </Text>
          <Divider style={{marginVertical:12}} />
          <View style={{flexDirection:'row', gap:8}}>
            <Chip compact icon='book'>Tutorial</Chip>
            <Chip compact icon='check'>Minimal UI</Chip>
          </View>
          <Card.Actions>
            <Button mode="contained">Explore</Button>
            <Button mode="outlined">Docs</Button>
          </Card.Actions>
        </Card.Content>
      </Card>

      {/* Table Card */}
      <Card style={{borderRadius:12}}>
        <Card.Content>
          <Text variant="titleMedium" style={{marginBottom:12}}>
            Nutrition Table
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Dessert</DataTable.Title>
              <DataTable.Title numeric>Cal</DataTable.Title>
              <DataTable.Title numeric>Fat</DataTable.Title>
              <DataTable.Title numeric>Protein</DataTable.Title>
            </DataTable.Header>

            {nutritionItems.map((item)=>(
              <DataTable.Row key={item.key}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                <DataTable.Cell numeric>{item.protein}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <View style={{alignItems:'center', marginVertical:30}}>
        <Text variant="bodySmall" style={{opacity:0.6}}>
          -- End of Content --
        </Text>
      </View>

    </ScrollView>
  );
}
