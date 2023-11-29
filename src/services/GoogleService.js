import axios from "axios";
import {retry} from "@reduxjs/toolkit/query";
import {useEffect, useState} from "react";

// export const googleCalendar = async () => {
//     return await axios.get('/google/oauth2/authorize')
// }

// export const googleCalendar = () => {
//     const url = 'http://localhost:8080/oauth2/authorize';
//     window.open(url, '_blank');
// };

export const googleCalendar = async () => {
    try {
        const response = await axios.get('/oauth2/authorize');
        const url = response.data;
        window.location.href = url; // Przekierowanie użytkownika do Google


    } catch (error) {
        console.error('Error during Google OAuth:', error);
    }
};

// export const googleCalendar = async () => {
//     try {
//         const response = await axios.get('/oauth2/authorize');
//         const url = response.data;
//         console.log(url);
//         window.open(url, '_blank'); // Otwiera proces autoryzacji w nowej zakładce
//     } catch (error) {
//         console.error('Error during Google OAuth:', error);
//     }
// };

// export const googleCalendar = async () => {
//     try {
//         const response = await axios.get('/oauth2/authorize');
//         const url = response.data;
//         window.location.href = url; // Przekierowanie w tym samym oknie
//     } catch (error) {
//         console.error('Error during Google OAuth:', error);
//     }
// };

// export const startGoogleAuth = async () => {
//     try {
//         const response = await axios.get('/oauth2/authorize').then((res)=>{
//             console.log(res)
//         })
//         window.location.href = response.data;
//     } catch (error) {
//         console.error('Error during Google OAuth:', error);
//     }
// };
