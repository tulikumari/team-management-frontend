import React from 'react';
import { DeleteMemberModalProps } from '../pages/types';

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({ isOpen, onClose, onSave }) => {

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave();
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
        <h2 className="text-xl font-bold mb-4 text-center text-orange-500">Delete Member Details</h2>
        <p className="text-sm mb-4 text-center">Are you sure you want to delete this member?</p>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={handleCancelClick} className="px-4 py-2 cursor-pointer bg-gray-300 rounded">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="py-1 px-4 bg-blue-400 cursor-pointer text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;
