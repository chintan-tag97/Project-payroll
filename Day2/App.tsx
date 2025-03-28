import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const [formData, setFormData] = useState({
    CompanyEmail: "",
    fullName: "",
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
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: { target: { name: any; files: any; }; }) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen  p-6  bg-no-repeat bg-cover bg-[url('src/images/1sectionLight.jpg')]">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8 bg-no-repeat bg-cover bg-center bg-[url('src/images/1sectionLight.jpg')]">
          <div className="flex justify-between mb-4">
            {["Employee Details", "Personal Details", "Documents"].map(
              (label, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center py-2 text-sm font-medium cursor-pointer ${
                    step === index + 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                  onClick={() => setStep(index + 1)}
                >
                  {label}
                </div>
              )
            )}
          </div>

          <div className="border-t border-gray-300 mb-4"></div>

          <div className="p-4">
            {step === 1 && (
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block font-semibold">
                    CompanyEmail
                    <input
                      type="text"
                      name="CompanyEmail"
                      value={formData.CompanyEmail}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal "
                    />
                  </label>

                  <label className="block font-semibold">
                    Full Name
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal "
                    />
                  </label>

                  <label className="block font-semibold">
                    Designation
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
                    >
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
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                  </label>
                  <label className="block font-semibold">
                    Date of Joining
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                  </label>

                  <label className="block font-semibold">
                    Status
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>
                </form>
              </div>
            )}
            {step === 2 && (
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block font-semibold">
                    Address
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
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
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                  </label>
                  <label className="block font-semibold">
                    Birth Date
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                  </label>
                  <label className="block font-semibold">
                    Contact No
                    <input
                      type="text"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                  </label>
                </form>
              </div>
            )}
            {step === 3 && (
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block font-semibold">
                    Profile Picture
                    <input
                      type="file"
                      name="profilePic"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                    {formData.profilePic && (
                      <a
                        href={URL.createObjectURL(formData.profilePic)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={URL.createObjectURL(formData.profilePic)}
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
                      className="w-full p-2 border rounded mt-1 font-normal"
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
                    Aadhar Card Number
                    <input
                      type="text"
                      name="aadharNo"
                      value={formData.aadharNo}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                  </label>
                  <label className="block font-semibold">
                    PAN Card
                    <input
                      type="file"
                      name="panCard"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-2 border rounded mt-1 font-normal"
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
                    PAN Card Number
                    <input
                      type="text"
                      name="pancardNo"
                      value={formData.pancardNo}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-1 font-normal"
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              onClick={nextStep}
              disabled={step === 3}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
