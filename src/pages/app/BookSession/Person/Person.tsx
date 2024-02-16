import React from 'react'
// Components
import Input from 'src/new-components/Input/Input'
// Types

interface PersonProps{
  updateFormHandler: () => void
	limit: number
}

const Person = (props: PersonProps) => {
  const {updateFormHandler} = props

  return (
    <div>
      		{/* <Input
						id='name'
						name='name'
						type='name'
						placeholder={'Imię i nazwisko'}
						value={form.name.value}
						errorMessage={form.name.errorMessage}
						isValid={form.name.isValid}
						valueChangeHandler={updateFormHandler}
					/>
      		<Input
						id='email'
						name='email'
						type='email'
						placeholder={'E-mail'}
						value={form.email.value}
						errorMessage={form.email.errorMessage}
						isValid={form.email.isValid}
						valueChangeHandler={updateFormHandler}
					/>
					<Input
						id='message'
						name='message'
						type='message'
						placeholder={'Wiadomość'}
						value={form.message.value}
						errorMessage={form.message.errorMessage}
						isValid={form.message.isValid}
						valueChangeHandler={updateFormHandler}
					/> */}
    </div>
  )
}

export default Person