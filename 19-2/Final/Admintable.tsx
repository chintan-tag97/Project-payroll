import { useState } from "react";
import Onboard from "./Onboard.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faSearch,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

interface Employee {
  name: string;
  age: number;
  email: string;
}

const Admintable = () => {
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [record, setRecord] = useState([
    {
      id: 1,
      firstname: "aditi",
      companyemail: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 2,
      firstname: "riya",
      companyemail: "riya@gmail.com",
      designation: "intern",
      basesalary: 11100,
      dateofjoining: "11/02/2024",
      status: "active",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 3,
      firstname: "mohan",
      companyemail: "abc@gmail.com",
      designation: "employee",
      basesalary: 10200,
      dateofjoining: "11/02/2024",
      status: "inactive",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 4,
      firstname: "aditi",
      companyemail: "aditi@gmail.com",
      designation: "employee",
      basesalary: 22300,
      dateofjoining: "11/02/2024",
      status: " inactive",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 5,
      firstname: "aditi",
      companyemail: "abc@gmail.com",
      designation: "employee",
      basesalary: 45000,
      dateofjoining: "11/02/2024",
      status: "inactive",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 6,
      firstname: "aditi",
      companyemail: "abc@gmail.com",
      designation: "intern",
      basesalary: 30000,
      dateofjoining: "11/02/2024",
      status: "active",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 7,
      firstname: "aditi",
      companyemail: "abc@gmail.com",
      designation: "intern",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 8,
      firstname: "aditi",
      companyemail: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "inactive",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
    {
      id: 9,
      firstname: "aditi",
      companyemail: "abc@gmail.com",
      designation: "intern",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      middleName: "maheshbhai",
      lastName: "tandel",
      address: "pardi",
      gender: "female",
      personalEmail: "chintan@gmail.com",
      birthDate: " 11/03/2000",
      contactNo: 1234567890,
      profilePic: "",
      aadharCard: "",
      aadharNo: 1234567890,
      panCard: "",
      pancardNo: 1234567890,
    },
  ]);


  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setRecord((prevRecord) => prevRecord.filter((rec) => rec.id !== id));
    }
  };

  const handleCheckboxChange = (id: number) => {
    setRecord((prevRecord) =>
      prevRecord.map((rec) =>
        rec.id === id
          ? { ...rec, status: rec.status === "Active" ? "Inactive" : "Active" }
          : rec
      )
    );
  };
  function handleFormSubmit(formData: Employee) {
    let updatedRecord;
    if (selectedRecord) {
      updatedRecord = record.map((rec) =>
        rec.id === selectedRecord.id ? { ...rec, ...formData } : rec
      );
      console.log("Updated Record:", formData);
    } else {
      const newRecord = { id: record.length + 1, ...formData };
      updatedRecord = [...record, newRecord];
      console.log("Added Record:", newRecord);
    }

    setRecord(updatedRecord);
    setSelectedRecord(null);
    setOpenPopup(null);
  }
  const filteredRecord = record.filter((rec) =>
    Object.values(rec).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedRecords = [...filteredRecord].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

 


  return (
    <div className=" md:w-full p-10">
      <div className="flex  justify-between md:justify-between gap-5 mb-4">
        <div className="flex w-full md:w-auto">
          <input
            type="text"
            className="p-2 border-2 border-violet-500 rounded-l-md w-full"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#7576F2BF] hover:bg-blue-800 text-white px-4 rounded-r-md">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="">
        <button
          className="bg-[#7576F2BF] hover:bg-blue-800 text-white px-4 py-2 rounded w-full md:w-auto cursor-pointer"
          onClick={() => setOpenPopup("add")}
        >
          Add <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      </div>

      <div className=" bg-white shadow-xl rounded-lg">
      <table className="w-full table-auto border-collapse rounded-lg">
        <thead>
          <tr className="bg-[#7576F2BF] text-white text-left cursor-pointer">
            {["id", "firstname", "companyemail", "designation", "basesalary", "dateofjoining"].map((key, index) => (
              <th key={key} className="p-3 text-center" onClick={() => handleSort(key)}>
                {[
                  "Id",
                  "Name",
                  "Company Email",
                  "Designation",
                  "Base Salary",
                  "Date of Joining",
                ][index]} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedRecords.length > 0 ? (
            sortedRecords.map((rec) => (
              <tr key={rec.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 text-center">
                <td className="p-3">{rec.id}</td>
                <td className="p-3">{rec.firstname}</td>
                <td className="p-3">{rec.companyemail}</td>
                <td className="p-3">{rec.designation}</td>
                <td className="p-3">{rec.basesalary}</td>
                <td className="p-3">{rec.dateofjoining}</td>
                <td className="p-3">
                  <label className="flex cursor-pointer items-center justify-center">
                    <input
                      type="checkbox"
                      checked={rec.status === "Inactive"}
                      onChange={() => handleCheckboxChange(rec.id)}
                      className="sr-only"
                    />
                    <div
                      className={`relative flex items-center w-14 h-8 rounded-full transition ${
                        rec.status === "Active" ? "bg-[#7576F2BF]" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`absolute left-1 top-1 h-6 w-6 bg-white rounded-full transition-transform ${
                          rec.status === "Active" ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
                <td className="p-3 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedRecord(rec);
                      setOpenPopup("edit");
                    }}
                    className="bg-[#7576F2BF] hover:bg-blue-800 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="bg-red-500 hover:bg-red-800 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {openPopup && (
        <Onboard
          isOpen={true}
          onClose={() => {
            setOpenPopup(null);
            setSelectedRecord(null);
          }}
          existingData={selectedRecord}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Admintable;
