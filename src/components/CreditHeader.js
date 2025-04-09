import React from 'react'

const CreditHeader = () => {
  return (
   <div className='flex items-center justify-center'>
     <div className='w-[100%] flex items-center pt-2   gap-14 bg-[#406dc7] text-white px-3 '>
     <p>Credit</p>
     <div className='flex items-center gap-9'>
        <p>WAV : <span>0</span></p>
        <p>WAVDP : <span>0</span></p>
        <p>WAVBT : <span>0</span></p>
        <p>WAPPOLL : <span>0</span></p>
        <p>WAP : <span>0</span></p>
        <p>WAVPRO : <span>0</span></p>
        <p>WAINT : <span>0</span></p>
     </div>
    </div>
   </div>
  )
}

export default CreditHeader