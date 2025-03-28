import { useState, useEffect, } from "react";
import Onboard from './Onboard.tsx'

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

function Admintable() {
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "aditi",
      email: "abc@gmail.com",
      Designation: "employee",
      basesalary: 11000,
      dateofjoining: "11/02/2024",
      status: "active",
    },
    {
      id: 2,
      name: "def",
      email: "abc@gmail.com",
      Designation: "intern",
      basesalary: 45000,
      dateofjoining: "11/02/2024",
      status: "active",
    },
    {
      id: 3,
      name: "ghi",
      email: "abc@gmail.com",
      Designation: "intern",
      basesalary: 23000,
      dateofjoining: "11/02/2024",
      status: "inactive",
    },
    {
      id: 4,
      name: "jkl",
      email: "abc@gmail.com",
      Designation: "employee",
      basesalary: 35000,
      dateofjoining: "11/02/2024",
      status: "active",
    },
    {
      id: 5,
      name: "mno",
      email: "abc@gmail.com",
      Designation: "intern",
      basesalary: 17000,
      dateofjoining: "11/02/2024",
      status: "active",
    },
    {
      id: 6,
      name: "pqr",
      email: "abc@gmail.com",
      Designation: "intern",
      basesalary: 10000,
      dateofjoining: "11/02/2024",
      status: "inactive",
    },
    {
      id: 7,
      name: "stu",
      email: "abc@gmail.com",
      Designation: "intern",
      basesalary: 20000,
      dateofjoining: "11/02/2024",
      status: "active",
    },
    {
      id: 8,
      name: "vwx",
      email: "abc@gmail.com",
      Designation: "intern",
      basesalary: 25000,
      dateofjoining: "11/02/2024",
      status: "active",
    },
    {
      id: 9,
      name: "yza",
      email: "abc@gmail.com",
      Designation: "employee",
      basesalary: 10000,
      dateofjoining: "11/02/2024",
      status: "inactive",
    },
  ]);

  const [sorting, setSorting] = useState({ key: "name", ascending: true });
  
const [isPopupOpen, setIsPopupOpen] = useState(false);

  const applySorting = (key: string) => {
    if (sorting.key === key) {
      setSorting({ key, ascending: !sorting.ascending });
    } else {
      setSorting({ key, ascending: true });
    }
  };

  const getSortIcon = (key: string) => {
    if (sorting.key === key) {
      return sorting.ascending ? faSortUp : faSortDown;
    }
    return faSort;
  };

 
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    designation: "",
    basesalary: "",
    dateofjoining: "",
    status: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const sortedRecords = [...records].sort((a, b) => {
      if (a[sorting.key] < b[sorting.key]) {
        return sorting.ascending ? -1 : 1;
      }
      if (a[sorting.key] > b[sorting.key]) {
        return sorting.ascending ? 1 : -1;
      }
      return 0;
    });
    setRecords(sortedRecords);
  }, [sorting, records]);

  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mt-4 ">
      <div className="d-flex justify-content-between mb-3 ">
        <div className="d-flex align-items-center mb-3 gap-0">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control btn-outline-primary"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-primary" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <div className="p-10">
       <Button variant="primary" onClick={() => setIsPopupOpen(true)}>
         Add <FontAwesomeIcon icon={faPlus} />
       </Button>
       <Onboard isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

     </div>

      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>

            <th
              onClick={() => applySorting("name")}
              style={{ cursor: "pointer" }}
            >
              Name <FontAwesomeIcon icon={getSortIcon("name")} />
            </th>
            <th>Email</th>
            <th>Designation</th>
            <th
              onClick={() => applySorting("basesalary")}
              style={{ cursor: "pointer" }}
            >
              Base Salary <FontAwesomeIcon icon={getSortIcon("basesalary")} />
            </th>

            <th>Dateofjoining</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.Designation}</td>
              <td>{record.basesalary}</td>
              <td>{record.dateofjoining}</td>
              <td>{record.status}</td>
              <td>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => setIsPopupOpen(true)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Onboard isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
                

                <Button
                  variant="danger"
                  onClick={() => handleDelete(record.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admintable;
