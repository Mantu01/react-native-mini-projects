import { useState } from 'react'
import { View } from 'react-native'
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions()
  const [active, setActive] = useState(false)
  const [result, setResult] = useState('')

  if (!permission) return <View><Text>Loading</Text></View>

  if (!permission.granted)
    return (
      <View className="flex-1 items-cente justify-center gap-4">
        <Text>We need camera permission</Text>
        <Button onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </Button>
      </View>
    )

  const handleScan = (e: BarcodeScanningResult) => {
    setResult(e.data)
    setActive(false)
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 p-6">
      <View className="w-full h-96 rounded-2xl overflow-hidden">
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={active ? handleScan : undefined}
        />
      </View>

      <Button onPress={() => setActive(true)}>
        <Text>Scan QR Code</Text>
      </Button>

      {result ? (
        <View className="items-center gap-2 ">
          <Text className="font-semibold text-3xl">Scanned Content:</Text>
          <Text className="text-center text-2xl">{result}</Text>
        </View>
      ) : null}
    </View>
  )
}