import { useState } from "react";

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

const Form = () => {
  const [newLeave, setNewLeave] = useState<Partial<LeaveRequest>>({
    status: "Pending",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

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
      !newLeave.leaveId ||
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
      const newLeaveData = {
        ...newLeave,
        leaveId: (leaveRequests.length > 0).toString(),
        status: "Pending",
        approvedById: "",
        approvedByName: "",
      } as LeaveRequest;

      setLeaveRequests([...leaveRequests, newLeaveData]);

      const storedAdminLeaves = JSON.parse(
        localStorage.getItem("adminLeaves") || "[]"
      );
      storedAdminLeaves.push(newLeaveData);
      localStorage.setItem("adminLeaves", JSON.stringify(storedAdminLeaves));

      setNewLeave({ status: "Pending" });

      alert("Leave request submitted successfully");
    }
  };

  return (
    <div className="">
      <div className="p-8 w-md mx-auto bg-gray-100 min-h-screen rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Apply for Leave
        </h2>
        <div className="grid grid-cols-1">
          

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

          <div className="flex justify-between">
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
    </div>
  );
};

export default Form;
