import React, {useContext, useEffect, useState} from 'react';
import CustomButton from '../../../component/CustomButton';
import AppLayout from '../../../component/AppLayout';
import {getClientUserUUID} from '../../../services/UserProfileService';
import {useParams} from 'react-router-dom';
import BookForm from './views/BookForm';
import Payment from './views/BookPayment';

const BookSessionScreen = () => {
	let {uuid} = useParams();

	let [step, setStep] = useState(1);
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
			{step === 1 && <BookForm changeStepHandler={() => setStep(2)} />}
			{step === 2 && <Payment changeStepHandler={() => setStep(1)} />}
		</AppLayout>
	);
};

export default BookSessionScreen;
