import React, {useContext, useEffect, useState} from 'react';
import CustomButton from '../../../component/CustomButton';
import AppLayout from '../../../component/AppLayout';
import {getClientUserUUID} from '../../../services/UserProfileService';
import {useParams} from 'react-router-dom';
import BookForm from './views/BookForm';
import Payment from './views/BookPayment';

const BookSessionScreen = () => {
	let {uuid} = useParams();

	let [user, setUser] = useState({});
	let [session, setSession] = useState({});

	// useEffect(() => {
	//     getClientUserUUID(uuid).then(response => {
	//             setUser(response.data)
	//             console.log(response.data)
	//         })
	//     }, []
	// );

	return (
		<AppLayout>
			<Payment />
		</AppLayout>
	);
};

export default BookSessionScreen;
