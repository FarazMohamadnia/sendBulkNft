import { useEffect, useState } from 'react'
import './App.css'
import { beginCell, toNano } from '@ton/ton'
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react'
import axios from 'axios';


function App() {
  const userFriendlyAddress = useTonAddress();
  const [address , setaddress]=useState()

  const getNft =async ()=>{
    try{
      if(userFriendlyAddress){
      const response = await axios.get(`https://toncenter.com/api/v3/nft/items?owner_address=${userFriendlyAddress}`)
      console.log(response)
      }
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
      <button style={{
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
