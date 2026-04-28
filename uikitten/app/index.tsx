import { Button, Card, Input, Layout, ProgressBar, Text, Toggle } from "@ui-kitten/components";
import { useState } from "react";
import { ScrollView, View } from "react-native";


const actions = [
    { title: "Primary Action", status: "primary" },
    { title: "Success Action", status: "success" },
    { title: "Warning Action", status: "warning" },
    { title: "Danger Action", status: "danger" },
    { title: "Info Action", status: "info" },
  ];

  const inputs = [
    { placeholder: "Full Name" },
    { placeholder: "Email Address" },
    { placeholder: "Location" },
  ];

  const health = [
    { label: "Server Stability", progress: 0.85, status: "success" },
    { label: "API Response", progress: 0.65, status: "info" },
    { label: "Storage Usage", progress: 0.45, status: "warning" },
    { label: "Error Rate", progress: 0.25, status: "danger" },
  ];

export default function Index() {

  const [checked,setChecked]=useState(true);
  return (
    <Layout style={{flex:1}}>
      <ScrollView contentContainerStyle={{padding:16}} >
        <View style={{gap:16}}>
          <Card>
            <Text category="h5">Welcom Back</Text>
            <Text appearance="hint" style={{marginTop:8}}>
              Your dashboard is ready with live system insights.
            </Text>
          </Card>
          <Card>
            <Text category="s1">Quick Actions</Text>
            <View style={{marginTop:12, gap:10}}>
              {actions.map((a,i)=>(
                <Button key={i} status={a.status} >{a.title}</Button>
              ))}
            </View>
          </Card>
          <Card>
            <Text category="s1">System Health</Text>
            <View style={{marginTop:12, gap:10}}>
              {health.map((h,i)=>(
                <View key={i}>
                  <Text status={h.status}>{h.label}</Text>
                  <ProgressBar progress={h.progress} status={h.status} />
                </View>
              ))}
            </View>
          </Card>
          <Card>
            <Text>Preferences</Text>
            <View
              style={{
                marginTop:12,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center'
              }}
            >
              <Text>Enable Notification</Text>
              <Toggle checked={checked} onChange={setChecked} />
            </View>
          </Card>
          <Card>
            <Text>User Profile</Text>
            <View style={{marginTop:12, gap:10}}>
              {inputs.map((i,idx)=>(
                <Input key={idx} placeholder={i.placeholder} />
              ))}
              <Button >Save Profile</Button>
            </View>
          </Card>
          <Card>
            <Text>Call to Action</Text>
            <Text appearance="hint" style={{marginTop:12, gap:10}}>Upgrade Your plan</Text>
            <Button>Upgrade Now</Button>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
}
