import React from 'react';

// Icons
import {ReactComponent as Pen} from '../../../assets/icons/pen.svg';

const ProfileImage = (props) => {
  const {src, changeHandler} = props

	return (
		<div className='profile-image'>
			<div className='profile-image__image'>
        <img src={src} alt="Zdjęcie profilowe" />
      </div>
			<label className='profile-image__input'>
        <span className="profile-image__input-label"><Pen/></span>
				<input
					type='file'
					name='profile-image'
					id='profile-image'
					accept='.jpg, .jpeg, .png, .webp, .svg'
          onChange={(e) => changeHandler(URL.createObjectURL(e.target.files[0]))}
				/>
			</label>
		</div>
	);
};

export default ProfileImage;
