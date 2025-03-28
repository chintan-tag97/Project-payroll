import { useState } from "react";
import Onboard from "./Onboard.tsx";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

interface Employee {
  id: number;
  name: string;
  email: string;
  designation: string;
  basesalary: number;
  dateofjoining: string;
  status: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  gender: string;
  personalEmail: string;
  birthDate: string;
  contactNo: string;
  profilePic: null;
  aadharCard: null;
  aadharNo: number;
  panCard: null;
  pancardNo: number;
}

function Admintable() {
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Employee | null>(null);
  const [record, setRecord] = useState([
    {
      id: 1,
      firstname: "aditi",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      firstname: "deep",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      firstname: "mahi",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      firstname: "rohan",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      firstname: "richa",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      firstname: "ziya",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      firstname: "pakhi",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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
      firstname: "aditya",
      email: "abc@gmail.com",
      designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
      firstName: "chintan",
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

  const [sorting, setSorting] = useState<{
    key: keyof Employee;
    ascending: boolean;
  }>({
    key: "firstName",
    ascending: true,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const applySorting = (key: keyof Employee) => {
    setSorting((prev) => ({
      key,
      ascending: prev.key === key ? !prev.ascending : true,
    }));

    setRecord((prevRecord) =>
      [...prevRecord].sort((a, b) => {
        if (a[key] < b[key]) return sorting.ascending ? -1 : 1;
        if (a[key] > b[key]) return sorting.ascending ? 1 : -1;
        return 0;
      })
    );
  };

  const getSortIcon = (key: keyof Employee) => {
    if (sorting.key === key) {
      return sorting.ascending ? faSortUp : faSortDown;
    }
    return faSort;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setRecord(record.filter((record) => record.id !== id));
      console.log("Deleted Record ID:", id);
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setOpenPopup("add");
  };

  const handleEdit = (record: Employee) => {
    setSelectedRecord(record);
    // console.log('ee->', record);
    setOpenPopup("edit");
  };

  const handleFormSubmit = (formData: Employee) => {
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
  };

  const filteredRecord = record.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="w-full md:w-1/2 flex">
          <input
            type="text"
            className=" p-2 border rounded-l-md"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="bg-blue-600 text-white px-4 rounded-r-md">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <Button className="bg-blue-800 mt-2 md:mt-0" onClick={handleAdd}>
          Add <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-800 text-white text-left">
              {(
                [
                  "id",
                  "firstname",
                  "email",
                  "designation",
                  "basesalary",
                  "dateofjoining",
                  "status",
                ] as (keyof Employee)[]
              ).map((col, index) => (
                <th
                  key={index}
                  onClick={() => applySorting(col)}
                  className="p-3 border border-gray-300 cursor-pointer hover:bg-blue-600 transition text-center"
                >
                  {col.toUpperCase()}{" "}
                  <FontAwesomeIcon icon={getSortIcon(col)} />
                </th>
              ))}
              <th className="p-3 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecord.map((record) => (
              <tr
                key={record.id}
                className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 text-center"
              >
                <td className="p-3 border border-gray-300">{record.id}</td>
                <td className="p-3 border border-gray-300">
                  {record.firstname}
                </td>
                <td className="p-3 border border-gray-300">{record.email}</td>
                <td className="p-3 border border-gray-300">
                  {record.designation}
                </td>
                <td className="p-3 border border-gray-300">
                  {record.basesalary}
                </td>
                <td className="p-3 border border-gray-300">
                  {record.dateofjoining}
                </td>
                <td className="p-3 border border-gray-300">{record.status}</td>
                <td className="p-3 border border-gray-300 flex flex-wrap gap-2 justify-center">
                  <Button
                    onClick={() => handleEdit(record)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(record.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openPopup && (
        <Onboard
          isOpen={true}
          onClose={() => setOpenPopup(null)}
          existingData={selectedRecord}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

export default Admintable;
