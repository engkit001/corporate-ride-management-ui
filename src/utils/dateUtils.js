export const formatDateToMinute = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string" || dateStr.trim() === "") {
      return "-";
    }
  
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "-";
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  