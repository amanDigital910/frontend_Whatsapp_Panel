import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import CreditHeader from "../../../components/CreditHeader";
import { FaFilePdf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";

const PerosnalButtonCampaign = () => {
  // File and editor states
  const inputRef = useRef(null);
  const [editorData, setEditorData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileObj, setSelectedFileObj] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [caption, setCaption] = useState("");

  // API fetched data
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [msgTemplates, setMsgTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Additional form fields
  const [campaignTitle, setCampaignTitle] = useState("");
  const [whatsAppNumbers, setWhatsAppNumbers] = useState("");
  const [button1Text, setButton1Text] = useState("");
  const [button1Number, setButton1Number] = useState("");
  const [button2Text, setButton2Text] = useState("");
  const [button2Url, setButton2Url] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Fetch message groups using axios
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msggroup/`)
      .then((response) => setGroups(response.data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  // Fetch message templates using axios
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msgtemplate/`)
      .then((response) => setMsgTemplates(response.data))
      .catch((error) =>
        console.error("Error fetching message templates:", error)
      );
  }, []);

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

  // Handle file upload via click or drag-and-drop
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setSelectedFile(fileUrl);
    setSelectedFileObj(file);

    // Determine file type and update state accordingly
    if (file.type.startsWith("image/")) {
      setFileType("image");
    } else if (file.type.startsWith("video/")) {
      setFileType("video");
    } else if (file.type === "application/pdf") {
      setFileType("pdf");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setSelectedFileObj(null);
    setFileType(null);
    setCaption("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setSelectedFile(fileUrl);
    setSelectedFileObj(file);

    if (file.type.startsWith("image/")) {
      setFileType("image");
    } else if (file.type.startsWith("video/")) {
      setFileType("video");
    } else if (file.type === "application/pdf") {
      setFileType("pdf");
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // Update WhatsApp numbers when a group is selected.
  useEffect(() => {
    if (selectedGroup !== "") {
      const group = groups.find(
        (g) => g.groupId.toString() === selectedGroup.toString()
      );
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

  // Handle sending the campaign data via axios
  const handleSendCampaign = async () => {
    const formData = new FormData();
    formData.append("campaignTitle", campaignTitle);
    formData.append("selectedGroup", selectedGroup);
    formData.append("whatsAppNumbers", whatsAppNumbers);
    formData.append("userMessage", editorData);
    formData.append("countryCode", selectedCountry);
    formData.append("selectedTemplate", selectedTemplate);
    formData.append("button1Text", button1Text);
    formData.append("button1Number", button1Number);
    formData.append("button2Text", button2Text);
    formData.append("button2Url", button2Url);

    // Append the file and caption based on fileType
    if (selectedFileObj) {
      if (fileType === "pdf") {
        formData.append("pdf", selectedFileObj);
        formData.append("pdfCaption", caption);
      } else if (fileType === "video") {
        formData.append("video", selectedFileObj);
        formData.append("videoCaption", caption);
      } else if (fileType === "image") {
        // Assuming a single image file is stored in the "image1" column
        formData.append("image1", selectedFileObj);
        formData.append("image1Caption", caption);
      }
    }

    // (Optional) Log each key/value pair from the FormData for debugging.
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/InternationalPersonalCampaign/sendInternationalpersonalCampaign`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Campaign sent successfully:", response.data);
      // Optionally, clear form fields or display a success message here
    } catch (error) {
      if (error.response) {
        console.error("Error sending campaign:", error.response.data);
      } else {
        console.error("Error sending campaign:", error.message);
      }
    }
  };

  return (
    <section className="w-[100%] bg-gray-200 flex justify-center flex-col mt-[75px] pb-5">
      <CreditHeader />

      <div className="w-full px-4 mt-8">
        <div className="w-full py-2 mb-3 bg-white">
          <h1
            className="text-2xl text-black font-semibold pl-4"
            style={{ fontSize: "32px" }}
          >
            International Perosnal Button Campaign
          </h1>
        </div>

        <div className="flex gap-6">
          {/* Left Column */}
          <div className="w-2/5 flex flex-col gap-6">
            {/* Campaign Title */}
            <div className="flex items-center">
              <p className="w-1/3 py-2 bg-brand_colors text-white text-center font-semibold text-sm m-0 rounded-md">
                Campaign Title
              </p>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="w-full border-black form-control rounded-md py-2 px-4 text-black placeholder-gray-500"
                placeholder="Enter Campaign Title"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                className="form-select border-black"
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

            {/* Message Group Dropdown */}
            <div className="flex items-center gap-4">
              <select
                className="form-select border-black"
                aria-label="Select Message Group"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">Select Group Number</option>
                {groups.map((group) => (
                  <option key={group.groupId} value={group.groupId}>
                    {group.group_name}
                  </option>
                ))}
              </select>
            </div>
            {/* WhatsApp Numbers */}
            <div className="w-full">
              <textarea
                className="w-full p-4 rounded-md bg-white text-black border-black form-control placeholder-gray-500"
                placeholder="Enter WhatsApp Numbers (comma separated)"
                rows={8}
                style={{ height: "710px" }}
                value={whatsAppNumbers}
                onChange={(e) => setWhatsAppNumbers(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-3/5 flex flex-col gap-6">
            {/* Status Section */}
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
            <div className="w-full">
              <select
                className="form-select form-control border-black"
                value={selectedTemplate}
                onChange={(e) => {
                  const templateId = e.target.value;
                  setSelectedTemplate(templateId);
                  const template = msgTemplates.find(
                    (t) => t.templateId.toString() === templateId.toString()
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
            </div>

            {/* Rich Text Editor */}
            <div className="w-full flex flex-col gap-6 border border-black rounded">
              <div className="w-full">
                <FroalaEditor
                  tag="textarea"
                  config={{
                    placeholderText: "Enter your text here...",
                    charCounterCount: true,
                    toolbarButtons: ["bold", "italic", "formatOL"],
                    quickInsertButtons: [],
                    pluginsEnabled: [],
                    height: 300,
                    events: {
                      initialized: function () {
                        const toolbar =
                          document.querySelector(".fr-second-toolbar");
                        if (toolbar) {
                          toolbar.style.color = "white";
                        }
                      },
                    },
                  }}
                  model={editorData}
                  onModelChange={(data) => setEditorData(data)}
                />
              </div>
            </div>

            {/* File Upload and Button Settings */}
            <div className="w-full">
              <div
                className="w-full h-[200px] border-2 border-dashed border-gray-400 rounded flex justify-center items-center text-gray-500 hover:border-blue-400 hover:text-blue-400 cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
              >
                {selectedFile ? (
                  <div className="w-full h-full relative">
                    {fileType === "image" && (
                      <img
                        src={selectedFile}
                        alt="Uploaded File"
                        className="w-full h-full object-contain rounded"
                      />
                    )}
                    {fileType === "video" && (
                      <video
                        src={selectedFile}
                        className="w-full h-full object-contain rounded"
                        controls
                      />
                    )}
                    {fileType === "pdf" && (
                      <div className="w-full h-full flex justify-center items-center">
                        <FaFilePdf className="text-[150px] text-red-400" />
                      </div>
                    )}
                    <MdDelete
                      className="absolute top-2 right-2 text-[25px] text-red-500 cursor-pointer"
                      onClick={removeFile}
                    />
                  </div>
                ) : (
                  <p className="text-center">
                    Drag and drop your file here or click to upload
                    image/PDF/Video
                  </p>
                )}
              </div>

              <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*,application/pdf"
                className="hidden"
                onChange={handleFileInputChange}
              />

              {/* File Caption Input */}
              {selectedFile && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Enter file caption"
                    className="w-full p-2 border border-gray-400 rounded"
                  />
                </div>
              )}

              {/* Button Details */}
              <div className="w-full mt-4">
                <div className="w-full flex gap-3">
                  <input
                    placeholder="Button 1 Display Text (Call Now)"
                    type="text"
                    value={button1Text}
                    onChange={(e) => setButton1Text(e.target.value)}
                    className="w-[40%] p-2 rounded bg-white text-black border border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Max 10 digit number allowed"
                    value={button1Number}
                    onChange={(e) => setButton1Number(e.target.value)}
                    className="w-[60%] p-2 rounded bg-white text-black border border-gray-300"
                  />
                </div>
                <br />
                <div className="w-full flex gap-3">
                  <input
                    type="text"
                    placeholder="Button 2 Display Text (Visit Now)"
                    value={button2Text}
                    onChange={(e) => setButton2Text(e.target.value)}
                    className="w-[40%] p-2 rounded bg-white text-black border border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="https://example.com/"
                    value={button2Url}
                    onChange={(e) => setButton2Url(e.target.value)}
                    className="w-[60%] p-2 rounded bg-white text-black border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Send Now Button */}
        <div className="w-full mt-4">
          <button
            className="w-full rounded-md bg-green-600 py-3 text-white font-semibold flex items-center justify-center hover:bg-green-500 transition duration-300"
            onClick={handleSendCampaign}
          >
            Send Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PerosnalButtonCampaign;
