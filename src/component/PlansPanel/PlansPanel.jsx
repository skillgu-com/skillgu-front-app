import React from 'react';

const PlansPanel = () => {
	return (
		<div className='plans-panel'>
			<div className='plans-panel__tabs'>
				<label className='plans-panel__tabs-item'>
					<input type='radio' name='mentorship' id='mentorship'/>
          Plan mentorstwa
				</label>
				<label className='plans-panel__tabs-item'>
					<input type='radio' name='session' id='session'/>
          Sesja
				</label>
			</div>
      <div className="plans-panel__content">
        
      </div>
		</div>
	);
};

export default PlansPanel;
