const formatDateDifference = (postedDate) => {
    const viewedDate = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const diffInSeconds = Math.floor((viewedDate - postedDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInSeconds < 60) {
        return ` asked ${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
        return ` asked ${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return ` asked ${diffInHours} hours ago`;
    } else if (postedDate.getFullYear() === viewedDate.getFullYear()) {
        return ` asked ${months[postedDate.getMonth()]} ${String(postedDate.getDate()).padStart(2, '0')} at ${String(postedDate.getHours()).padStart(2, '0')}:${String(postedDate.getMinutes()).padStart(2, '0')}`;
    } else {
        return ` asked ${months[postedDate.getMonth()]} ${String(postedDate.getDate()).padStart(2, '0')}, ${postedDate.getFullYear()} at ${String(postedDate.getHours()).padStart(2, '0')}:${String(postedDate.getMinutes()).padStart(2, '0')}`;
    }
}

export { formatDateDifference };
