import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstaint = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class Profile extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstaint.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstaint.loading})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedDetails,
        apiStatus: apiStatusConstaint.success,
      })
    } else if (response.status_code === 401) {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <p className="rahul">{name}</p>
        <p className="rahul-para">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="divvvv">
      <button onClick={this.getProfileDetails} className="retry" type="button">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container loading" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstaint.success:
        return this.renderProfile()
      case apiStatusConstaint.failure:
        return this.renderProfileFailure()
      case apiStatusConstaint.loading:
        return this.renderLoading()
      default:
        return null
    }
  }
}
export default Profile
