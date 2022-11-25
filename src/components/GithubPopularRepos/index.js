import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const ApiStatus = {
  initial: 'initial',
  pending: 'pending',
  success: 'success',
  failure: 'failure',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryItem: [],
    activeLanguageItem: languageFiltersData[0].id,
    repoStatus: ApiStatus.initial,
  }

  componentDidMount() {
    this.getPopularRepo()
  }

  getPopularRepo = async () => {
    const {activeLanguageItem} = this.state
    this.setState({repoStatus: ApiStatus.pending})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageItem}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.status === 401) {
      this.setState({repoStatus: ApiStatus.failure})
    } else {
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        id: eachItem.id,
      }))
      this.setState({
        repositoryItem: updatedData,
        repoStatus: ApiStatus.success,
      })
    }
  }

  renderRepoCardSuccess = () => {
    const {repositoryItem} = this.state
    return (
      <ul className="repository-card-container">
        {repositoryItem.map(eachRepo => (
          <RepositoryItem
            ApiStatus={ApiStatus}
            key={eachRepo.id}
            eachRepo={eachRepo}
          />
        ))}
      </ul>
    )
  }

  renderRepoCardApiFail = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="repo-failure-view"
      />
    </div>
  )

  renderRepoCardApiPending = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoStatusCard = () => {
    const {repoStatus} = this.state
    switch (repoStatus) {
      case ApiStatus.success:
        return this.renderRepoCardSuccess()
      case ApiStatus.pending:
        return this.renderRepoCardApiPending()
      default:
        return this.renderRepoCardApiFail()
    }
  }

  activeButton = id => {
    this.setState({activeLanguageItem: id}, this.getPopularRepo)
  }

  render() {
    const {activeLanguageItem} = this.state

    return (
      <div className="github-repo-app">
        <h1 className="header">Popular</h1>
        <div className="github-repo-all-cards-container">
          <ul className="languages-list-container">
            {languageFiltersData.map(eachLanguageItem => (
              <LanguageFilterItem
                eachLanguageItem={eachLanguageItem}
                key={eachLanguageItem.id}
                activeLanguageItem={activeLanguageItem}
                activeButton={this.activeButton}
              />
            ))}
          </ul>
        </div>
        {this.renderRepoStatusCard()}
      </div>
    )
  }
}

export default GithubPopularRepos
