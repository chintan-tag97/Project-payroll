import { useState } from "react";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LeaveRequest {
  leaveId: string;
  employeeId: string;
  from: string;
  to: string;
  absenceHours: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedById?: string;
  approvedByName?: string;
}

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [] = useState<[]>([]);

  const [newLeave, setNewLeave] = useState<Partial<LeaveRequest>>({
    status: "Pending",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleInputChange = (
    field: keyof LeaveRequest,
    value: string | number
  ) => {
    setNewLeave((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setNewLeave({});
    setEditIndex(null);
  };

  const handleApplyLeave = () => {
    if (
      !newLeave.employeeId ||
      !newLeave.from ||
      !newLeave.to ||
      !newLeave.reason ||
      newLeave.absenceHours === undefined
    ) {
      alert("All fields are required");
      return;
    }

    if (editIndex !== null) {
      const updatedRequests = [...leaveRequests];
      updatedRequests[editIndex] = {
        ...newLeave,
        leaveId: updatedRequests[editIndex].leaveId,
      } as LeaveRequest;
      setLeaveRequests(updatedRequests);
      setEditIndex(null);
    } else {
      const maxId =
        leaveRequests.length > 0
          ? Math.max(...leaveRequests.map((req) => Number(req.leaveId)))
          : 0;

      setLeaveRequests([
        ...leaveRequests,
        { ...newLeave, leaveId: (maxId + 1).toString() } as LeaveRequest,
      ]);
    }

    setNewLeave({ status: "Pending" });
  };

  const handleEdit = (index: number) => {
    setNewLeave(leaveRequests[index]);
    setEditIndex(index);
  };

  const handleChange = (field: string, value: string) => {
    setNewLeave({ ...newLeave, [field]: value });
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedRequests = [...leaveRequests];
      updatedRequests[editIndex] = { ...newLeave };
      setLeaveRequests(updatedRequests);
      setEditIndex(null);
    }
  };
  const handleDelete = (index: number) => {
    const updatedRequests = leaveRequests.filter((_, i) => i !== index);
    setLeaveRequests(updatedRequests);
  };

  const LeaveStatus = (
    leaveId: string,
    newStatus: string,
    adminId: string,
    adminName: string
  ) => {
    const updatedRequests = leaveRequests.map((leave) =>
      leave.leaveId === leaveId
        ? { ...leave, status: newStatus, adminId, adminName }
        : leave
    );
    setLeaveRequests(updatedRequests);
  };

  return (
    <div>
      <div className="p-8 w-md mx-auto bg-gray-100 min-h-screen rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Apply for Leave
        </h2>
        <div className="grid grid-cols-1 ">
          <label className="font-bold mb-1">Employee ID</label>
          <input
            className="p-3 border rounded-lg"
            placeholder="Employee ID"
            value={newLeave.employeeId}
            onChange={(e) => handleInputChange("employeeId", e.target.value)}
          />

          <label className="font-bold mb-1 mt-3">From</label>
          <input
            className="p-3 border rounded-lg"
            type="date"
            value={newLeave.from}
            onChange={(e) => handleInputChange("from", e.target.value)}
          />

          <label className="font-bold mb-1 mt-3">To</label>
          <input
            className="p-3 border rounded-lg"
            type="date"
            value={newLeave.to}
            onChange={(e) => handleInputChange("to", e.target.value)}
          />

          <label className="font-bold mb-1 mt-3">Hours</label>
          <input
            className="p-3 border rounded-lg"
            type="text"
            placeholder="Absence Hours"
            value={newLeave.absenceHours}
            onChange={(e) =>
              handleInputChange("absenceHours", parseFloat(e.target.value))
            }
          />

          <label className="font-bold mt-3">Reason</label>
          <textarea
            className="p-3 border rounded-lg mb-5"
            placeholder="Reason"
            value={newLeave.reason}
            onChange={(e) => handleInputChange("reason", e.target.value)}
          ></textarea>
          <div className="flex justify-between ">
            <button
              className={`p-3 rounded-lg text-white transition ${
                editIndex !== null
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleApplyLeave}
            >
              {editIndex !== null ? "Update Leave" : "Apply"}
            </button>
            <button
              className="p-3 rounded-lg bg-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="p-10">
        <h3 className="text-2xl font-bold text-gray-700 mt-6 text-center">
          User Leave Requests
        </h3>
        {leaveRequests.length > 0 ? (
          <table className="w-full mt-4 border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Leave ID</th>
                <th className="p-3 border">Employee ID</th>
                <th className="p-3 border">From</th>
                <th className="p-3 border">To</th>
                <th className="p-3 border">Absence Hours</th>
                <th className="p-3 border">Reason</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
                <th className="p-3 border">Approved by ID</th>
                <th className="p-3 border">Approved by Name</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave, index) => (
                <tr key={leave.leaveId} className="border-t">
                  <td className="p-3 border">{leave.leaveId}</td>
                  <td className="p-3 border">{leave.employeeId}</td>
                  <td className="p-3 border">{leave.from}</td>
                  <td className="p-3 border">{leave.to}</td>
                  <td className="p-3 border">{leave.absenceHours}</td>
                  <td className="p-3 border">{leave.reason}</td>
                  <td
                    className={`p-3 border border-black  font-bold ${
                      leave.status === "Pending" ? "text-yellow-500" : ""
                    }${leave.status === "Approved" ? "text-green-500" : ""}${
                      leave.status === "Rejected" ? "text-red-500" : ""
                    }`}
                  >
                    {leave.status}
                  </td>

                  <td className="p-5 border  flex gap-2">
                    <button
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                      onClick={() => handleEdit(index)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                  <td className="p-3 border">{leave.approvedById}</td>
                  <td className="p-3 border">{leave.approvedByName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No leave requests found.
          </p>
        )}
      </div>

      <div className="p-10">
        <h3 className="text-2xl font-bold text-gray-700 mt-6 text-center">
          Admin Leave Management
        </h3>

        {leaveRequests.length > 0 ? (
          <table className="w-full mt-4 border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Leave ID</th>
                <th className="p-3 border">Employee ID</th>
                <th className="p-3 border">From</th>
                <th className="p-3 border">To</th>
                <th className="p-3 border">Absence Hours</th>
                <th className="p-3 border">Reason</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave, index) => (
                <tr key={leave.leaveId} className="border-t">
                  <td className="p-3 border">{leave.leaveId}</td>
                  <td className="p-3 border">{leave.employeeId}</td>
                  <td className="p-3 border">{leave.from}</td>
                  <td className="p-3 border">{leave.to}</td>
                  <td className="p-3 border">{leave.absenceHours}</td>
                  <td className="p-3 border">{leave.reason}</td>
                  <td
                    className={`p-3 border border-black font-bold ${
                      leave.status === "Pending" ? "text-yellow-500" : ""
                    }${leave.status === "Approved" ? "text-green-500" : ""}${
                      leave.status === "Rejected" ? "text-red-500" : ""
                    }`}
                  >
                    {editIndex === index ? (
                      <select
                        className="p-2 border rounded"
                        value={newLeave.status || leave.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      leave.status
                    )}
                    {leave.status === "Pending" && editIndex !== index && (
                      <div className="mt-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                          onClick={() =>
                            LeaveStatus(
                              leave.leaveId,
                              "Approved",
                              "Admin01",
                              "Admin Name"
                            )
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                          onClick={() =>
                            LeaveStatus(
                              leave.leaveId,
                              "Rejected",
                              "Admin01",
                              "Admin Name"
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-5 border flex gap-4">
                    {editIndex === index ? (
                      <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-green-600"
                        onClick={() => handleEdit(index)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="p-3 rounded-lg bg-gray-300"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No leave requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Leave;
