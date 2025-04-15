import FroalaEditor from "react-froala-wysiwyg"
import './style.css'
import { MdDelete } from "react-icons/md"
import { FaFilePdf } from "react-icons/fa6"
import { useEffect, useRef, useState } from "react"

// Main Heading
export const CampaignHeading = ({ campaignHeading }) => {
    return (
        <div className="px-3">
            <div className="w-full py-2 mb-2 bg-white rounded-lg">
                <h1 className="text-2xl ss:text-xl md:text-xl text-start pl-6 md:pl-0 md:flex justify-center text-black font-semibold py-0 m-0">
                    {campaignHeading}
                </h1>
            </div>
        </div>
    )
}

// Campaign Title Text and Campaign Name
export const CampaignTitle = ({ mainTitle, inputTitle, setCampaignTitle }) => {
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

// Campaign Status for all 
export const CampaignStatus = ({ totalStatus, validStatus, invalidStatus, duplicateStatus }) => {
    return (
        <div>
            <div className="custom-grid">
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
                    Duplicates {duplicateStatus}
                </div>
            </div>
        </div>
    )
}

// CSV File Button
export const CSVButton = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [caption, setCaption] = useState("");
    const csvInputRef = useRef(null);

    const onFileUpload = (e, type) => {
        if (type === "csv") {
            const file = e.target.files[0];
            if (file) {
                setUploadedFile(file);
            }
        }
    };

    const onRemove = (type) => {
        if (type === "csv") {
            setUploadedFile(null);
            setCaption("");
        }
    };

    const onCaptionChange = (value) => setCaption(value);

    return (
        <div className="flex flex-col gap-2">
            {/* <h6 className="font-semibold">CSV (Max 5MB):</h6> */}

            {/* Hidden file input */}
            <input
                type="file"
                ref={csvInputRef}
                accept=".csv"
                className="hidden"
                onChange={(e) => onFileUpload(e, "csv")}
            />

            {/* Button + Caption input */}
            <div className="flex items-center md:flex-col">
                <button
                    className="bg-green-600 text-white py-2 px-6 w-fit md:w-full whitespace-nowrap md:rounded-t-md md:rounded-br-none md:rounded-bl-none rounded-l-md"
                    onClick={() => csvInputRef.current.click()}
                >
                    Upload CSV
                </button>
                <input
                    type="text"
                    className="w-full border border-gray-300 py-2 px-3 custom-rounded"
                    placeholder="Enter caption for CSV"
                    value={caption}
                    onChange={(e) => onCaptionChange(e.target.value)}
                />
            </div>

            {/* CSV preview (just filename display) */}
            {uploadedFile && (
                <div className="relative w-full h-[80px] border border-gray-200 rounded p-4 flex items-center justify-between">
                    <span className="text-gray-700 font-medium truncate">{uploadedFile.name}</span>
                    <MdDelete
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={() => onRemove("csv")}
                    />
                </div>
            )}
        </div>
    )
}

// Dropdown for Whatsapp Group Menu 
export const GroupDropDown = ({ selectedGroup, setSelectedGroup, groups }) => {
    return (
        <select
            className="form-select border-black py-2 px-4 rounded-md"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
        >
            <option value="">Select Your Group</option>
            {groups.map((group) => (
                <option key={group.groupId} value={group.groupId}>
                    {group.group_name}
                </option>
            ))}
        </select>
    )
}

// Countries of the world and made by default India (+91)
export const CountryDropDown = ({ selectedCountry, setSelectedCountry, countries }) => {
    return (
        <select
            className="form-select border-black py-2 px-4 rounded-md"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
        >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
                <option key={index} value={country.dialCode}>
                    {country.name} (+{country.dialCode})
                </option>
            ))}
        </select>
    )
}

// Write all whatsapp Text Numbers
export const WhatsappTextNumber = ({ whatsAppNumbers, setWhatsAppNumbers }) => {
    return (
        // <div>
        <textarea
            className="w-full h-full px-4 py-2 rounded-md bg-white text-black border-black form-control placeholder-gray-500"
            placeholder="Enter WhatsApp Number"
            rows={10}
            style={{ height: "100%" }}
            value={whatsAppNumbers}
            onChange={(e) => setWhatsAppNumbers(e.target.value)} />
    )
}

// Templates Dropdowns 
export const TemplateDropdown = ({ selectedTemplate, setSelectedTemplate, msgTemplates, setEditorData, }) => {
    <select
        className="form-select form-control border-black py-2 px-4 rounded-md"
        value={selectedTemplate}
        onChange={(e) => {
            const templateId = e.target.value;
            setSelectedTemplate(templateId);
            const template = msgTemplates.find(
                (t) => t.templateId.toString() === templateId
            );
            if (template) {
                setEditorData(template.template_msg);
            }
        }}
    >
        <option value="">Select Your Template</option>
        {msgTemplates.map((template) => (
            <option key={template.templateId} value={template.templateId}>
                {template.template_name}
            </option>
        ))}
    </select>
}

