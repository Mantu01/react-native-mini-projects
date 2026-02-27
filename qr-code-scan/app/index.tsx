import { useState } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';

export default function Screen() {
  const [value, setValue] = useState('');
  const [qrValue, setQrValue] = useState('');

  return (
    <View className="flex-1 items-center justify-center gap-6 p-6">
      {qrValue ? (
        <View className='w-64 h-64 bg-white  items-center justify-center'>
          <QRCode
            value={qrValue}
            size={250}
            backgroundColor="transparent"
          />
        </View>
      ) : (
        <View className="">
          <Text className="text-muted-foreground">
            QR Code will appear here
          </Text>
        </View>
      )}
      <Textarea
        placeholder="Enter content"
        value={value}
        onChangeText={setValue}     
        placeholderTextColor="gray"
      />
      <Button onPress={() => setQrValue(value)}>
        <Text>Generate QR Code</Text>
      </Button>
    </View>
  );
}