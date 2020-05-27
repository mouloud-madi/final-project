// get data from storage 
export const getStorageData = () => {
    if(localStorage.getItem("graph")){
        return JSON.parse(localStorage.getItem("graph"));
    }
    return null
}

// push element to localStorage
export const updateStorageData = (data) => {
    localStorage.setItem("graph",JSON.stringify(data));
}