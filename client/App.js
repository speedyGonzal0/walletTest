import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Axios from 'axios'
import { useState } from 'react';

export default function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [wallet, setwallet] = useState("");
  const [walletinput, setwalletinput] = useState("");
  const [importedwallet, setimportedwallet] = useState("");

    
  const generateSecret = () => {
    Axios.get("http://localhost:19007/create").then((res) => {
      console.log(res)
      setMnemonic(res.data.mnemonic)
      setwallet(res.data.wallet)
    })
  }

  const importAcc = (walletinput) => {
    Axios.post("http://localhost:19007/import", {walletinput}).then((res) => {
    if(res){
      setimportedwallet(res.data)
    }
    else{
      setimportedwallet("Wrong secret phrase")
    }
    // console.log(res)
      // setMnemonic(res.data.mnemonic)
      
    })

  }


  return (
    

    <View style={styles.container}> 
        <Button color="#1572A1"  title="Create Account" onPress={generateSecret}/>
        {mnemonic!=="" && <Text>{mnemonic}</Text> }
        {wallet !=="" && <Text>{wallet}</Text>}
        <View>
          <TextInput style={styles.input}
          onChangeText={setwalletinput}
          value={walletinput}
        placeholder="Enter secret phrase"/>


        <Button color= "#FF6464" title="Import Account" onPress={() => importAcc(walletinput)}/>
        {importedwallet !=="" && <Text>{importedwallet}</Text>}

        </View>
        
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button1: {
    backgroundColor: "#1572A1",
    width: "20%",
    height: "10%"

  },
  button2: {
    backgroundColor: "#FF6464",
    width: "20%",
    height: "10%"
  },
  input: {
    height: 40,
    backgroundColor: "#EEEEEE",
    margin: 12,
    borderRadius: 5,
    padding: 10,
  }

});
