import React, { useEffect, useRef, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import CreditHeader from '../../components/CreditHeader';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TemplateCampaign = () => {
  const [templateName, setTemplateName] = useState("");
  const [templateMsg, setTemplateMsg] = useState("");
  const [feedback, setFeedback] = useState("");
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [recordsPerPage] = useState(5); // Set records per page to 5
  const [editingId, setEditingId] = useState(null); // Track which template is being edited

  const textareaRef = useRef(null);

  // Adjust the height of the textarea dynamically
  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Fetch templates from the database
  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/msgtemplate/`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data); // Populate the table with fetched data
      } else {
        setFeedback("Failed to fetch templates.");
      }
    } catch (error) {
      setFeedback(`Error: ${error.message}`);
    }
  };

  // Add or update template to the database
  const saveTemplate = async () => {
    if (!templateName || !templateMsg) {
      setFeedback("Both fields are required.");
      toast.error("Both fields are required.");
      return;
    }

    const payload = {
      userId: 1, // Adjust as needed
      template_name: templateName,
      template_msg: templateMsg,
    };

    try {
      let response;
      if (editingId) {
        // Update existing template
        response = await fetch(`${process.env.REACT_APP_API_URL}/msgtemplate/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new template
        response = await fetch(`${process.env.REACT_APP_API_URL}/msgtemplate/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setFeedback(editingId ? "Template updated successfully!" : "Template added successfully!");
        toast.success(editingId ? "Template updated successfully!" : "Template added successfully!");
        setTemplateName("");
        setTemplateMsg("");
        setEditingId(null); // Reset editing state
        fetchTemplates(); // Refresh the table after submission
      } else {
        const errorData = await response.json();
        setFeedback(`Error: ${errorData.message || "Something went wrong."}`);
        toast.error(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      setFeedback(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`);
    }
  };

  // Edit Template (fetch and populate the form)
  const editTemplate = (id) => {
    const templateToEdit = templates.find((template) => template.templateId === id);
    setTemplateName(templateToEdit.template_name);
    setTemplateMsg(templateToEdit.template_msg);
    setEditingId(id); // Set editing state
  };

  const deleteTemplate = async (id) => {    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/msgtemplate/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFeedback("Template deleted successfully!");
        toast.success("Template deleted successfully!");
        fetchTemplates(); // Refresh the templates list after deletion
      } else {
        const errorData = await response.json();
        setFeedback(`Error: ${errorData.message || "Something went wrong."}`);
        toast.error(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      setFeedback(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`);
    }
  };

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = templates.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(templates.length / recordsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <>
      <section className="w-[100%] bg-gray-200 mt-[75px]  flex justify-center flex-col">
        <CreditHeader />
        <div className="w-full px-4 mt-8">
          <div className="w-full py-2 mb-3 bg-white">
            <h1 className="text-2xl text-black font-semibold pl-4" style={{ fontSize: "32px" }}>Template</h1>
          </div>
          <div className="w-[100%] p-3 bg-white rounded flex gap-4">
            <div className="w-[40%] flex flex-col gap-4">
              {/* Template Name Input */}
              <div className="w-full flex items-center gap-4">
                <div className="w-full px-3 py-2 rounded text-white font-[500] bg-brand_color_4 flex justify-center items-center">
                  <p className="mb-0">Template Name</p>
                </div>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="form-control border-black p-2 text-black"
                  placeholder="Enter Template Name"
                />
              </div>
              {/* Template Message Input */}
              <div className="w-[100%] h-[auto]">
                <p className="text-black pb-1">Template message</p>
                <textarea
                  ref={textareaRef}
                  value={templateMsg}
                  onChange={(e) => {
                    setTemplateMsg(e.target.value);
                    handleInput();
                  }}
                  className="p-2 rounded w-[100%] min-h-[180px] bg-white text-black border-black border-[0.1px]"
                  placeholder="Enter your message"
                />
              </div>
              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary w-25" onClick={saveTemplate}>
                  {editingId ? "Update" : "Submit"}
                </button>
              </div>
              {/* Feedback */}
              {feedback && <p className="text-red-500 mt-2">{feedback}</p>}
            </div>
            {/* Table Section */}
            <div className="w-[60%] flex flex-col gap-4">
              <div className="w-full max-h-[400px] rounded text-white overflow-auto">
                <table className="w-full text-center table-auto">
                  <thead className="bg-gray-800 border-b-2 border-gray-600">
                    <tr>
                      <th className="py-3 px-6 text-white font-semibold">Id</th>
                      <th className="py-3 px-6 text-white font-semibold">Template Name</th>
                      <th className="py-3 px-6 text-white font-semibold">Template Message</th>
                      <th className="py-3 px-6 text-white font-semibold">Date</th>
                      <th className="py-3 px-6 text-white font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-black">
                    {currentRecords.map((template) => (
                      <tr key={template.id} className="border-b border-gray-600 transition">
                        <td className="py-2 px-2">{template.templateId}</td>
                        <td className="py-2 px-2">{template.template_name}</td>
                        <td className="py-2 px-2">{template.template_msg}</td>
                        <td className="py-2 px-2">
                          {moment(template.createAt).format('DD-MMM-YYYY')}
                        </td>
                        <td className="py-2 px-2">
                          <button onClick={() => editTemplate(template.templateId)} className='me-2'>Edit</button>
                          <button  onClick={() => deleteTemplate(template.templateId)}>Delete</button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex justify-end align-items-center gap-4 mt-1">
                <button 
                  className="px-4 py-2 border rounded" 
                  onClick={() => changePage(currentPage - 1)} 
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span>{`${(currentPage - 1) * recordsPerPage + 1} - ${Math.min(currentPage * recordsPerPage, templates.length)}`} of {templates.length}</span>
                <button 
                  className="px-4 py-2 border rounded" 
                  onClick={() => changePage(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default TemplateCampaign;
