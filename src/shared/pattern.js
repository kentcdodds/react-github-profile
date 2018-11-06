import styled from 'react-emotion/macro'

export const Section = styled.div(
  {
    padding: '20px 0',
  },
  ({theme}) => theme.common.borderBottom,
)

const heading = {
  display: 'block',
  fontFamily: 'inherit',
  fontWeight: '500',
  lineHeight: '1.1',
}
const largerHeading = {
  marginTop: '20px',
  marginBottom: '10px',
}

const smallerHeading = {
  marginTop: '10px',
  marginBottom: '10px',
}

export const Text = styled.span(
  propStyles({
    faded: ({theme}) => ({color: theme.colors.faded}),
    fadedExtra: ({theme}) => ({color: theme.colors.fadedExtra}),
    superheading: [heading, largerHeading, {fontSize: 36}],
    heading: [heading, largerHeading, {fontSize: 30}],
    subheading: [heading, largerHeading, {fontSize: 24}],
    superstandard: [heading, smallerHeading, {fontSize: 18}],
    standard: [heading, smallerHeading, {fontSize: 14}],
    substandard: [heading, smallerHeading, {fontSize: 12}],
  }),
)

export const Input = styled.input({
  display: 'block',
  width: '100%',
  height: '34px',
  padding: '6px 12px',
  fontSize: '14px',
  lineHeight: '1.42857143',
  color: '#555',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075)',
  transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
  ':focus': {
    borderColor: '#66afe9',
    outline: '0',
    boxShadow:
      'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6)',
  },
})

export const Button = styled.button({
  display: 'inline-block',
  padding: '6px 12px',
  marginBottom: '0',
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '1.42857143',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundImage: 'none',
  border: '1px solid transparent',
  borderRadius: '4px',
})

export const PrimaryButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#337ab7',
  borderColor: '#2e6da4',
  '&:hover,&:active,&:focus': {
    color: '#fff',
    backgroundColor: '#286090',
    borderColor: '#204d74',
  },
  ':focus': {
    borderColor: '#122b40',
  },
})

export const Image = styled.img(
  {
    border: '0',
    verticalAlign: 'middle',
  },
  propStyles({
    responsive: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
    },
    rounded: {
      borderRadius: '6px',
    },
  }),
)

export const Anchor = styled.a({
  color: '#337ab7',
  textDecoration: 'none',
  '&:active,&:hover': {
    outline: 0,
  },
  '&:hover,&:focus': {
    color: '#23527c',
    textDecoration: 'underline',
  },
  ':focus': {
    outline: '5px auto -webkit-focus-ring-color',
    outlineOffset: '-2px',
  },
})

/**
 * Makes it easier to create an emotion component which
 * accepts props to enable/disable certain styles.
 *
 * accepts an object where the key is a prop and the value
 * is the styles that should be applied if that prop is
 * passed. Returns a function which you pass to a
 * emotionComponentFactory.
 *
 * @param {Object} styles The prop to styles object
 * @return {Function} the dynamic styles function
 */
function propStyles(styles) {
  return function dynamicStyles(props) {
    return Object.keys(props).map(key => {
      if (props[key]) {
        return typeof styles[key] === 'function'
          ? styles[key](props)
          : styles[key]
      }
      return null
    })
  }
}
