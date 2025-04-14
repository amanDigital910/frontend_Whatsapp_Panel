import React from 'react'

const CampaignTitle = ({mainTitle,inputTitle,setCampaignTitle}) => {
    return (
        <div className="flex md:flex-col items-start h-fit border-black border rounded-[0.42rem]">
            <p className="md:w-full w-[40%] md:py-2 py-2.5 px-4 bg-brand_colors whitespace-nowrap text-white text-start font-semibold text-sm m-0 md:rounded-t-md md:rounded-br-none md:rounded-bl-none rounded-l-md ">
                {mainTitle}                
            </p>
            <input
                type="text"
                className="w-full custom-rounded form-control border-0 rounded-none py-2 px-4 text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-0"
                placeholder="Enter Campaign Title"
                value={inputTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
            />


        </div>
    )
}

export default CampaignTitle