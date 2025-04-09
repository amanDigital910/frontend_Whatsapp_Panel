import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import CreditHeader from "../../../components/CreditHeader";
import Notes from "../../../components/Notes";
import { FaFilePdf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";

const PersonalCampaignPoll = () => {
  // Campaign and group details
  const [campaignTitle, setCampaignTitle] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [whatsAppNumbers, setWhatsAppNumbers] = useState("");

  // Editor content (sent as userMessage)
  const [editorData, setEditorData] = useState("");

  // Media file uploads – images and video are stored as an object (with file and preview)
  const [uploadedFiles, setUploadedFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    pdf: null,
    video: null,
  });

  // Captions for each media file
  const [mediaCaptions, setMediaCaptions] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    pdf: "",
    video: "",
  });

  // Refs for hidden file inputs
  const inputRefs = {
    image1: useRef(null),
    image2: useRef(null),
    image3: useRef(null),
    image4: useRef(null),
    pdf: useRef(null),
    video: useRef(null),
  };

  // Message templates
  const [msgTemplates, setMsgTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Delay between messages
  const [delayBetweenMessages, setDelayBetweenMessages] = useState("");

  // Poll question and options (maximum 7 options)
  const [question, setQuestion] = useState("");
  const [inputs, setInputs] = useState([""]);

  // Fetch groups from your API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msggroup/`)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  // Fetch message templates from your API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msgtemplate`)
      .then((response) => setMsgTemplates(response.data))
      .catch((error) =>
        console.error("Error fetching message templates:", error)
      );
  }, []);

  // When a group is selected, update the WhatsApp numbers field
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

  // Handle file uploads for images, PDF, and video
  const handleFileUpload = (e, type) => {
    const files = e.target.files;
    if (!files.length) return;
    const file = files[0];

    if (type.startsWith("image")) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        alert("Invalid file type. Please select a JPEG, PNG, or GIF image.");
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
        alert("Invalid file type. Please select a valid MP4 video.");
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

  // Update media captions
  const handleMediaCaptionChange = (e, type) => {
    setMediaCaptions((prev) => ({ ...prev, [type]: e.target.value }));
  };

  // Update poll options
  const handleInputChange = (value, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const handleAddMore = () => {
    if (inputs.length < 7) {
      setInputs([...inputs, ""]);
    } else {
      alert("You can only add up to 7 options.");
    }
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

  // When the "Send Now" button is clicked, collect and send all data
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("campaignTitle", campaignTitle);
    formData.append("selectedGroup", selectedGroup);
    formData.append("whatsAppNumbers", whatsAppNumbers);
    formData.append("userMessage", editorData);
    formData.append("selectedTemplate", selectedTemplate);
    formData.append("BetweenMessages", delayBetweenMessages);
    // Send poll question and options (stringify the options array)
    formData.append("pollQuestion", question);
    formData.append("pollOptions", JSON.stringify(inputs.slice(0, 7)));

    // Append media captions
    formData.append("image1Caption", mediaCaptions.image1);
    formData.append("image2Caption", mediaCaptions.image2);
    formData.append("image3Caption", mediaCaptions.image3);
    formData.append("image4Caption", mediaCaptions.image4);
    formData.append("pdfCaption", mediaCaptions.pdf);
    formData.append("videoCaption", mediaCaptions.video);

    // Append media files (if available)
    ["image1", "image2", "image3", "image4"].forEach((type) => {
      if (uploadedFiles[type]) {
        formData.append(type, uploadedFiles[type].file);
      }
    });
    if (uploadedFiles.pdf) formData.append("pdf", uploadedFiles.pdf);
    if (uploadedFiles.video) formData.append("video", uploadedFiles.video.file);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/PersonalCampaign/sendpersonalCampaign`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Campaign sent successfully!");
      // Optionally reset the form fields here.
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
              Personal Poll Campaign
            </h1>
          </div>
          <div className="w-[100%] px-4 rounded p-3 bg-white flex gap-4">
            {/* Left Column – Campaign Title, Group, WhatsApp Numbers */}
            <div className="w-[40%] flex flex-col gap-4">
              <div className="w-full flex items-center">
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
              <div className="w-full flex flex-col">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black border-black border-[0.1px]"
                >
                  <option value="" disabled>
                    Select Group Number
                  </option>
                  {groups.map((group) => (
                    <option key={group.groupId} value={group.groupId}>
                      {group.group_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full h-auto">
                <textarea
                  value={whatsAppNumbers}
                  onChange={(e) => setWhatsAppNumbers(e.target.value)}
                  className="p-2 rounded w-full min-h-[1090px] bg-white text-black border-black border-[0.1px]"
                  placeholder="Enter whatsapp number"
                ></textarea>
              </div>
            </div>
            {/* Right Column – Templates, Message, Media, Poll & Delay */}
            <div className="w-[60%] flex flex-col gap-4">
              {/* Status Display (placeholders) */}
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
                    if (template) setEditorData(template.template_msg);
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
              {/* Froala Editor for User Message */}
              <div className="w-full h-auto">
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
                      }}
                      model={editorData}
                      onModelChange={(data) => setEditorData(data)}
                    />
                  </div>
                </div>
              </div>
              {/* Media Upload Section */}
              <div className="w-full flex gap-[20px]">
                <div className="w-full h-auto bg-white rounded p-3 border border-black">
                  <div className="w-full flex flex-col gap-4">
                    <h6>Upload Image (File size 2 MB.) :</h6>
                    <div className="w-full grid grid-cols-2 gap-4">
                      {["image1", "image2", "image3", "image4"].map(
                        (type, index) => (
                          <div
                            key={index}
                            className="w-full flex flex-col gap-2"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="flex cursor-pointer"
                                onClick={() => inputRefs[type].current.click()}
                              >
                                <button
                                  className="bg-green-600 text-white py-2 text-center rounded"
                                  style={{
                                    paddingLeft: "10px",
                                    paddingRight: "5px",
                                  }}
                                >
                                  Image {index + 1}
                                </button>
                                <input
                                  className="hidden"
                                  type="file"
                                  ref={inputRefs[type]}
                                  onChange={(e) => handleFileUpload(e, type)}
                                />
                                <input
                                  className="w-full border-black border-[1px] py-2 px-2 text-black bg-white cursor-pointer hidden"
                                  disabled
                                  type="text"
                                  value={
                                    uploadedFiles[type]
                                      ? `Image${index + 1} Selected`
                                      : `Choose Image${index + 1} To Upload`
                                  }
                                  readOnly
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  maxLength={1500}
                                  value={mediaCaptions[type]}
                                  onChange={(e) =>
                                    handleMediaCaptionChange(e, type)
                                  }
                                  className="w-[300px] border border-gray-300 py-2 px-3 rounded-lg"
                                  placeholder={`Enter a caption for Image ${
                                    index + 1
                                  }`}
                                />
                              </div>
                            </div>
                            {uploadedFiles[type] && (
                              <div className="w-full h-[250px] relative p-2 rounded border border-gray-200">
                                <img
                                  src={uploadedFiles[type].preview}
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
                        )
                      )}
                    </div>
                    <hr />
                    <div className="w-full flex gap-4">
                      {/* PDF Upload */}
                      <div className="w-full">
                        <h6>PDF (File size 10 MB.) :</h6>
                        <div className="w-full flex flex-col gap-2">
                          <div className="w-full flex items-center gap-4">
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
                              <input
                                className="hidden"
                                type="file"
                                ref={inputRefs.pdf}
                                onChange={(e) => handleFileUpload(e, "pdf")}
                              />
                              <input
                                className="w-full border-black border-[1px] py-2 px-2 text-black bg-white cursor-pointer hidden"
                                disabled
                                type="text"
                                value={
                                  uploadedFiles.pdf
                                    ? "PDF Selected"
                                    : "Choose PDF To Upload"
                                }
                                readOnly
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                maxLength={1500}
                                value={mediaCaptions.pdf}
                                onChange={(e) =>
                                  handleMediaCaptionChange(e, "pdf")
                                }
                                className="w-[300px] border border-gray-300 py-2 px-3 rounded-lg"
                                placeholder="Enter a caption for PDF"
                              />
                            </div>
                          </div>
                          {uploadedFiles.pdf && (
                            <div className="w-full h-[250px] relative p-2 rounded border border-gray-200">
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
                      {/* Video Upload */}
                      <div className="w-full">
                        <h6>Video (File size 15 MB.) :</h6>
                        <div className="w-full flex flex-col gap-2">
                          <div className="w-full flex items-center gap-4">
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
                                className="hidden"
                                type="file"
                                ref={inputRefs.video}
                                onChange={(e) => handleFileUpload(e, "video")}
                              />
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
                                value={mediaCaptions.video}
                                onChange={(e) =>
                                  handleMediaCaptionChange(e, "video")
                                }
                                className="w-[300px] border border-gray-300 py-2 px-3 rounded-lg"
                                placeholder="Enter a caption for Video"
                              />
                            </div>
                          </div>
                          {uploadedFiles.video && (
                            <div className="w-full h-[250px] relative p-2 rounded border border-gray-200">
                              <video
                                src={uploadedFiles.video.preview}
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
              <hr />
              {/* Poll Question and Options */}
              <div className="w-full text-black">
                <div className="flex flex-col gap-2">
                  <p>Question</p>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask Your Question"
                    className="py-1 px-2 rounded bg-white text-black border border-black"
                  />
                  <div className="flex mt-3">
                    <div className="w-[70%] flex flex-col gap-2">
                      {inputs.map((input, index) => (
                        <input
                          key={index}
                          value={input}
                          onChange={(e) =>
                            handleInputChange(e.target.value, index)
                          }
                          className="py-1 px-2 rounded bg-white text-black border border-black"
                          placeholder={`Option ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div className="w-[30%] px-2">
                      <button
                        className="w-full rounded px-2 py-1 bg-brand_color_4 text-white font-semibold"
                        onClick={handleAddMore}
                      >
                        Add More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Delay Between Messages */}
              <div className="w-full flex flex-col text-black">
                <select
                  className="w-full p-2 rounded bg-white border border-black"
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
              <div className="w-full">
                <button
                  className="w-full rounded text-center bg-green-600 h-10 text-white font-semibold flex items-center justify-center"
                  onClick={handleSubmit}
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

export default PersonalCampaignPoll;
