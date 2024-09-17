export const getCurrentCompany = () => {
    const companyString = localStorage.getItem('company');
    let companyObject;
    if (companyString) {
        companyObject = JSON.parse(companyString);
        // console.log(companyObject);
    } else {
        console.log('No company found in localStorage');
    }
    const company = companyObject.data.company
    return company;
} 