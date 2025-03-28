import { useState, useEffect, SetStateAction } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom"; 



function Admintable() {
//    const navigate = useNavigate(); 

  const [records, setRecords] = useState([
    { id: 1,name:"abc", email: "abc@gmail.com", Designation:"employee", basesalary: 11000, dateofjoining: "11/02/2024",status:"active" },
    { id: 2,name:"def", email: "abc@gmail.com", Designation:"intern", basesalary: 45000, dateofjoining: "11/02/2024",status:"active" },
    { id: 3,name:"ghi", email: "abc@gmail.com", Designation:"intern", basesalary: 23000, dateofjoining: "11/02/2024",status:"inactive" },
    { id: 4,name:"jkl", email: "abc@gmail.com", Designation:"employee", basesalary: 35000, dateofjoining: "11/02/2024",status:"active" },
    { id: 5,name:"mno", email: "abc@gmail.com", Designation:"intern", basesalary: 17000, dateofjoining: "11/02/2024",status:"active" },
    { id: 6,name:"pqr", email: "abc@gmail.com", Designation:"intern", basesalary: 10000, dateofjoining: "11/02/2024",status:"inactive" },
    { id: 7,name:"stu", email: "abc@gmail.com", Designation:"intern", basesalary: 20000, dateofjoining: "11/02/2024",status:"active" },
    { id: 8,name:"vwx", email: "abc@gmail.com", Designation:"intern", basesalary: 25000, dateofjoining: "11/02/2024",status:"active" },
    { id: 9,name:"yza", email: "abc@gmail.com", Designation:"employee", basesalary: 10000, dateofjoining: "11/02/2024",status:"inactive" },
  ]);



  const [sorting, setSorting] = useState({ key: "name", ascending: true });

  const applySorting = (key: string) => {
    if (sorting.key === key) {
      setSorting({ key, ascending: !sorting.ascending });
    } else {
      setSorting({ key, ascending: true });
    }
  };
  
  // Sorting Indicator Function
  const getSortIcon = (key: string) => {
    if (sorting.key === key) {
      return sorting.ascending ? faSortUp : faSortDown;
    }
    return faSort;
  };
  
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    designation: "",
    basesalary: "",
    dateofjoining: "",
    status: "",
  });
  const [formErrors, setFormErrors] = useState({
    id: "",
    name: "",
    email: "",
    designation: "",
    basesalary: "",
    dateofjoining: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");



  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setFormData({ id: "",
        name: "",
        email: "",
        designation: "",
        basesalary: "",
        dateofjoining: "",
        status: "", });
    setFormErrors({ id: "",
        name: "",
        email: "",
        designation: "",
        basesalary: "",
        dateofjoining: "",
        status: "", });
  };


  const handleEdit = (record: SetStateAction<{ id: string; name: string; email: string; designation: string; basesalary: string; dateofjoining: string; status: string; }>) => {
    setEditMode(true);
    setFormData(record);
    setShow(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };




  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });



    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
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




  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.name.trim()) errors.name = "Name is required.";

    if (!formData.basesalary || isNaN(formData.basesalary) || formData.basesalary <= 0)
      errors.basesalary = "Valid salary is required.";
   
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editMode) {
        setRecords(records.map((record) => record.id === formData.id ? formData : record)
        );
      } else {
        setRecords([...records, { ...formData, id: records.length + 2 }]);
      }
      handleClose();
    }
  };

  
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

        <Button variant="primary" >
       Add <FontAwesomeIcon icon={faPlus} />
     </Button>
        {/* <Button variant="primary" onClick={() => navigate("/")}>
       Add <FontAwesomeIcon icon={faPlus} />
     </Button> */}
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            
            <th onClick={() => applySorting("name")} style={{ cursor: "pointer" }}>
            Name <FontAwesomeIcon icon={getSortIcon("name")} />
          </th>
          <th>Email</th>
          <th>Designation</th>
          <th onClick={() => applySorting("basesalary")} style={{ cursor: "pointer" }}>
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
                  onClick={() => handleEdit(record)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Record" : "Add Record"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isValid={formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isValid={formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                isValid={formErrors.designation}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.designation}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>BaseSalary</Form.Label>
              <Form.Control
                type="text"
                name="basesalary"
                value={formData.basesalary}
                onChange={handleChange}
                isValid={formErrors.basesalary}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.basesalary}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Dateofjoining</Form.Label>
              <Form.Control
                type="text"
                name="dateofjoining"
                value={formData.dateofjoining}
                onChange={handleChange}
                isValid={formErrors.dateofjoining}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.dateofjoining}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                isValid={formErrors.status}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.status}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="primary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editMode ? "Update" : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
   
          </div>

  )
}

export default Admintable