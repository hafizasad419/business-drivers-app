export const getCurrentUser = () => {
    const userString = localStorage.getItem('user');
    let userObject;
    if (userString) {
        userObject = JSON.parse(userString);
        console.log(userObject);
    } else {
        console.log('No user found in localStorage');
    }
    const freelancer = userObject.data.freelancer
    return freelancer;
} 