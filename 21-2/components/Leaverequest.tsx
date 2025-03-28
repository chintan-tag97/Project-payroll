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

export const Leaverequest = () => {
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
  const handleChange = (field: keyof LeaveRequest, value: string) => {
    setNewLeave({ ...newLeave, [field]: value });
  };

  const handleEdit = (index: number) => {
    setNewLeave(leaveRequests[index]);
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedRequests = [...leaveRequests];
      updatedRequests[editIndex] = { ...newLeave } as LeaveRequest;
      setLeaveRequests(updatedRequests);

      localStorage.setItem("userLeaves", JSON.stringify(updatedRequests));

      localStorage.setItem("adminLeaves", JSON.stringify(updatedRequests));

      setEditIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    const updatedRequests = leaveRequests.filter((_, i) => i !== index);
    setLeaveRequests(updatedRequests);

    localStorage.setItem("userLeaves", JSON.stringify(updatedRequests));
  };

  return (
    <div>
      <div className="p-10">
        <h3 className="text-2xl font-bold text-gray-700 mt-6 text-center">
          User Leave Requests
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
                <th className="p-3 border">Approved by ID</th>
                <th className="p-3 border">Approved by Name</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave, index) => (
                <tr key={leave.leaveId} className="border-t">
                  <td className="p-3 border">{leave.employeeId}</td>
                  <td className="p-3 border">
                    {editIndex === index ? (
                      <input
                        type="date"
                        value={newLeave.from || leave.from}
                        onChange={(e) => handleChange("from", e.target.value)}
                        className="border p-1 rounded"
                      />
                    ) : (
                      leave.from
                    )}
                  </td>
                  <td className="p-3 border">
                    {editIndex === index ? (
                      <input
                        type="date"
                        value={newLeave.to || leave.to}
                        onChange={(e) => handleChange("to", e.target.value)}
                        className="border p-1 rounded"
                      />
                    ) : (
                      leave.to
                    )}
                  </td>
                  <td className="p-3 border">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={newLeave.absenceHours || leave.absenceHours}
                        onChange={(e) =>
                          handleChange("absenceHours", e.target.value)
                        }
                        className="border p-1 rounded"
                      />
                    ) : (
                      leave.absenceHours
                    )}
                  </td>
                  <td className="p-3 border">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={newLeave.reason || leave.reason}
                        onChange={(e) => handleChange("reason", e.target.value)}
                        className="border p-1 rounded"
                      />
                    ) : (
                      leave.reason
                    )}
                  </td>
                  <td
                    className={`p-3 border border-black  font-bold ${
                      leave.status === "Pending" ? "text-yellow-500" : ""
                    }${leave.status === "Approved" ? "text-green-500" : ""}${
                      leave.status === "Rejected" ? "text-red-500" : ""
                    }`}
                  >
                    {leave.status}
                  </td>

                  <td className="p-5 border flex gap-2">
                    {editIndex === index ? (
                      <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
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
    </div>
  );
};
