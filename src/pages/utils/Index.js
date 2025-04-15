export const CampaignHeading = ({campaignHeading}) => {
    return (
        <div>
            <div className="w-full py-2 mb-2 bg-white">
                <h1 className="text-2xl ss:text-2xl md:text-xl text-black font-semibold pl-4 py-0 m-0">
                    {campaignHeading}
                </h1>
            </div>
        </div>
    )
}

export const CampaignTitle = ({mainTitle,inputTitle,setCampaignTitle}) => {
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

export const CampaignStatus = ({totalStatus,validStatus,invalidStatus,duplicateStatus}) => {
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