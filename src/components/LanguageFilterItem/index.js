import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageItem, activeLanguageItem, activeButton} = props
  const {id, language} = eachLanguageItem
  const onClickActiveButton = () => {
    activeButton(id)
  }

  const buttonClass =
    id === activeLanguageItem ? 'active-button' : 'normal-button'
  return (
    <li>
      <button
        type="button"
        className={`${buttonClass} button`}
        onClick={onClickActiveButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
