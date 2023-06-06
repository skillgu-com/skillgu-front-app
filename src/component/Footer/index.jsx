import React from 'react';
import {Link} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__nav row flex-wrap'>
					<div className='col-12 col-md-6 col-lg-3'>
						<h3 className='footer__nav-title'>Tytuł</h3>
						<ul className='footer__nav-list'>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
						</ul>
					</div>
					<div className='col-12 col-md-6 col-lg-3'>
						<h3 className='footer__nav-title'>Tytuł</h3>
						<ul className='footer__nav-list'>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
						</ul>
					</div>
					<div className='col-12 col-md-6 col-lg-3'>
						<h3 className='footer__nav-title'>Tytuł</h3>
						<ul className='footer__nav-list'>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
						</ul>
					</div>
					<div className='col-12 col-md-6 col-lg-3'>
						<h3 className='footer__nav-title'>Tytuł</h3>
						<ul className='footer__nav-list'>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
							<li className='footer__nav-item'>
								<Link to='/'>Item</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='footer__copy d-flex align-items-center justify-content-between'>
					<p className='text-left'>
						&copy; 2022 Copyright: <Link to='/'>investalert.pl</Link>
					</p>
					<div className='footer__social'>
						<ul className='social-list d-flex align-items-center justify-content-center'>
							<li className='social-list__item'>
								<a href='/' className='social-list__link'>
									<FacebookIcon />
								</a>
							</li>
							<li className='social-list__item'>
								<a href='/' className='social-list__link'>
									<FacebookIcon />
								</a>
							</li>
							<li className='social-list__item'>
								<a href='/' className='social-list__link'>
									<FacebookIcon />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
