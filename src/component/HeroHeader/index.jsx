import React from 'react'

const HeroHeader = (props) => {
  const {title, image} = props

  return (
    <header className='hero-header'>
      <div className="hero-header__img">{image}</div>
      <h1 className='app__title--huge home-screen__title'>{title}</h1>
    </header>
  )
}

export default HeroHeader