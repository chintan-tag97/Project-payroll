import { useState, useEffect } from "react";
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

const ManageLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const storedAdminLeaves = JSON.parse(
      localStorage.getItem("adminLeaves") || "[]"
    );
    setLeaveRequests(storedAdminLeaves);
  }, []);

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [newLeave, setNewLeave] = useState<Partial<LeaveRequest>>({
    status: "Pending",
  });

  const handleCancel = () => {
    setNewLeave({});
    setEditIndex(null);
  };
  const handleChange = (field: string, value: string) => {
    setNewLeave({ ...newLeave, [field]: value });
  };

  const handleEdit = (index: number) => {
    setNewLeave(leaveRequests[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedRequests = leaveRequests.filter((_, i) => i !== index);
    setLeaveRequests(updatedRequests);
    localStorage.setItem("adminLeaves", JSON.stringify(updatedRequests));
  };

  const LeaveStatus = (
    leaveId: string,
    newStatus: string,
    adminId: string,
    adminName: string
  ) => {
    const updatedRequests = leaveRequests.map((leave) =>
      leave.leaveId === leaveId
        ? {
            ...leave,
            status: newStatus,
            approvedById: adminId,
            approvedByName: adminName,
          }
        : leave
    );
    setLeaveRequests(updatedRequests);
    localStorage.setItem("adminLeaves", JSON.stringify(updatedRequests));

    const userRequests = JSON.parse(localStorage.getItem("userLeaves") || "[]");
    const updatedUserRequests = userRequests.map((leave: LeaveRequest) =>
      leave.leaveId === leaveId
        ? {
            ...leave,
            status: newStatus,
            approvedById: adminId,
            approvedByName: adminName,
          }
        : leave
    );
    localStorage.setItem("userLeaves", JSON.stringify(updatedUserRequests));
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedRequests = [...leaveRequests];
      updatedRequests[editIndex] = { ...newLeave };
      setLeaveRequests(updatedRequests);
      setEditIndex(null);

      localStorage.setItem("adminLeaves", JSON.stringify(updatedRequests));

      const userRequests = JSON.parse(
        localStorage.getItem("userLeaves") || "[]"
      );
      const updatedUserRequests = userRequests.map((leave: LeaveRequest) =>
        leave.leaveId === newLeave.leaveId
          ? { ...leave, status: newLeave.status }
          : leave
      );
      localStorage.setItem("userLeaves", JSON.stringify(updatedUserRequests));
    }
  };

  return (
    <div>
      <div className="p-10">
        <h3 className="text-2xl font-bold text-gray-700 mt-6 text-center">
          Admin Leave Management
        </h3>

        {leaveRequests.length > 0 ? (
          <table className="w-full mt-4 border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
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

export default ManageLeave;
