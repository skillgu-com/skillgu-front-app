// Libraries
import React from 'react'
// Icons
import Camera from 'src/assets/icons/Camera'
import Chain from 'src/assets/icons/Chain'
import People from 'src/assets/icons/People'
// Styles
import styles from './SessionDescription.module.scss'

const SessionDescription = () => {
  return (
    <ul className={styles.wrapper}>
      <li className={styles.item}>
        <Camera/>
        <span>Spotkanie odbywa się w formie rozmowy wideo.</span>
      </li>
      <li className={styles.item}>
        <Chain/>
        <span>Link do spotkania otrzymasz po zatwierdzeniu terminu.</span>
      </li>
      <li className={styles.item}>
        <People/>
        <span>W spotkaniu może uczestniczyć maksymalnie 5 osób z Twojego zespołu</span>
      </li>
    </ul>
  )
}

export default SessionDescription