// write your message in this rich text editor
export const RichTextEditor = ({ editorData, setEditorData }) => {
    return (
        <FroalaEditor
            tag="textarea"
            config={{
                placeholderText: "Enter your text here...",
                charCounterCount: true,
                toolbarButtons: ["bold", "underline", "italic"],
                quickInsertButtons: [],
                pluginsEnabled: [],
                height: 300,
                events: {
                    initialized: function () {
                        const secondToolbar = document.querySelector(".fr-second-toolbar");
                        if (secondToolbar) secondToolbar.style.color = "white";
                    },
                },
            }}
            model={editorData}
            onModelChange={(data) => setEditorData(data)}
        />
    )
}

// upload documents like Photos upto 2mb, Video and Pdf upto 15Mb.
export const ImagesUploader = ({ type, index, inputRef, uploadedFile, onFileUpload, onRemove, caption, onCaptionChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    ref={inputRef}
                    className="hidden"
                    onChange={(e) => onFileUpload(e, type)}
                />
                <div className="flex md:flex-col w-full">
                    <button
                        className="bg-green-600 text-white py-2 px-4 md:rounded-t-md md:rounded-br-none md:rounded-bl-none rounded-l-md "
                        onClick={() => inputRef.current.click()}
                    >
                        Image {index + 1}
                    </button>
                    <input
                        type="text"
                        maxLength={1500}
                        className="flex-1 border border-gray-300 py-2 px-3 custom-rounded"
                        placeholder={`Enter caption for Image ${index + 1}`}
                        value={caption}
                        onChange={(e) => onCaptionChange(e.target.value)}
                    />
                </div>
            </div>
            {uploadedFile && (
                <div className="relative w-full h-[250px] border border-gray-200 rounded overflow-hidden">
                    <img
                        src={uploadedFile.preview}
                        alt={`Uploaded ${type}`}
                        className="absolute top-0 left-0 w-full h-full object-contain z-0"
                    />
                    <MdDelete
                        className="text-red-500 absolute top-2 right-2 text-xl z-10 cursor-pointer"
                        onClick={() => onRemove(type)}
                    />
                </div>
            )}
        </div>
    );
};

export const PdfUploader = ({ inputRef, uploadedFile, onFileUpload, onRemove, caption, onCaptionChange }) => {

    useEffect(() => {
        let url;
        if (uploadedFile) {
            url = URL.createObjectURL(uploadedFile);
        }
        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [uploadedFile]);

    return (
        <div className="flex flex-col gap-2">
            <h6 className="font-semibold">PDF (Max 15MB):</h6>
            <input type="file" ref={inputRef} className="hidden" onChange={(e) => onFileUpload(e, "pdf")} accept="application/pdf" />
            <div className="flex items-center md:flex-col">
                <button
                    className="bg-green-600 text-white py-2 px-6 w-fit md:w-full whitespace-nowrap md:rounded-t-md md:rounded-br-none md:rounded-bl-none rounded-l-md"
                    onClick={() => inputRef.current.click()}
                >
                    Upload PDF
                </button>
                <input
                    type="text"
                    className="w-full border border-gray-300 py-2 px-3 custom-rounded"
                    placeholder="Enter caption for PDF"
                    value={caption}
                    onChange={(e) => onCaptionChange(e.target.value)}
                />
            </div>
            {uploadedFile && (
                <div className="relative w-full h-[400px] flex justify-center items-center border border-gray-200 rounded">
                    {/* <FaFilePdf className="text-[150px] text-red-400" /> */}
                    {/* Give preview of PDF */}
                    <embed src={URL.createObjectURL(uploadedFile)} type="application/pdf" className="text-[150px] h-full text-red-400" />
                    <MdDelete
                        className="text-red-500 absolute top-2 right-2 text-xl cursor-pointer"
                        onClick={() => onRemove("pdf")}
                    />
                </div>
            )}
        </div>
    );
}

export const VideoUploader = ({ inputRef, uploadedFile, onFileUpload, onRemove, caption, onCaptionChange }) => (
    <div className="flex flex-col gap-2">
        <h6 className="font-semibold">Video (Max 15MB):</h6>
        <div className="flex items-center md:flex-col">
            <button
                className="bg-green-600 w-fit md:w-full text-white py-2 px-6 whitespace-nowrap md:rounded-t-md md:rounded-br-none md:rounded-bl-none rounded-l-md "
                onClick={() => inputRef.current.click()}
            >
                Upload Video
            </button>
            <input type="file" accept="video/mp4, video/x-matroska, video/webm, video/x-msvideo"
                ref={inputRef} className="hidden" onChange={(e) => onFileUpload(e, "video")} />
            <input
                type="text"
                className="w-full border border-gray-300 py-2 px-3 rounded-lg custom-rounded"
                placeholder="Enter caption for Video"
                value={caption}
                onChange={(e) => onCaptionChange(e.target.value)}
            />
        </div>
        {uploadedFile && (
            <div className="relative w-full h-[250px] border border-gray-200 rounded overflow-hidden">
                <video src={uploadedFile.preview} className="w-full h-full object-contain" controls />
                <MdDelete
                    className="text-red-500 absolute top-2 right-2 text-xl cursor-pointer"
                    onClick={() => onRemove("video")}
                />
            </div>
        )}
    </div>
);

export const SendNowButton = ({ handleSendCampaign }) => {
    return (
        <button
            className="w-full rounded-md bg-green-600 py-2 text-white md:text-xl text-2xl capitalize font-semibold flex items-center justify-center hover:bg-green-500 transition duration-300"
            onClick={handleSendCampaign}>
            Send Now
        </button>
    )
}