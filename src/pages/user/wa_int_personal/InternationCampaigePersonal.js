import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import CreditHeader from "../../../components/CreditHeader";
import Notes from "../../../components/Notes";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { FaFilePdf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const PerosnalCampaign2 = () => {
  // State for campaign title.
  const [campaignTitle, setCampaignTitle] = useState("");
  // State for groups, selected group, and WhatsApp numbers.
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [whatsAppNumbers, setWhatsAppNumbers] = useState("");

  // Editor data state (will be sent as userMessage).
  const [editorData, setEditorData] = useState("");

  // State for file uploads.
  // For images and video, we store an object with both file and preview.
  const [uploadedFiles, setUploadedFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    pdf: null,
    video: null,
  });

  // New state for media captions.
  const [mediaCaptions, setMediaCaptions] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    pdf: "",
    video: "",
  });

  // Refs for file inputs.
  const inputRefs = {
    image1: useRef(null),
    image2: useRef(null),
    image3: useRef(null),
    image4: useRef(null),
    pdf: useRef(null),
    video: useRef(null),
  };

  // State for message templates and selected template.
  const [msgTemplates, setMsgTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  // Base API URL from environment variable.
  // New state for Button Detail and Delay Between Messages.
  const [buttonDetail, setButtonDetail] = useState("");
  const [delayBetweenMessages, setDelayBetweenMessages] = useState("");

  // Fetch groups from the API when the component mounts.
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msggroup/`)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.error("Error fetching groups:", error));
  }, [process.env.REACT_APP_API_URL]);

  // Fetch message templates from the API.
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msgtemplate`)
      .then((response) => setMsgTemplates(response.data))
      .catch((error) =>
        console.error("Error fetching message templates:", error)
      );
  }, [process.env.REACT_APP_API_URL]);

  // When a group is selected, update the WhatsApp numbers field.
  useEffect(() => {
    if (selectedGroup !== "") {
      const group = groups.find((g) => g.groupId.toString() === selectedGroup);
      if (group) {
        try {
          const numbersArray = JSON.parse(group.group_number);
          setWhatsAppNumbers(numbersArray.join("\n"));
        } catch (error) {
          console.error("Error parsing group_number:", error);
          setWhatsAppNumbers("");
        }
      }
    } else {
      setWhatsAppNumbers("");
    }
  }, [selectedGroup, groups]);
  // Fetch countries from REST Countries API.
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryData = response.data.map((country) => {
          let dialCode = "";
          if (
            country.idd &&
            country.idd.root &&
            country.idd.suffixes &&
            country.idd.suffixes.length > 0
          ) {
            // Combine the idd root and first suffix (e.g., "+91")
            dialCode = country.idd.root + country.idd.suffixes[0];
          }
          // Remove the plus sign for a pure numeric code
          dialCode = dialCode.replace("+", "");
          return { name: country.name.common, dialCode };
        });
        // Sort countries alphabetically by name.
        countryData.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryData);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Handle file uploads for images, PDF, and video.
  const handleFileUpload = (e, type) => {
    const files = e.target.files;
    if (!files.length) {
      console.warn("No file selected");
      return;
    }
    const file = files[0];

    if (type.startsWith("image")) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        alert(
          "Invalid file type. Please select a valid image (JPEG, PNG, or GIF)."
        );
        return;
      }
      const maxSizeInMB = 2;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert("File size exceeds 2MB. Please select a smaller image.");
        return;
      }
      const preview = URL.createObjectURL(file);
      setUploadedFiles((prev) => ({ ...prev, [type]: { file, preview } }));
    } else if (type === "pdf") {
      if (file.type !== "application/pdf") {
        alert("Invalid file type. Please select a PDF file.");
        return;
      }
      const maxPdfSizeInMB = 10;
      if (file.size > maxPdfSizeInMB * 1024 * 1024) {
        alert("File size exceeds 10MB. Please select a smaller PDF.");
        return;
      }
      setUploadedFiles((prev) => ({ ...prev, pdf: file }));
    } else if (type === "video") {
      const validVideoTypes = ["video/mp4"];
      if (!validVideoTypes.includes(file.type)) {
        alert("Invalid file type. Please select a valid video (MP4).");
        return;
      }
      const maxVideoSizeInMB = 15;
      if (file.size > maxVideoSizeInMB * 1024 * 1024) {
        alert("File size exceeds 15MB. Please select a smaller video.");
        return;
      }
      const preview = URL.createObjectURL(file);
      setUploadedFiles((prev) => ({ ...prev, video: { file, preview } }));
    }
  };

  const removeFile = (type) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: null }));
  };

  const delayOptions = [
    { value: "", label: "Delay Between Messages", disabled: true },
    { value: "1", label: "1 Sec" },
    { value: "2", label: "2 Sec" },
    { value: "3", label: "3 Sec" },
    { value: "4", label: "4 Sec" },
    { value: "5", label: "5 Sec" },
    { value: "10", label: "10 Sec" },
    { value: "15", label: "15 Sec" },
    { value: "20", label: "20 Sec" },
    { value: "25", label: "25 Sec" },
    { value: "30", label: "30 Sec" },
    { value: "60", label: "60 Sec" },
  ];
  // This function is called when the "Send Now" button is clicked.
  // It collects all the data and files, then sends a POST request to your backend.
  const handleSendCampaign = async () => {
    const formData = new FormData();
    formData.append("campaignTitle", campaignTitle);
    formData.append("selectedGroup", selectedGroup);
    formData.append("whatsAppNumbers", whatsAppNumbers);
    // Send Froala editor content as "userMessage" to match the database.
    formData.append("userMessage", editorData);
    formData.append("selectedTemplate", selectedTemplate);
    formData.append("countryCode", selectedCountry);

    // Append captions for media files.
    formData.append("image1Caption", mediaCaptions.image1);
    formData.append("image2Caption", mediaCaptions.image2);
    formData.append("image3Caption", mediaCaptions.image3);
    formData.append("image4Caption", mediaCaptions.image4);
    formData.append("pdfCaption", mediaCaptions.pdf);
    formData.append("videoCaption", mediaCaptions.video);
    // formData.append("buttonDetail", buttonDetail);
    formData.append("BetweenMessages", delayBetweenMessages);

    // Append image files (if available).
    ["image1", "image2", "image3", "image4"].forEach((type) => {
      if (uploadedFiles[type]) {
        formData.append(type, uploadedFiles[type].file);
      }
    });
    // Append PDF.
    if (uploadedFiles.pdf) {
      formData.append("pdf", uploadedFiles.pdf);
    }
    // Append video.
    if (uploadedFiles.video) {
      formData.append("video", uploadedFiles.video.file);
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/InternationalPersonalCampaign/sendInternationalpersonalCampaign`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Campaign sent successfully!");
      // Optionally reset the form or perform additional actions here.
    } catch (error) {
      console.error("Error sending campaign", error);
      alert("Failed to send campaign");
    }
  };

  return (
    <>
      <section className="w-[100%] bg-gray-200 mt-[75px] flex justify-center flex-col">
        <CreditHeader />
        <div className="w-full px-4 mt-8">
          <div className="w-full py-2 mb-3 bg-white">
            <h1
              className="text-2xl text-black font-semibold pl-4"
              style={{ fontSize: "32px" }}
            >
              International Personal Quick Campaign
            </h1>
          </div>

          <div className="rounded flex gap-4">
            {/* Left Section */}
            <div className="w-[40%] flex flex-col">
              {/* Campaign Title */}
              <div className="w-full flex items-center ">
                <p className="w-1/3 py-2 bg-brand_colors text-white text-center font-semibold text-sm m-0 rounded-md">
                  Campaign Title
                </p>
                <input
                  type="text"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  className="w-full form-control border-black rounded-md py-2 px-4 text-black placeholder-gray-500"
                  placeholder="Enter Campaign Title"
                />
              </div>

              {/* Country Selection Dropdown */}
              <div className="flex items-center gap-4">
                <select
                  className="form-select border-black "
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
              </div>

              {/* Group Selection Dropdown */}
              <div className="flex items-center gap-4">
                <select
                  className="form-select border-black"
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
              </div>
              {/* WhatsApp Numbers (Textarea) */}
              <div className="w-full h-auto">
                <textarea
                  className="p-2 rounded w-full min-h-[910px] bg-white text-black border-black border-[0.1px]"
                  placeholder="Enter WhatsApp numbers"
                  rows={8}
                  style={{ height: "720px" }}
                  value={whatsAppNumbers}
                  onChange={(e) => setWhatsAppNumbers(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-[60%] flex flex-col gap-4">
              {/* Status Display */}
              <div className="flex gap-4">
                <div className="w-full px-4 py-2 rounded-md text-white font-semibold bg-[#0d0c0d] text-center">
                  Total 0
                </div>
                <div className="w-full px-4 py-2 rounded-md text-white font-semibold bg-[#033b01] text-center">
                  Valid 0
                </div>
                <div className="w-full px-4 py-2 rounded-md text-white font-semibold bg-[#f70202] text-center">
                  InValid 0
                </div>
                <div className="w-full px-4 py-2 rounded-md text-white font-semibold bg-[#8a0418] text-center">
                  Duplicate 0
                </div>
              </div>

              {/* Message Template Dropdown */}
              <div className="w-full flex flex-col text-white">
                <select
                  className="w-full p-2 rounded bg-white text-black border-black border-[0.1px]"
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
                    <option
                      key={template.templateId}
                      value={template.templateId}
                    >
                      {template.template_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Froala Editor for Custom Message */}
              <div className="w-full flex flex-col gap-6 border border-black rounded">
                <div className="w-full">
                  <FroalaEditor
                    tag="textarea"
                    config={{
                      placeholderText: "Enter your text here...",
                      charCounterCount: true,
                      toolbarButtons: ["bold", "italic", "formatOL"], // Bold, Italic, and Numeric Lists
                      quickInsertButtons: [], // Disable quick-insert options
                      pluginsEnabled: [], // Enable list functionality
                      height: 300,
                    }}
                    model={editorData}
                    onModelChange={(data) => setEditorData(data)}
                  />
                </div>
              </div>

              {/* Upload Media Section */}

              <div className="w-full flex gap-[20px] border border-black rounded">
                <div className="w-full h-auto bg-white rounded p-3">
                  <div className="w-full flex flex-col gap-4">
                    <h6>Upload Image (File size 2 MB.) :</h6>
                    <div className="w-full grid grid-cols-2 gap-4">
                      {["image1", "image2", "image3", "image4"].map(
                        (type, index) => (
                          <div key={index} className="w-full flex gap-4">
                            <input
                              className="hidden"
                              type="file"
                              ref={inputRefs[type]}
                              onChange={(e) => handleFileUpload(e, type)}
                            />
                            <div className="w-full flex flex-col gap-2">
                              <div className="flex">
                                <div
                                  className="flex cursor-pointer"
                                  onClick={() =>
                                    inputRefs[type].current.click()
                                  }
                                >
                                  <button
                                    className="bg-green-600 text-white py-2 text-center rounded"
                                    style={{
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Image {index + 1}
                                  </button>
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    maxLength={1500}
                                    className="w-[300px] border border-gray-300 py-2 px-3 rounded-lg"
                                    placeholder={`Enter a caption for Image${
                                      index + 1
                                    }`}
                                    value={mediaCaptions[type] || ""}
                                    onChange={(e) =>
                                      setMediaCaptions((prev) => ({
                                        ...prev,
                                        [type]: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </div>
                              {uploadedFiles[type] && (
                                <div className="w-full h-[250px] relative p-2 rounded border-[1px] border-gray-200">
                                  <img
                                    src={uploadedFiles[type]}
                                    className="absolute z-0 w-full h-full object-contain"
                                    alt={`Uploaded ${type}`}
                                  />
                                  <MdDelete
                                    className="text-[25px] cursor-pointer text-red-500 absolute z-10 top-2 right-2"
                                    onClick={() => removeFile(type)}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <hr />
                    <div className="w-full flex gap-4">
                      {/* PDF Upload */}
                      <div className="w-full">
                        <h6>PDF (File size 10 MB.) :</h6>
                        <div className="w-full flex gap-4">
                          <input
                            className="hidden"
                            type="file"
                            ref={inputRefs.pdf}
                            onChange={(e) => handleFileUpload(e, "pdf")}
                          />
                          <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex">
                              <div
                                className="flex cursor-pointer"
                                onClick={() => inputRefs.pdf.current.click()}
                              >
                                <button
                                  className="bg-green-600 text-white py-2 text-center rounded"
                                  style={{
                                    paddingLeft: "29px",
                                    paddingRight: "29px",
                                  }}
                                >
                                  PDF
                                </button>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  className="w-[300px] border border-gray-300 py-2 px-3 rounded-lg"
                                  placeholder="Enter a caption for PDF"
                                  maxLength={1500}
                                  value={mediaCaptions.pdf || ""}
                                  onChange={(e) =>
                                    setMediaCaptions((prev) => ({
                                      ...prev,
                                      pdf: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            {uploadedFiles.pdf && (
                              <div className="w-full h-[250px] relative p-2 rounded border-[1px] border-gray-200">
                                <div className="w-full h-full flex justify-center items-center">
                                  <FaFilePdf className="text-[150px] text-red-400" />
                                </div>
                                <MdDelete
                                  className="text-[25px] cursor-pointer text-red-500 absolute z-10 top-2 right-2"
                                  onClick={() => removeFile("pdf")}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Video Upload */}
                      <div className="w-full">
                        <h6>Video (File size 15 MB.) :</h6>
                        <div className="w-full flex gap-4">
                          <input
                            className="hidden"
                            type="file"
                            ref={inputRefs.video}
                            onChange={(e) => handleFileUpload(e, "video")}
                          />
                          <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex">
                              <div
                                className="flex cursor-pointer"
                                onClick={() => inputRefs.video.current.click()}
                              >
                                <button
                                  className="bg-green-600 text-white py-2 text-center rounded"
                                  style={{
                                    paddingLeft: "24px",
                                    paddingRight: "24px",
                                  }}
                                >
                                  Video
                                </button>
                                <input
                                  className="w-full border-black border-[1px] py-2 px-2 text-black bg-white cursor-pointer hidden"
                                  disabled
                                  type="text"
                                  value={
                                    uploadedFiles.video
                                      ? "Video Selected"
                                      : "Choose Video To Upload"
                                  }
                                  readOnly
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  maxLength={1500}
                                  className="w-[300px] border border-gray-300 py-2 px-3 rounded-lg"
                                  placeholder="Enter a caption for Video"
                                  value={mediaCaptions.video || ""}
                                  onChange={(e) =>
                                    setMediaCaptions((prev) => ({
                                      ...prev,
                                      video: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            {uploadedFiles.video && (
                              <div className="w-full h-[250px] relative p-2 rounded border-[1px] border-gray-200">
                                <video
                                  src={URL.createObjectURL(uploadedFiles.video)}
                                  className="w-full h-full object-contain"
                                  controls
                                />
                                <MdDelete
                                  className="text-[25px] cursor-pointer text-red-500 absolute z-10 top-2 right-2"
                                  onClick={() => removeFile("video")}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button Detail and Delay Between Messages Section */}
              <div className="w-full flex gap-[20px]">
                <button
                  className="w-full rounded text-center bg-brand_color_4 h-[40px] text-white font-[500] flex items-center justify-center"
                  // value={buttonDetail}
                  // onChange={(e) => setButtonDetail(e.target.value)}
                  placeholder="Enter Button Detail"
                >
                  Button Detail
                </button>
              </div>
              {/* Delay Between Messages Select */}

              <div className="w-full flex flex-col text-black">
                <select
                  className="w-full p-2 rounded bg-white border-black border-[0.1px]"
                  value={delayBetweenMessages}
                  onChange={(e) => setDelayBetweenMessages(e.target.value)}
                >
                  {delayOptions.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full pb-3">
                <button
                  className="w-full rounded text-center bg-green-600 h-[40px] text-white font-[500] flex items-center justify-center"
                  onClick={handleSendCampaign}
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PerosnalCampaign2;
