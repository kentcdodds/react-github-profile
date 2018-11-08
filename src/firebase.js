import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBkT_5EQmDHV-qVKH8WvF-9IYLK-sCrDkE',
  authDomain: 'react-github-profile-de4e2.firebaseapp.com',
  projectId: 'react-github-profile-de4e2',
}

firebase.initializeApp(config)

async function authWithGitHub() {
  const provider = new firebase.auth.GithubAuthProvider()
  provider.addScope('public_repo')
  provider.addScope('read:org')
  provider.addScope('read:user')
  const result = await firebase.auth().signInWithPopup(provider)
  return result.credential.accessToken
}

function gitHubSignOut() {
  return firebase.auth().signOut()
}

export {authWithGitHub, gitHubSignOut}
