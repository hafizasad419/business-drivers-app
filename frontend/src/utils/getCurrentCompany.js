export const getCurrentCompany = () => {
    const companyString = localStorage.getItem('company');
    
    // If no company is found in localStorage, return null
    if (!companyString) {
        console.log('No company found in localStorage');
        return null;
    }

    // Parse the company string
    let companyObject;
    try {
        companyObject = JSON.parse(companyString);
    } catch (error) {
        console.error('Error parsing company data from localStorage:', error);
        return null; // If parsing fails, return null
    }

    // Ensure companyObject and its properties exist before accessing them
    if (companyObject && companyObject.data && companyObject.data.company) {
        return companyObject.data.company;
    } else {
        console.log('Company data is missing or improperly formatted');
        return null;
    }
};
