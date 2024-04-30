import axios from "axios";

const baseurl = import.meta.env.VITE_API_URL;
export const addWorkItem = async (workType, boardId , item) => {
    try {
        const {title,content} = item
        await axios.post(`${baseurl}/todos?boardId=${boardId}&workType=${workType}`,{title,content}); 
        // Changed to axios.get

        // return response;

    } catch (error) {
        console.log(error);
        // Consider setting an error state here
    }
};

export const updateWorkItem = async (workType, boardId , item , editItemContent) => {
    try {
        const {title,content,_id} = item
        await axios.put(`${baseurl}/todos/boards/?boardId=${boardId}&workType=${workType}&itemId=${_id}`,{content:editItemContent}); 
        // Changed to axios.get
        // console.log(response.data);
        // return response;

    } catch (error) {
        console.log(error);
        // Consider setting an error state here
    }
};

export const deleteWorkItem = async (workType, boardId , id ) => {
    try {
       
        const response = await axios.delete(`${baseurl}/todos/boards/?boardId=${boardId}&workType=${workType}&itemId=${id}`);
        // Changed to axios.get
        // console.log(response.data);
        return response;

    } catch (error) {
        console.log(error);
        // Consider setting an error state here
    }
};
