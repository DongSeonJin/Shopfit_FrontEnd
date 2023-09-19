import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = new Date(); // Create a new date object
    expireDate.setDate(today.getDate() + 7); // Set the expiration date

    return cookies.set('refresh_token', refreshToken, { 
        sameSite: 'strict', 
        path: "/", 
        expires: expireDate // Use the updated date object
    });
};

export const getCookieToken = () => {
    return cookies.get('refresh_token');
};

export const removeCookieToken = () => {
    return cookies.remove('refresh_token', { sameSite: 'strict', path: "/" })
}