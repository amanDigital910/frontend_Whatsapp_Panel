import React from 'react'

const CampaignStatus = ({totalStatus,validStatus,invalidStatus,duplicateStatus}) => {
    return (
        <div>
            <div className="flex gap-4">
                <div className="w-full  whitespace-nowrap h-fit px-4 py-[9px] rounded-md text-white font-semibold bg-[#0d0c0d] text-center">
                    Total {totalStatus}
                </div>
                <div className="w-full whitespace-nowrap h-fit px-4 py-[9px] rounded-md text-white font-semibold bg-[#23a31af5] text-center">
                    Valid {validStatus}
                </div>
                <div className="w-full whitespace-nowrap h-fit px-4 py-[9px] rounded-md text-white font-semibold bg-[#b00202] text-center">
                    InValid {invalidStatus}
                </div>
                <div className="w-full whitespace-nowrap h-fit text text-center px-4 py-[9px] rounded-md text-white font-semibold bg-[#8a0418] ">
                    Remove Duplicates {duplicateStatus}
                </div>
            </div>
        </div>
    )
}

export default CampaignStatus