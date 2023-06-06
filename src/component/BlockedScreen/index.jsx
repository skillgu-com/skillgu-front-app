import React from 'react'

import { ReactComponent as Lock } from '../../assets/icons/lock.svg'

const BlockedScreen = () => {
  return (
    <div className="blocked-screen">
      <Lock/>
      <p className="app__title">Uzupełnij wymagane pola w poprzednim kroku!</p>
    </div>
  )
}

export default BlockedScreen