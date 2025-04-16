import axios from "axios";
import { Member } from "../pages/types";

const baseUrl = 'http://localhost:5146'

export const getMemberDetails = async () => {
    try{
      const response = await axios.get(`${baseUrl}/api/teammembers`);
      return response
    }catch (err) {
      console.log('Error GET: ', err)
      return null
    }
}

export const getMemberDetailById = async (id:number) => {
    try{
      const response = await axios.get(`${baseUrl}/api/teammembers/${id}`);
      return response
    }catch (err) {
      console.log('Error GET: ', err)
      return null
    }
}

export const postMemberDetails = async (member: Member) => {
    try{
      const response = await axios.post(`${baseUrl}/api/teammembers`, member);
      return response
    }catch (err) {
      console.log('Error POST: ', err)
      return null
    }
}

export const patchMemberDetails = async (member: Member) => {
    try{
      const response = await axios.put(`${baseUrl}/api/teammembers/${member.id}`, member);
      return response
    }catch (err) {
      console.log('Error PATCH: ', err)
      return null
    }
}

export const deleteMemberDetails = async (id: number | null) => {
    try{
      const response = await axios.delete(`${baseUrl}/api/teammembers/${id}`);
      return response
    }catch (err) {
      console.log('Error DELETE: ', err)
      return null
    }
}