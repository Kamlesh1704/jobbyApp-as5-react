import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoLocationSharp} from 'react-icons/io5'
import {FaShoppingBag, FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import Skills from '../Skills'
import Header from '../Header'
import LifeAtCompany from '../LifeAtCompany'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstaint = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    skillList: [],
    life: {},
    similarJobs: [],
    apiStatus: apiStatusConstaint.initial,
  }

  componentDidMount() {
    this.getListt()
  }

  getListt = async () => {
    this.setState({apiStatus: apiStatusConstaint.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchData = await response.json()
      const {job_details: data, similar_jobs: similarJobs} = fetchData
      const {skills, life_at_company: life} = data

      const updatedData = {
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        jobDescription: data.job_description,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        id: data.id,
        title: data.title,
      }

      const updatedSkills = skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      const updatedLife = {
        description: life.description,
        imageUrl: life.image_url,
      }

      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
      }))

      this.setState({
        jobData: updatedData,
        skillList: updatedSkills,
        life: updatedLife,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstaint.success,
      })
    } else if (response.status_code === 401) {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  renderDetails = () => {
    const {jobData, skillList, life, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData

    return (
      <>
        <Header />
        <div className="container">
          <div className="cardd">
            <div className="img-div">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="titleandstar">
                <h1 className="title">{title}</h1>
                <div className="ratingandstar">
                  <FaStar />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="div-2">
              <div className="loc-div">
                <IoLocationSharp />
                <p className="locationn">{location}</p>
              </div>
              <div className="type-div">
                <FaShoppingBag />
                <p className="typee">{employmentType}</p>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="descriptionandlink">
              <h1 className="heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="discription">{jobDescription}</p>
            <h1 className="skills">Skills</h1>
            <ul className="skilllist">
              {skillList.map(each => (
                <Skills details={each} key={each.name} />
              ))}
            </ul>
            <LifeAtCompany details={life} />
          </div>
          <h1 className="headingsimilar">Similar Jobs</h1>
          <ul className="similarlist">
            {similarJobs.map(eachJob => (
              <SimilarJobs details={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <div>
      <Header />
      <div className="d-i-v">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failureimg"
        />
        <h1 className="oo">Oops! Something Went Wrong</h1>
        <p className="wee">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-button" onClick={this.getListt} type="button">
          Retry
        </button>
      </div>
    </div>
  )

  renderLoading = () => (
    <>
      <Header />
      <div className="d-i-v">
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstaint.success:
        return this.renderDetails()
      case apiStatusConstaint.failure:
        return this.renderFailure()
      case apiStatusConstaint.loading:
        return this.renderLoading()
      default:
        return null
    }
  }
}

export default JobItemDetails
