/* @jsx jsx */
import {jsx} from '@emotion/core'

import {useState} from 'react'
import {navigate} from '@reach/router'
import {Input, PrimaryButton, IsolatedContainer} from '../../shared/pattern'
import {Loading} from '../../shared/loading'

function Home() {
  const [showLoading, setLoading] = useState(false)
  function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()
    const username = e.target.elements.username.value.trim()
    navigate(`/${username}`)
  }

  return (
    <IsolatedContainer>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
        <Loading
          css={{opacity: showLoading ? null : 0, transition: 'all 0.2s'}}
          size="small"
        />
      </div>
    </IsolatedContainer>
  )
}

export default Home

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
