import React, { useState, useEffect } from 'react';
import { Member, EditMemberModalProps } from '../pages/types';

const initialMemberState: Member ={
  id: 0,
  name: '',
  details: '',
  designation: '',
  gender: 'Other'
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ isOpen, onClose, member, onSave }) => {
  const [form, setForm] = useState<Member>(initialMemberState);

  useEffect(() => {
    if (member) setForm(member);
  }, [member]);

  if (!isOpen || !member) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const handleCancalClick = () => {
    setForm(initialMemberState)
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
        <h2 className="text-xl font-bold mb-4 text-center text-orange-500 ">Edit Member Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded mt-2"
            />
            <label>Designation</label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="w-full border p-2 rounded mt-2"
            />
            <label>Details</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Details"
              className="w-full border p-2 rounded mt-2"
            />
            <label>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleCancalClick} className="px-4 cursor-pointer py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button type="submit" className="py-1 px-4 bg-blue-400 cursor-pointer text-white rounded">
                Save
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;
