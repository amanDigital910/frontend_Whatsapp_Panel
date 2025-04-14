import React from 'react'

const CampaignHeading = ({campaignHeading}) => {
    return (
        <div>
            <div className="w-full py-2 mb-2 bg-white">
                <h1 className="text-2xl md:text-xl text-black font-semibold pl-4 py-0 m-0">
                    {campaignHeading}
                </h1>
            </div>
        </div>
    )
}

export default CampaignHeading