export const Getdata = () => {
    return JSON.parse(localStorage.getItem('graphs')) ? JSON.parse(localStorage.getItem('graphs')) : []
}

export const Updatedata = (data) => {
    localStorage.setItem("graphs", JSON.stringify(data));
}
