import * as React from 'react';
import { View } from 'react-native';
import {Card,Text,List,Divider,Chip,} from 'react-native-paper';

export default function InfoScreen() {
  return (
    <>
      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        <Card>
          <Card.Content>
            <Text variant="titleMedium">App Info</Text>
            <Text variant="bodyMedium">
              This screen shows basic information and features of the app.
            </Text>

            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              <Chip icon="check">Simple</Chip>
              <Chip icon="flash">Fast</Chip>
            </View>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <List.Item
              title="Version"
              description="1.0.0"
              left={(props) => <List.Icon {...props} icon="information" />}
            />
            <Divider />
            <List.Item
              title="Platform"
              description="React Native"
              left={(props) => <List.Icon {...props} icon="cellphone" />}
            />
            <Divider />
            <List.Item
              title="UI Library"
              description="React Native Paper"
              left={(props) => <List.Icon {...props} icon="palette" />}
            />
          </Card.Content>
        </Card>
      </View>
    </>
  );
}