import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Container, Row, Column} from '../../shared/layout'
import {Text} from '../../shared/pattern'
import Profile from './components/profile'
import RepoFilter from './components/repo-filter'
import RepoList from './components/repo-list'

export default class User extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }
  state = {filter: ''}

  handleFilterUpdate = filter => {
    this.setState({filter})
  }

  render() {
    const {username} = this.props
    const {filter} = this.state
    return (
      <Container>
        <Row>
          <Column width="3">
            <Profile username={username} />
          </Column>
          <Column width="9">
            <Text subheading>Repositories</Text>
            <RepoFilter filter={filter} onUpdate={this.handleFilterUpdate} />
            <RepoList filter={filter} username={username} />
          </Column>
        </Row>
      </Container>
    )
  }
}
