// Define a TypeScript interface for task data
export interface Member {
  id: number;
  name: string;
  designation: string;
  details: string;
  gender: 'Male' | 'Female' | 'Other';
}

export interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member ;
  onSave: (updatedMember: Member) => void;
}

export interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedMember: Member) => void;
}
  
export interface DeleteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

  