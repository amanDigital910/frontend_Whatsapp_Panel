import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import CreditHeader from "../../../components/CreditHeader";
import userImage from "../../../assets/profile.png";
import { FaFilePdf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";

const VirtualDpCampaign = () => {
  // Form and editor states
  const [campaignTitle, setCampaignTitle] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [whatsAppNumbers, setWhatsAppNumbers] = useState("");
  const [editorData, setEditorData] = useState("");

  // Data fetched from APIs
  const [groups, setGroups] = useState([]);
  const [msgTemplates, setMsgTemplates] = useState([]);

  // State for media captions (for images, PDF, video)
  const [mediaCaptions, setMediaCaptions] = useState({});

  // State for user profile file.
  // The file will be sent with the key "userprofile"
  const [userprofile, setUserprofile] = useState(null);
  // For preview of user profile
  const [userprofilePreview, setUserprofilePreview] = useState(null);
  const [fileType, setFileType] = useState("");

  // Refs for file uploads (other media: images, PDF, video)
  const inputRefs = {
    image1: useRef(null),
    image2: useRef(null),
    image3: useRef(null),
    image4: useRef(null),
    pdf: useRef(null),
    video: useRef(null),
  };

  // State for other media uploads: we store both a preview URL and the actual file.
  const [uploadedFiles, setUploadedFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    pdf: null,
    video: null,
  });

  // Ref for the WhatsApp numbers textarea (for auto-resizing)
  const textareaRef = useRef(null);
  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Fetch groups when the component mounts.
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msggroup/`)
      .then((response) => setGroups(response.data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  // Fetch message templates when the component mounts.
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/msgtemplate`)
      .then((response) => setMsgTemplates(response.data))
      .catch((error) =>
        console.error("Error fetching message templates:", error)
      );
  }, []);

  // Update WhatsApp numbers when a group is selected.
  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find((g) => g.groupId === parseInt(selectedGroup));
      if (group) {
        try {
          const numbers = JSON.parse(group.group_number);
          setWhatsAppNumbers(numbers.join("\n"));
        } catch (e) {
          console.error("Error parsing group numbers", e);
          setWhatsAppNumbers(group.group_number);
        }
      } else {
        setWhatsAppNumbers("");
      }
    } else {
      setWhatsAppNumbers("");
    }
  }, [selectedGroup, groups]);

  // Update editor content when a template is selected.
  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);
    const template = msgTemplates.find(
      (t) => t.templateId === parseInt(templateId)
    );
    setEditorData(
      template ? template.template_body || template.template_name : ""
    );
  };

  // Handle user profile file change.
  const handleUserprofileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUserprofilePreview(URL.createObjectURL(selectedFile));
      setFileType(selectedFile.type);
      setUserprofile(selectedFile);
    }
  };

  // Handle other media uploads.
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
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        alert("File size exceeds 2MB. Please select a smaller image.");
        return;
      }
      const imagePreview = { preview: URL.createObjectURL(file), file };
      setUploadedFiles((prev) => ({ ...prev, [type]: imagePreview }));
    } else if (type === "pdf") {
      if (file.type !== "application/pdf") {
        alert("Invalid file type. Please select a PDF file.");
        return;
      }
      const maxPdfSizeInMB = 10;
      const maxPdfSizeInBytes = maxPdfSizeInMB * 1024 * 1024;
      if (file.size > maxPdfSizeInBytes) {
        alert(
          `File size exceeds ${maxPdfSizeInMB}MB. Please select a smaller PDF.`
        );
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
      const maxVideoSizeInBytes = maxVideoSizeInMB * 1024 * 1024;
      if (file.size > maxVideoSizeInBytes) {
        alert(
          `File size exceeds ${maxVideoSizeInMB}MB. Please select a smaller video.`
        );
        return;
      }
      const videoPreview = { preview: URL.createObjectURL(file), file };
      setUploadedFiles((prev) => ({ ...prev, video: videoPreview }));
    }
  };

  const removeFile = (type) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: null }));
  };

  // When "Send Now" is clicked, build a FormData object and send to the API.
  // The user profile file is appended with the key "userprofile".
  const handleSend = async () => {
    const formData = new FormData();
    formData.append("campaignTitle", campaignTitle);
    formData.append("selectedGroup", selectedGroup);
    formData.append("selectedTemplate", selectedTemplate);
    formData.append("whatsAppNumbers", whatsAppNumbers);
    formData.append("userMessage", editorData);
    // Append media captions
    formData.append("image1Caption", mediaCaptions.image1 || "");
    formData.append("image2Caption", mediaCaptions.image2 || "");
    formData.append("image3Caption", mediaCaptions.image3 || "");
    formData.append("image4Caption", mediaCaptions.image4 || "");
    formData.append("pdfCaption", mediaCaptions.pdf || "");
    formData.append("videoCaption", mediaCaptions.video || "");
    // Append the user profile file using the key "userprofile"
    if (userprofile) formData.append("userprofile", userprofile);
    // Append other uploaded media files
    if (uploadedFiles.image1 && uploadedFiles.image1.file) {
      formData.append("image1", uploadedFiles.image1.file);
    }
    if (uploadedFiles.image2 && uploadedFiles.image2.file) {
      formData.append("image2", uploadedFiles.image2.file);
    }
    if (uploadedFiles.image3 && uploadedFiles.image3.file) {
      formData.append("image3", uploadedFiles.image3.file);
    }
    if (uploadedFiles.image4 && uploadedFiles.image4.file) {
      formData.append("image4", uploadedFiles.image4.file);
    }
    if (uploadedFiles.pdf) {
      formData.append("pdf", uploadedFiles.pdf);
    }
    if (uploadedFiles.video && uploadedFiles.video.file) {
      formData.append("video", uploadedFiles.video.file);
    }

    // Log each key/value pair from the FormData

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/campaign/sendCampaign`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        alert("Campaign sent successfully!");
      } else {
        alert("Failed to send campaign");
      }
    } catch (error) {
      console.error("Error sending campaign:", error);
      alert("Error sending campaign. Please try again.");
    }
  };

  return (
    <section className="w-full bg-gray-200 flex justify-center flex-col mt-[75px]">
      <CreditHeader />
      <div className="w-full px-4 mt-8">
        <div className="w-full py-2 mb-3 bg-white">
          <h1
            className="text-2xl text-black font-semibold pl-4"
            style={{ fontSize: "32px" }}
          >
            DP Campaign
          </h1>
        </div>

        <div className="flex gap-6 mb-3">
          {/* Left Column: Campaign Title, Group Selection & WhatsApp Numbers */}
          <div className="w-2/5 flex flex-col gap-6">
            {/* Campaign Title */}
            <div className="flex items-center">
              <p className="w-1/3 py-2 bg-brand_colors text-white text-center font-semibold text-sm m-0 rounded-md">
                Campaign Title
              </p>
              <input
                type="text"
                className="w-full border-black form-control rounded-md py-2 px-4 text-black placeholder-gray-500"
                placeholder="Enter Campaign Title"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
              />
            </div>

            {/* Group Dropdown */}
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

            {/* WhatsApp Numbers Textarea */}
            <div className="w-full">
              <textarea
                className="w-full p-4 rounded-md bg-white text-black border-black form-control placeholder-gray-500"
                placeholder="Enter WhatsApp Number"
                rows={8}
                style={{ height: "510px" }}
                value={whatsAppNumbers}
                onChange={(e) => setWhatsAppNumbers(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Right Column: Status, Template Selection, Image/Editor & File Uploads */}
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

            {/* Template Dropdown */}
            <div className="w-full">
              <select
                className="form-select border-black"
                aria-label="Select Template"
                value={selectedTemplate}
                onChange={handleTemplateChange}
              >
                <option value="">Select Your Template</option>
                {msgTemplates.map((template) => (
                  <option key={template.templateId} value={template.templateId}>
                    {template.template_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image + Editor Section */}
            <div className="w-full flex gap-3">
              <div className="w-[20%] flex flex-col gap-1">
                <div className="w-full h-[110px]">
                  <img
                    src={userprofilePreview ? userprofilePreview : userImage}
                    className="w-full h-full rounded cursor-pointer"
                    alt="Profile"
                  />
                </div>
                <input
                  type="file"
                  onChange={handleUserprofileChange}
                  className="text-white"
                  accept="image/*"
                />
                {userprofilePreview && (
                  <button
                    onClick={() => {
                      setUserprofile(null);
                      setUserprofilePreview(null);
                    }}
                    className="text-white px-3 py-2 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>

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
                    }}
                    model={editorData}
                    onModelChange={(data) => setEditorData(data)}
                  />
                </div>
              </div>
            </div>

            {/* File Uploads Section */}
            <div className="w-full h-auto bg-white rounded p-3 border border-black">
              <div className="w-full flex flex-col gap-4">
                <h6>Upload Image (File size 2 MB.) :</h6>
                <div className="w-full grid grid-cols-2 gap-4">
                  {["image1", "image2", "image3", "image4"].map(
                    (type, index) => (
                      <div key={index} className="w-full flex gap-4">
                        <input
                          type="file"
                          className="hidden"
                          ref={inputRefs[type]}
                          onChange={(e) => handleFileUpload(e, type)}
                        />
                        <div className="w-full flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="flex cursor-pointer"
                              onClick={() => inputRefs[type].current.click()}
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
                            <input
                              type="text"
                              maxLength={1500}
                              className="w-[300px] border border-gray-300 py-2 px-3 rounded-lg"
                              placeholder={`Enter a caption for Image ${
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
                          {uploadedFiles[type] && (
                            <div className="w-full h-[250px] relative p-2 rounded border border-gray-200">
                              <img
                                src={uploadedFiles[type].preview}
                                alt={`Uploaded ${type}`}
                                className="absolute z-0 w-full h-full object-contain"
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
                        type="file"
                        className="hidden"
                        ref={inputRefs.pdf}
                        onChange={(e) => handleFileUpload(e, "pdf")}
                      />
                      <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center gap-2">
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
                          <input
                            type="text"
                            maxLength={1500}
                            className="w-full border border-gray-300 py-2 px-3 rounded-lg"
                            placeholder="Enter a caption for PDF"
                            value={mediaCaptions.pdf || ""}
                            onChange={(e) =>
                              setMediaCaptions((prev) => ({
                                ...prev,
                                pdf: e.target.value,
                              }))
                            }
                          />
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
                  </div>
                  {/* Video Upload */}
                  <div className="w-full">
                    <h6>Video (File size 15 MB.) :</h6>
                    <div className="w-full flex gap-4">
                      <input
                        type="file"
                        className="hidden"
                        ref={inputRefs.video}
                        onChange={(e) => handleFileUpload(e, "video")}
                      />
                      <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center gap-2">
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
                          </div>
                          <input
                            type="text"
                            maxLength={1500}
                            className="w-full border border-gray-300 py-2 px-3 rounded-lg"
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
              {/* End of Uploads Section */}
            </div>
          </div>
        </div>

        {/* Send Button */}
        <div className="w-full mb-3">
          <button
            onClick={handleSend}
            className="w-full rounded-md bg-green-600 py-3 text-white font-semibold flex items-center justify-center hover:bg-green-500 transition duration-300"
          >
            Send Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default VirtualDpCampaign;
