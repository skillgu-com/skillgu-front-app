import React, {useContext, useEffect, useState} from 'react';
import CustomButton from '../../../component/CustomButton';
import AppLayout from '../../../component/AppLayout';
import {getClientUserUUID} from '../../../services/UserProfileService';
import {useParams} from 'react-router-dom';
import BookForm from './views/BookForm';
import Payment from './views/BookPayment';
import BookSuccess from './views/BookSuccess';
import {useSelector} from "react-redux";

const BookSessionScreen = () => {
	const {id} = useParams();
	const userFromRedux = useSelector((state) => state.connectionProcess.sessionStep);


	let [step, setStep] = useState(1);
	let [user, setUser] = useState({});
	let [session, setSession] = useState({});

	useEffect(() => {
	    getClientUserUUID(id).then(response => {
	            setUser(response.data)
	            console.log(response.data)
	        })
	    }, []
	);



	const changeStepBookHandler = (bookForm) => {
		// Tutaj możesz przetwarzać dane z formularza (formData)
		console.log('Dane z formularza:', bookForm);
		console.log('Dane z reduktora:', userFromRedux);

		// Dodatkowo, możesz zaktualizować stan lub wykonać inne operacje

		// Przykładowe zaktualizowanie stanu sesji
		setSession(bookForm);

		// Przykład zmiany kroku
		setStep(2); // Przykład: przejście do kroku 2

		// Możesz wykonać inne operacje w zależności od potrzeb
	};


	console.log(step);

	return (
		<AppLayout>
			{step === 1 && <BookForm changeStepBookHandler={changeStepBookHandler} />}
			{/*{step === 1 && <BookForm changeStepHandler={() => setStep(2)} />}*/}
			{step === 2 && <Payment changeStepHandler={(num) => setStep(num)} />}
			{step === 3 && <BookSuccess changeStepHandler={(num) => setStep(num)} />}
		</AppLayout>
	);
};

export default BookSessionScreen;


