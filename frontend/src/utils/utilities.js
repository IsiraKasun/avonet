import moment from "moment";

export const getLast15Years = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
  
    for (let i = 0; i < 15; i++) {
      years.push(currentYear - i);
    }
  
    return years;
};

export const getMonthsForYear = (year) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); 
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const lastMonth = parseInt(year, 10) === currentYear ? currentMonth : 11;
  
    return months.slice(0, lastMonth + 1);
  }

export const getStartAndEndDate = (year, month) => {
    const numericYear = parseInt(year, 10);
    const numericMonth = parseInt(month, 10)
    const startDate = moment(new Date(numericYear, numericMonth, 1)).format('YYYY-MM-DD');
    const endDate = moment(new Date(numericYear, (numericMonth + 1) === 12 ? 1 : numericMonth + 1, 0)).format('YYYY-MM-DD'); 
  
    return { startDate, endDate };
}
