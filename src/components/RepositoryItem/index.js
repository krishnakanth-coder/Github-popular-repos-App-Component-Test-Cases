import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepo
  return (
    <>
      <li className="repo-card">
        <img src={avatarUrl} alt={name} className="avatar-url" />
        <h1 className="card-header">{name}</h1>
        <div className="logo-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
            className="logo-image"
          />
          <p>{issuesCount}</p>
        </div>
        <div className="logo-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
            className="logo-image"
          />
          <p>{forksCount}</p>
        </div>
        <div className="logo-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
            className="logo-image"
          />
          <p>{starsCount}</p>
        </div>
      </li>
    </>
  )
}

export default RepositoryItem
