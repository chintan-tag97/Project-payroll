import { useState } from "react";

interface PopFormProps {
  isOpen: boolean;
  onClose: () => void;
  existingData?: any;
  onSubmit: (data: any) => void;
}

const Onboard: React.FC<PopFormProps> = ({
  isOpen,
  onClose,
  existingData,
  onSubmit,
}) => {
  if (!isOpen) return null;
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(
    existingData || {
      CompanyEmail: "",
      firstName: "",
      middleName: "",
      lastName: "",
      employeeId: "",
      designation: "",
      baseSalary: "",
      dateOfJoining: "",
      status: "",
      address: "",
      gender: "",
      personalEmail: "",
      birthDate: "",
      contactNo: "",
      profilePic: null,
      aadharCard: null,
      aadharNo: "",
      panCard: null,
      pancardNo: "",
    }
  );

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(formData);
  };


  
  const [base64Data, setBase64Data] = useState({});
  const [isImageOpen, setIsImageOpen] = useState({});

  const handleImageChange = (event: { target: { name: any; files: any } }) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setBase64Data((prev) => ({
          ...prev,
          [name]: reader.result.split(",")[1],
        }));
      };
    }
  };

  const handleImageClick = (key: string) => {
    setIsImageOpen((prev) => ({ ...prev, [key]: true }));
  };

  const handleCloseImage = (key: string) => {
    setIsImageOpen((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lightviolet  ">
      <div className="w-full max-w-lg bg-white rounded-3xl ">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center md:justify-center   ">
            <div
              className="w-full max-w-lg bg-white rounded-3xl  h-[448px] sm:h-[500px] md:h-[550px] lg:h-[448px] 
            flex flex-col "
            >
              <div className="fixed  left-1/2 transform  -translate-x-1/2 -translate-y-13      w-[415px] max-w-lg bg-white z-10 rounded-3xl p-4 ">
                <h2 className="text-lg  text-blue-800 text-center mb-3 font-bold">
                  {existingData ? "Edit Details" : "Add Details"}
                </h2>
                <div className="flex justify-between ml-0">
                  {["Employment Details", "Personal Details", "Documents"].map(
                    (label, index) => (
                      <div
                        key={index}
                        className={`flex-1 text-center py-2 text-sm font-medium cursor-pointer ${
                          step === index + 1
                            ? "text-violet-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => setStep(index + 1)}
                      >
                        {label}
                      </div>
                    )
                  )}

                  <button
                    onClick={onClose}
                    className="absolute top-4 right-2 cursor-pointer  text-gray-500 bg-white rounded-md hover:bg-[#7576F2BF] text-md"
                  >
                    ✖
                  </button>
                </div>
            

              <div className="flex-1   overflow-y-auto h-100  ">
                {step === 1 && (
                  <form
                    onSubmit={handleSubmit}
                    className=" space-y-1 mb-5 mt-5"
                  >
                    <label className="block font-semibold">First Name </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      className="w-90 p-2 border rounded  mb-3 font-normal "
                    />

                    <label className="block font-semibold">Middle Name </label>
                    <input
                      type="text"
                      name="middlename"
                      value={formData.middlename}
                      onChange={handleChange}
                      placeholder="Enter Middle Name"
                      className="w-90 p-2 border rounded mb-3 font-normal "
                    />
                    <label className="block font-semibold">Last Name </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                      className="w-90 p-2 border rounded mb-3 font-normal "
                    />
                    <label className="block font-semibold">
                      Company Email{" "}
                    </label>
                    <input
                      type="text"
                      name="CompanyEmail"
                      value={formData.CompanyEmail}
                      onChange={handleChange}
                      placeholder="Enter Company Email"
                      className="w-90 p-2 border rounded mb-3 font-normal  "
                    />
                    <label className="block font-semibold">Designation </label>

                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-90 p-2 border rounded mb-3 font-normal"
                    >
                      <option value="" data-pc-section="option" disabled>
                        Select Designation
                      </option>

                      <option value="Intern">Intern</option>
                      <option value="Employee">Employee</option>
                    </select>

                    <label className="block font-semibold">Base Salary </label>
                    <input
                      type="text"
                      name="baseSalary"
                      value={formData.baseSalary}
                      onChange={handleChange}
                      placeholder="Enter Base Salary"
                      className="w-90 p-2 border rounded mb-3 font-normal text-red"
                    />
                    <label className="block font-semibold">
                      Date of Joining{" "}
                    </label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      placeholder="Enter Date of Joining"
                      className="w-90 p-2 border rounded mb-3 font-normal text-red"
                    />
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-2 mb-5 mt-5">
                    <label className="block font-semibold">Address </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                      className="w-90 p-2 border rounded  font-normal"
                    />
                    <div className="block ">
                      <label className="text-dark font-semibold">Gender</label>
                      <div className=" space-x-4 ">
                        <label className="">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Male
                        </label>
                        <label className="">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                    <label className="block font-semibold">
                      Personal Email{" "}
                    </label>
                    <input
                      type="text"
                      name="personalEmail"
                      value={formData.personalEmail}
                      onChange={handleChange}
                      placeholder="Enter Personal Email"
                      className="w-90 p-2 border rounded  font-normal"
                    />
                    <label className="block font-semibold">
                      Date of Birth{" "}
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      placeholder="Enter Date of Birth"
                      className="w-90 p-2 border rounded  font-normal"
                    />
                    <label className="block font-semibold">Contact No. </label>
                    <input
                      type="text"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="Enter Contact No."
                      className="w-90 p-2 border rounded  font-normal"
                    />
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-2 mt-5 mb-5">
                    <label className="block font-semibold">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="profilepicture"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 border rounded  font-normal"
                    />
                    {/* <button
                    className="absolute top-2 right-2 bg-black p-1  hover:bg-[#7576F2BF] cursor-poiner shadow-lg font-bold text-white"
                    onClick={() => handleCloseImage(key)}
                  >
                    ✕
                  </button> */}
                    {base64Data.profilepicture && (
                      <img
                        src={`data:image/jpeg;base64,${base64Data.profilepicture}`}
                        alt="Profile Picture Preview"
                        className="mt-2 w-[110px] h-[110px] object-cover border rounded cursor-pointer"
                        onClick={() => handleImageClick("profilepicture")}
                        
                      />
                    )}{" "}
                    <label className="block font-semibold">Aadhar Card</label>
                    <input
                      type="file"
                      name="aadharCard"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 border rounded  font-normal"
                    />
                    {base64Data.aadharCard && (
                      <img
                        src={`data:image/jpeg;base64,${base64Data.aadharCard}`}
                        alt="Aadhar Card Preview"
                        className="mt-2 w-[110px] h-[110px] object-cover border rounded cursor-pointer"
                        onClick={() => handleImageClick("aadharCard")}
                      />
                    )}
                    <label className="block font-semibold">
                      Aadhar Card No.{" "}
                    </label>
                    <input
                      type="text"
                      name="aadharNo"
                      value={formData.aadharNo}
                      onChange={handleChange}
                      placeholder="Enter enter Aadharcard No."
                      className="w-90 p-2 border rounded  font-normal"
                    />
                    <label className="block font-semibold">Pan Card</label>
                    <input
                      type="file"
                      name="panCard"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 border rounded  font-normal"
                    />
                    {base64Data.panCard && (
                      <img
                        src={`data:image/jpeg;base64,${base64Data.panCard}`}
                        alt="Pan Card Preview"
                        className="mt-2 w-[110px] h-[110px] object-cover border rounded cursor-pointer"
                        onClick={() => handleImageClick("panCard")}
                      />
                    )}
                    {Object.keys(isImageOpen).map(
                      (key) =>
                        isImageOpen[key] &&
                        base64Data[key] && (
                          <div
                            key={key}
                            className="fixed inset-0 bg-[#252121d1]  flex items-center justify-center z-50"
                          >
                            <div className="relative">
                              <button
                                className="absolute top-2 right-2 bg-black p-1  hover:bg-[#7576F2BF] cursor-poiner shadow-lg font-bold text-white"
                                onClick={() => handleCloseImage(key)}
                              >
                                ✕
                              </button>
                              <img
                                src={`data:image/jpeg;base64,${base64Data[key]}`}
                                alt="Full Image"
                                className="max-w-full h-[590px] object-contain rounded shadow-lg cursor-pointer"
                              />
                            </div>
                          </div>
                        )
                    )}
                    <label className="block font-semibold">PAN Card No. </label>
                    <input
                      type="text"
                      name="pancardNo"
                      value={formData.pancardNo}
                      onChange={handleChange}
                      placeholder="Enter Pancard No."
                      className="w-90 p-2 border rounded  font-normal"
                    />
                  </form>
                )}
              </div>
              {/* margin-top: 785px; */}

              {/* margin-bottom: 765px; */}
                <div className="flex justify-between mt-2">
                <button
                  className="bg-blue-800 hover:bg-[#30304edc] text-white px-4 py-2 rounded w-full md:w-auto  cursor-pointer disabled:opacity-50"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Previous
                </button>
                {step === 3 ? (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-800 hover:bg-[#30304edc] text-white cursor-pointer px-4 py-2 rounded w-full p-5 md:w-auto disabled:opacity-50"
                  >
                    {existingData ? "Update" : "Add"}
                  </button>
                ) : (
                  <button
                    className="bg-blue-800 hover:bg-[#30304edc] cursor-pointer text-white px-4 py-2 rounded p-5 w-full md:w-auto disabled:opacity-50"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </button>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Onboard;
