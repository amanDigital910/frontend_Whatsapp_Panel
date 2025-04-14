import React from 'react'

const CreditHeader = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full flex flex-row md:items-center pt-2 gap-4 bg-[#406dc7] text-white px-3 py-2 overflow-x-auto">
        {/* Title */}
        <p className="md:text-xl text-lg font-semibold whitespace-nowrap p-0 m-0">Balance:-</p>

        {/* Credit Items */}
        <div className="flex flex-wrap md:flex-wrap items-center md:gap-4 gap-6 text-xl md:text-2xl">
          <p className="whitespace-nowrap p-0 m-0">WAV: <span>0</span></p>
          <p className="whitespace-nowrap p-0 m-0">WAVDP: <span>0</span></p>
          <p className="whitespace-nowrap p-0 m-0">WAVBT: <span>0</span></p>
          <p className="whitespace-nowrap p-0 m-0">WAPPOLL: <span>0</span></p>
          <p className="whitespace-nowrap p-0 m-0">WAP: <span>0</span></p>
          <p className="whitespace-nowrap p-0 m-0">WAVPRO: <span>0</span></p>
          <p className="whitespace-nowrap p-0 m-0">WAINT: <span>0</span></p>
        </div>
      </div>
    </div>

  )
}

export default CreditHeader