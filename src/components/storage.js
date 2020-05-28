//graphs
export const Getdata = () => {
    return JSON.parse(localStorage.getItem('graphs')) ? JSON.parse(localStorage.getItem('graphs')) : []
}

export const Updatedata = (data) => {
    localStorage.setItem("graphs", JSON.stringify(data));
}

//nodes
export const Getnode = () => {
    return JSON.parse(localStorage.getItem('nodes')) ? JSON.parse(localStorage.getItem('nodes')) : []
}

export const Updatenode = (data) => {
    localStorage.setItem("nodes", JSON.stringify(data));
}

//relations
export const Getrelation = () => {
    return JSON.parse(localStorage.getItem('relations')) ? JSON.parse(localStorage.getItem('relations')) : []
}

export const Updaterelation = (data) => {
    localStorage.setItem("relations", JSON.stringify(data));
}
