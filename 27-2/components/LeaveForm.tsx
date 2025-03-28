import { useState } from "react";

interface LeaveRequest {
  leaveId: string;
  employeeId: string;
  on: string;
  datefrom?: string;
  dateto?: string;
  timefrom?: string;
  timeto?: string;
  absenceHours: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedById?: string;
  approvedByName?: string;
}

const LeaveForm = () => {
  const [newLeave, setNewLeave] = useState<Partial<LeaveRequest>>({
    status: "Pending",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveType, setLeaveType] = useState<string>("");

  const handleInputChange = (
    field: keyof LeaveRequest,
    value: string | number
  ) => {
    setNewLeave((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setNewLeave({ status: "Pending" });
    setEditIndex(null);
    setLeaveType("");
  };

  const handleApplyLeave = () => {
    if (
      !newLeave.leaveId ||
      !newLeave.employeeId ||
      !newLeave.on ||
      !newLeave.reason ||
      newLeave.absenceHours === undefined ||
      (leaveType === "More Days" && (!newLeave.datefrom || !newLeave.dateto)) ||
      (leaveType === "Half Day" && (!newLeave.timefrom || !newLeave.timeto))
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
        leaveId: (leaveRequests.length + 1).toString(),
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
      setLeaveType("");
      alert("Leave request submitted successfully");
    }
  };

  return (
    <div className="">
      <div className="p-8 w-md mx-auto border-2 bg-gray-100 min-h-screen rounded-xl shadow-lg">
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
          <label className="font-bold mb-1 mt-3">Leave Type</label>
          <select
            className="p-2 border rounded"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="" disabled>
              Select Leave Type
            </option>
            <option value="Full Day">Full Day</option>
            <option value="Half Day">Half Day</option>
            <option value="More Days">More Days</option>
          </select>
          {leaveType === "Full Day" && (
            <>
              <label className="font-bold mb-1 mt-3">On</label>
              <input
                className="p-3 border rounded-lg"
                type="date"
                value={newLeave.on || ""}
                onChange={(e) => handleInputChange("on", e.target.value)}
              />
              
            </>
          )}

          {leaveType === "More Days" && (
            <>
              <label className="font-bold mb-1 mt-3">From</label>
              <input
                className="p-3 border rounded-lg"
                type="date"
                value={newLeave.datefrom || ""}
                onChange={(e) => handleInputChange("datefrom", e.target.value)}
              />
              <label className="font-bold mb-1 mt-3">To</label>
              <input
                className="p-3 border rounded-lg"
                type="date"
                value={newLeave.dateto || ""}
                onChange={(e) => handleInputChange("dateto", e.target.value)}
              />
            </>
          )}

          {leaveType === "Half Day" && (
            <>
              <label className="font-bold mb-1 mt-3">From</label>
              <input
                className="p-3 border rounded-lg"
                type="time"
                value={newLeave.timefrom || ""}
                onChange={(e) => handleInputChange("timefrom", e.target.value)}
              />
              <label className="font-bold mb-1 mt-3">To</label>
              <input
                className="p-3 border rounded-lg"
                type="time"
                value={newLeave.timeto || ""}
                onChange={(e) => handleInputChange("timeto", e.target.value)}
              />
            </>
          )}

          <label className="font-bold mb-1 mt-3">Hours</label>
          <input
            className="p-3 border rounded-lg"
            type="text"
            placeholder="Absence Hours"
            value={newLeave.absenceHours || ""}
            onChange={(e) => handleInputChange("absenceHours", parseFloat(e.target.value))}
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
              className={`p-3 rounded-lg text-white transition ${editIndex !== null ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
              onClick={handleApplyLeave}
            >
              {editIndex !== null ? "Update Leave" : "Apply"}
            </button>
            <button className="p-3 rounded-lg bg-gray-300" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
