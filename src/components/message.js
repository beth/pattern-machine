export function Message({showMessage}) {
  return <div className={`message ${showMessage ? 'slideright' : 'slideleft'}`}>Pattern Copied!</div>
}