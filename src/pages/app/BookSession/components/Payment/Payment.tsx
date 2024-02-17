import React, {useEffect, useState} from 'react';
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import {useStripe} from '@stripe/react-stripe-js';
// Components
import FAQ from 'src/new-components/FAQ/Accordion';
// Styles
import styles from '../BookForm/BookForm.module.scss';
import {createCheckoutSession} from 'src/services/PaymentService';

const Payment = () => {
	const stripe = useStripe();
	const [clientSecret, setClientSecret] = useState('');

	useEffect(() => {
		createCheckoutSession({}).then((res) => {
			setClientSecret(res.data.clientSecret);
		});
	}, []);

	return (
		<section className={styles.wrapper}>
			<div className='book-payment-stripe'>
				<EmbeddedCheckoutProvider stripe={stripe} options={{clientSecret}}>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider>
			</div>
			<FAQ
				elements={[
					{
						id: '01',
						title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
						description:
							' Fugiat tempore, iure deleniti corrupti reiciendis obcaecati quibusdam eligendi. Debitis laudantium numquam aut repellendus, culpa esse! Non blanditiis aut nisi labore voluptas.',
					},
					{
						id: '02',
						title: 'test 2',
						description:
							'assdad dsafmsd,gmls dkfjgnsjdnfklgjskfgj skjg lskj ;lgfjks lkfdjgh ksfjhgls kfdjhg lsdfgjkhskdfhgslkugreojhsdlk jfhv kdfhvkkkflsl dj gljlsjl',
					},
				]}
			/>
		</section>
	);
};

export default Payment;
