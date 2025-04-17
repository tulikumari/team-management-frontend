"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditMemberModal from "../../components/EditMemberModal";
import { Member } from "../types";
import AddMemberModal from "../../components/AddMemberModal";
import DeleteMemberModal from "@/app/components/DeleteMemberModal";
import {
  deleteMemberDetails,
  getMemberDetails,
  patchMemberDetails,
  postMemberDetails,
} from "@/app/services/api";

const initialMemberState: Member = {
  id: 0,
  name: "",
  details: "",
  designation: "",
  gender: "Other",
};

export default function ManageTeamMembers({ isHomePage = false }) {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [editMemberDetails, setEditMemberDetails] = useState<Member>(initialMemberState);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const [isShowEditModal, setShowEditModal] = useState(false);
  const [isShowAddModal, setShowAddModal] = useState(false);
  const [deleteClickId, setDeleteClickId] = useState<number | null>(null);

  const getTeamMemberDetails = async () => {
    try {
      const response = await getMemberDetails();
      if (response) {
        setTeamMembers(response.data);
      } else {
        setTeamMembers([]);
        alert("Error while making GET request");
      }
    } catch (err) {
      alert("Failed to fetch members.");
    }
  };

  const handleAddSaveClick = async (newMember: Member) => {
    try {
      const response = await postMemberDetails(newMember);
      if (response) {
        getTeamMemberDetails();
      } else {
        alert("Error while making POST request");
      }
    } catch {
      alert("Failed to add member.");
    }
  };

  const handleUpdateSaveClick = async (updatedMember: Member) => {
    try {
      const response = await patchMemberDetails(updatedMember);
      if (response) {
        getTeamMemberDetails();
        setEditMemberDetails(initialMemberState);
      } else {
        alert("Error while making PATCH request");
      }
    } catch {
      alert("Failed to update member.");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await deleteMemberDetails(deleteClickId);
      if (response) {
        getTeamMemberDetails();
        setDeleteClickId(null);
        setShowDeleteModal(false);
      } else {
        alert("Error while making DELETE request");
      }
    } catch {
      alert("Failed to delete member.");
    }
  };

  useEffect(() => {
    getTeamMemberDetails();
  }, []);

  const handleAddClick = () => setShowAddModal(true);
  const deleteMemberClick = (id: number) => {
    setDeleteClickId(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (id: number) => {
    const getMember = teamMembers.find((member) => member.id === id);
    if (!getMember) return;
    setEditMemberDetails(getMember);
    setShowEditModal(true);
  };

  const handleViewDetails = (id: number) => {
    router.push(`/pages/member-details/${id}?isHome=${isHomePage}`);
  };

  const cancelEditClick = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setShowDeleteModal(false);
    setEditMemberDetails(initialMemberState);
  };

  return (
    <div className="max-w-[1240px] w-full m-auto p-4 sm:p-10 flex flex-col gap-6 sm:gap-10 overflow-y-auto max-h-[100vh]">
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {isHomePage ? "Team Members" : "Manage Team Members"}
        </h1>

        {!isHomePage && (
          <div className="flex items-center mb-4">
            <button
              onClick={handleAddClick}
              className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
            >
              Add Member
            </button>
          </div>
        )}

        {/* Scrollable Table Section */}
        <div className="overflow-x-auto w-full">
          <div className="min-w-[500px] space-y-2">
            {/* Header */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 w-[300px]">
                  <p className="w-[150px] font-semibold">Name</p>
                  <p className="w-[150px] font-semibold">Designation</p>
                </div>
                <div className={`flex justify-end ${isHomePage ? 'w-[150px]' : 'w-[250px]'}`}>
                  <p className="font-semibold">Action</p>
                </div>
              </div>
            </div>

            {/* Rows */}
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 w-[300px]">
                    <p className="w-[150px]">{member.name}</p>
                    <p className="w-[150px] text-sm">{member.designation}</p>
                  </div>
                  <div className={`flex gap-2 justify-end ${isHomePage ? 'w-[150px]' : 'w-[250px]'}`}>
                    <button
                      onClick={() => handleViewDetails(member.id)}
                      className="py-1 px-2 bg-blue-400 rounded text-white cursor-pointer"
                    >
                      View Details
                    </button>
                    {!isHomePage && (
                      <>
                        <button
                          onClick={() => handleEditClick(member.id)}
                          className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMemberClick(member.id)}
                          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditMemberModal
        isOpen={isShowEditModal}
        onClose={cancelEditClick}
        member={editMemberDetails}
        onSave={handleUpdateSaveClick}
      />
      <AddMemberModal
        isOpen={isShowAddModal}
        onClose={cancelEditClick}
        onSave={handleAddSaveClick}
      />
      <DeleteMemberModal
        isOpen={isShowDeleteModal}
        onClose={cancelEditClick}
        onSave={handleDeleteClick}
      />
    </div>
  );
}
