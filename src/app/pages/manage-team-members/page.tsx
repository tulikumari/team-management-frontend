"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditMemberModal from "../../components/EditMemberModal";
import { Member } from "../types";
import AddMemberModal from "../../components/AddMemberModal";
import DeleteMemberModal from "@/app/components/DeleteMemberModal";
import { deleteMemberDetails, getMemberDetails, patchMemberDetails, postMemberDetails } from "@/app/services/api";

const initialMemberState: Member = {
  id: 0,
  name: "",
  details: "",
  designation: "",
  gender: "Other",
};

export default function ManageTeamMembers({isHomePage = false}) {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [editMemberDetails, setEditMemberDetails] = useState<Member>(initialMemberState);
  const [isShowDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
  const [deleteClickId, setDeleteClickId] = useState<number | null>(0)

  const getTeamMemberDetails = async() => {
    const response = await getMemberDetails();
    if(response) {
      setTeamMembers(response.data)
    }else{
      setTeamMembers([])
      alert('Error while making GET request')
    }
  }
  
  const handleAddSaveClick = async (newMember: Member) => {
    const response = await postMemberDetails(newMember);
    if(response) {
      getTeamMemberDetails()
    }else{
      setTeamMembers([])
      alert('Error while making POST request')
    }
  }

  const handleUpdateSaveClick = async (updatedMember: Member) => {
    const response = await patchMemberDetails(updatedMember);
    if(response) {
      getTeamMemberDetails()
      setEditMemberDetails(initialMemberState);
    }else{
      setTeamMembers([])
      alert('Error while making PATCH request')
    }
  }

  const handleDeleteClick = async () => {
    const response = await deleteMemberDetails(deleteClickId);
    if(response) {
      getTeamMemberDetails()
      setDeleteClickId(null)
      setShowDeleteModal(false)
    }else{
      setTeamMembers([])
      alert('Error while making DELETE request')
    }
  }

  useEffect(() => {
    getTeamMemberDetails()
  }, []);

  const handleAddClick = (): void => {
    setShowAddModal(true);
  };

  const deleteMemberClick = (id: number): void => {
    setDeleteClickId(id)
    setShowDeleteModal(true)
  };

  const handleEditClick = (id: number): void => {
    const getMember = teamMembers.filter((member: Member) => member.id === id);
    if (getMember.length === 0) {
      return;
    }
    setEditMemberDetails(getMember[0]);
    setShowEditModal(true);
  };

  const handleViewDetails = (id: number): void => {
    router.push(`/pages/member-details/${id}?isHome=${isHomePage}`);
  };

  const cancalEditClick = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setShowDeleteModal(false);
    setEditMemberDetails(initialMemberState);
  };
 
  return (
    <div className="max-w-[1240px] w-full m-auto p-10 flex flex-col gap-10">
      <div className="flex min-w-[700px]  flex flex-col gap-10">
      <div className="w-full min-w-[500px] min-h-[300px] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        {isHomePage ? "Team Members" : "Manage Team Members" }
        </h1>
        {!isHomePage && 
        <div className="flex items-center mb-4">
          <button
            onClick={handleAddClick}
            className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
          >
            Add Member
          </button>
        </div>
        }
        <div className="space-y-2">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2">
            <div className="flex justify-between py-2">
              <div className="flex gap-4 justify-center items-center">
                <p className="w-[150px]"><b>Name</b></p>
                <p className="w-[150px]"><b>Designation</b></p>
              </div>
              <div className={`flex items-center ${isHomePage ? 'w-[150px]' : 'w-[250px]'}`}>
                <p><b>Action</b></p>
              </div>
            </div>
          </div>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
            >
              <div className="flex items-center">
                <div className="flex gap-4 justify-center items-center">
                  <p className="w-[150px]">{member.name}</p>
                  <p className="text-sm w-[150px]">{member.designation}</p>
                </div>
              </div>
                <div className={`flex items-center ${isHomePage ? 'w-[150px]' : 'w-[250px]'}`}>
                  <button
                      onClick={() => handleViewDetails(member.id)}
                      className="py-1 px-2 bg-blue-400 rounded cursor-pointer text-white mr-2"
                    >
                      View Details
                  </button>
                  {!isHomePage && 
                    <>
                      <button
                        onClick={() => handleEditClick(member.id)}
                        className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMemberClick(member.id)}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium py-1 px-2 rounded-md"
                      >
                        Delete
                      </button>
                    </>
                  }
                </div>
            </div>
          ))}
        </div>
      </div>
      <EditMemberModal
        isOpen={isShowEditModal}
        onClose={cancalEditClick}
        member={editMemberDetails}
        onSave={handleUpdateSaveClick}
      />
      <AddMemberModal
        isOpen={isShowAddModal}
        onClose={cancalEditClick}
        onSave={handleAddSaveClick}
      />
      <DeleteMemberModal
        isOpen={isShowDeleteModal}
        onClose={cancalEditClick}
        onSave={handleDeleteClick}
      />
    </div>
    </div>
  );
}
