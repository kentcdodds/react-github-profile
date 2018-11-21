/* @jsx jsx */
import {jsx} from '@emotion/core'

import {navigate} from '@reach/router'
import {Input, PrimaryButton, IsolatedContainer} from '../../shared/pattern'

function handleSubmit(e) {
  e.preventDefault()
  const username = e.target.elements.username.value.trim()
  navigate(`/${username}`)
}

function Home() {
  return (
    <IsolatedContainer>
      <form
        onSubmit={handleSubmit}
        css={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: 240,
          margin: 'auto',
        }}
      >
        <Input
          type="text"
          name="username"
          placeholder="Enter a GitHub username"
          autoFocus
          css={{
            borderRight: 'none',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            minWidth: 190,
          }}
        />
        <PrimaryButton
          css={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          type="submit"
        >
          Go
        </PrimaryButton>
      </form>
    </IsolatedContainer>
  )
}

export default Home

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
