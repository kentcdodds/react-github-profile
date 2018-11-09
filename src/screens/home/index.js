import React from 'react'
import {navigate} from '@reach/router'
import {css} from 'react-emotion/macro'
import {Input, PrimaryButton, IsolatedContainer} from '../../shared/pattern'

const handleSubmit = e => {
  e.preventDefault()
  const username = e.target.elements.username.value.trim()
  navigate(`/${username}`)
}

function Home() {
  return (
    <IsolatedContainer>
      <form
        onSubmit={handleSubmit}
        className={css({
          display: 'flex',
          justifyContent: 'center',
          maxWidth: 240,
          margin: 'auto',
        })}
      >
        <Input
          type="text"
          name="username"
          placeholder="Enter a GitHub username"
          autoFocus
          className={css({
            borderRight: 'none',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            minWidth: 190,
          })}
        />
        <PrimaryButton
          className={css({
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          })}
          type="submit"
        >
          Go
        </PrimaryButton>
      </form>
    </IsolatedContainer>
  )
}

export default Home
