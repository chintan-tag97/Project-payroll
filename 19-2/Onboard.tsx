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
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: { target: { name: any; files: any } }) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lightviolet  ">
      <div className="w-full max-w-lg bg-white rounded-3xl ">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center min-h-80 ">
            <div
              className="w-full max-w-lg bg-white rounded-3xl p-8  h-[565px] sm:h-[500px] md:h-[550px] lg:h-[590px] 
            flex flex-col "
            >
              <div className="fixed top-0 left-1/2 transform mt-5 -translate-x-1/2 w-full max-w-lg bg-white z-10 rounded-t-3xl p-4 ">
                <h2 className="text-lg  text-blue-800 text-center mb-3 font-bold">
                  {existingData ? "Edit Details" : "Add Details"}
                </h2>
                <div className="flex justify-between">
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
                    className="absolute top-4 right-2 text-gray-500 hover:text-red-500 text-xl"
                  >
                    ✖
                  </button>
                </div>
              </div>

              <div className="flex-1   overflow-y-auto mt-15 mb-7 p-4">
                {step === 1 && (
                  <form onSubmit={handleSubmit} className="">
                    <label className="block font-semibold">
                      First Name
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        className="w-90 p-2 border rounded mt-1 font-normal "
                      />
                    </label>
                    <label className="block font-semibold">
                      Middle Name
                      <input
                        type="text"
                        name="middlename"
                        value={formData.middlename}
                        onChange={handleChange}
                        placeholder="Enter Middle Name"

                        className="w-90 p-2 border rounded mt-1 font-normal "
                      />
                    </label>
                    <label className="block font-semibold">
                      Last Name
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Enter Last Name"

                        className="w-90 p-2 border rounded mt-1 font-normal "
                      />
                    </label>
                    <label className="block font-semibold">
                      Company Email
                      <input
                        type="text"
                        name="CompanyEmail"
                        value={formData.CompanyEmail}
                        onChange={handleChange}
                        placeholder="Enter Company Email"

                        className="w-90 p-2 border rounded mt-1 font-normal  "
                      />
                    </label>
                    <label className="block font-semibold">
                      Designation
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-90 p-2 border rounded mt-1 font-normal"
                      >
                        <option value="" data-pc-section="option" disabled>
                          Select Option
                        </option>

                        <option value="Intern">Intern</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </label>

                    <label className="block font-semibold">
                      Base Salary
                      <input
                        type="text"
                        name="baseSalary"
                        value={formData.baseSalary}
                        onChange={handleChange}
                        placeholder="Enter Base Salary"

                        className="w-90 p-2 border rounded mt-1 font-normal text-red"
                      />
                    </label>
                    <label className="block font-semibold">
                      Date of Joining
                      <input
                        type="date"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        placeholder="Enter Date of Joining"

                        className="w-90 p-2 border rounded mt-1 font-normal text-red"
                      />
                    </label>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                    <label className="block font-semibold">
                      Address
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Address"

                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                    </label>
                    <div className="block ">
                      <label className="text-dark font-semibold">Gender</label>
                      <div className="flex space-x-4 mt-1">
                        <label className="flex items-center">
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
                        <label className="flex items-center">
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
                      Personal Email
                      <input
                        type="text"
                        name="personalEmail"
                        value={formData.personalEmail}
                        onChange={handleChange}
                        placeholder="Enter Personal Email"

                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                    </label>
                    <label className="block font-semibold">
                      Date of Birth
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        placeholder="Enter Date of Birth"

                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                    </label>
                    <label className="block font-semibold">
                      Contact No.
                      <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        placeholder="Enter Contact No."

                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                    </label>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block font-semibold">
                      Profile Picture
                      <input
                        type="file"
                        name="profilePic"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                      {(formData.profilePic || existingData?.profilePic) && (
                        <a
                          href={
                            existingData?.profilePic && !formData.profilePic
                              ? existingData.profilePic 
                              : URL.createObjectURL(formData.profilePic) 
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={
                              existingData?.profilePic && !formData.profilePic
                                ? existingData.profilePic
                                : URL.createObjectURL(formData.profilePic) 
                            }
                            alt="Profile Preview"
                            className="mt-2 w-24 h-24 object-cover rounded cursor-pointer"
                          />
                        </a>
                      )}
                    </label>

                    <label className="block font-semibold">
                      Aadhar Card
                      <input
                        type="file"
                        name="aadharCard"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                      {formData.aadharCard && (
                        <a
                          href={URL.createObjectURL(formData.aadharCard)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={URL.createObjectURL(formData.aadharCard)}
                            alt="Aadhar Preview"
                            className="mt-2 w-24 h-24 object-cover rounded cursor-pointer"
                          />
                        </a>
                      )}
                    </label>
                    <label className="block font-semibold">
                      Aadhar Card No.
                      <input
                        type="text"
                        name="aadharNo"
                        value={formData.aadharNo}
                        onChange={handleChange}
                        placeholder="Enter enter Aadharcard No."

                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                    </label>
                    <label className="block font-semibold">
                      PAN Card
                      <input
                        type="file"
                        name="panCard"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                      {formData.panCard && (
                        <a
                          href={URL.createObjectURL(formData.panCard)}
                          target="_blank"
                        >
                          <img
                            src={URL.createObjectURL(formData.panCard)}
                            alt="PAN Preview"
                            className="mt-2 w-24 h-24 object-cover rounded cursor-pointer"
                          />
                        </a>
                      )}
                    </label>
                    <label className="block font-semibold">
                      PAN Card No.
                      <input
                        type="text"
                        name="pancardNo"
                        value={formData.pancardNo}
                        onChange={handleChange}
                        placeholder="Enter Pancard No."

                        className="w-90 p-2 border rounded mt-1 font-normal"
                      />
                    </label>
                  </form>
                )}
              </div>
              {/* margin-top: 785px; */}

              {/* margin-bottom: 765px; */}

              <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-white  mb-5 z-10 rounded-b-3xl p-4 flex justify-between">
                <button
                  className="bg-[#7576F2BF] hover:bg-blue-800 text-white px-4 py-2 rounded w-full md:w-auto  disabled:opacity-50"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Previous
                </button>
                {step === 3 ? (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-[#7576F2BF] hover:bg-blue-800 text-white px-4 py-2 rounded w-full md:w-auto disabled:opacity-50"
                  >
                    {existingData ? "Update" : "Add"}
                  </button>
                ) : (
                  <button
                    className="bg-[#7576F2BF] hover:bg-blue-800 text-white px-4 py-2 rounded w-full md:w-auto disabled:opacity-50"
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
  );
};

export default Onboard;
