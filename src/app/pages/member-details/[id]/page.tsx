"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Member } from "../../types";
import { getMemberDetailById } from "@/app/services/api";

const initialMemberState: Member = {
  id: 0,
  name: "",
  details: "",
  designation: "",
  gender: "Other",
};

export default function ManageTeamMemberPage() {
  const router = useRouter();
  const { id } = useParams();
  const memberId = Number(id);
  const [member, setMember] = useState<Member>(initialMemberState);
  const searchParams = useSearchParams();
  const from = searchParams.get('isHome');

   const getMember = async() => {
      const response = await getMemberDetailById(memberId);
      if(response) {
        setMember(response.data)
      }else{
        alert('Member Not found...')
      }
    }

  useEffect(() => {
    if (!id) return;
    getMember() 
  }, [id, memberId]);

  const handleBack = () => {
    console.log("from>>>>>",from)
    if (from === true) {
      router.push('/');
    } else {
      router.push("/pages/manage-team-members");
    }
  };

  return (
    <div className="p-6 max-w-[1240px] m-auto">
      <h1 className="text-2xl font-bold mb-4">{member.name} Details</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <p>
          <strong>Name:</strong> {member.name}
        </p>
        <p>
          <strong>Designation:</strong> {member.designation}
        </p>
        <p>
          <strong>Details:</strong> {member.details}
        </p>
        <p>
          <strong>Gender:</strong> {member.gender}
        </p>
      </div>
      <button
        onClick={handleBack}
        className="py-1 px-2 bg-blue-400 rounded cursor-pointer text-white mt-4"
      >
        Back
      </button>
    </div>
  );
}
