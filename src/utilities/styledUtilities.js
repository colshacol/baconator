import getValue from 'getValue'

export const fromTheme = (lookupPath) => (props) => {
  const value = getValue(props.theme, lookupPath)
  !value && console.warn(`\n\nfromTheme: ${lookupPath} not found in theme`)
  return value
}
