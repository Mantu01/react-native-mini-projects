//@ts-nocheck

import { Button, Image, Text, XStack, YStack } from 'tamagui';

const img="https://i.pinimg.com/736x/41/67/e9/4167e99030267e03f2d6fb67b66588ce.jpg";

export default function Index() {

  const items = ['My Reviews', 'Questions & Answers', 'Contact Support']

  const info= [
    { label: 'Name', value: 'Alexander Maksimov' },
    { label: 'Phone', value: '+91 987654321' },
    { label: 'Email', value: 'example@gmail.com' },
    { label: 'Age', value: '22 years' },
  ]

  return (
    <YStack padding={16} space="$3">
      <Text textAlign="center" fontSize={20} fontWeight="600" marginBottom={8} >Profile</Text>
      <YStack alignItems="center" paddingVertical={16}>
        <YStack position='relative'>
          <Image src={img} height={120} width={120} borderRadius={60} />
          <Button size="$3" circular position='absolute' bottom={0} right={0} >+</Button>
        </YStack>
      </YStack>
      <YStack marginTop={16} >
        {info.map((item,index)=>(
          <XStack 
            key={index}
            alignItems="center"
            justifyContent="Space-between"
            paddingVertical={12}
          >
            <YStack>
              <Text fontSize={14} color="$gray10" >{item.label}</Text>
              <Text fontSize={16} fontWeight={500} >{item.value}</Text>
            </YStack>
          </XStack>
        ))}
      </YStack>
      <YStack
        borderRadius={12}
        borderWidth={1}
        borderColor={'$borderColor'}
        overflow='hidden'
        marginTop={16}
      >
        {items.map((item,index)=>(
          <XStack
            key={index}
            justify={'space-between'}
            alignItems="center"
            padding={16}
            borderBottomWidth={index !== items.length-1?1:0}
            borderColor={'$borderColor'}
          >
            <Text fontSize={16} >{item}</Text>
            <Text fontSize={18} color={"$gray9"} >{">"}</Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}