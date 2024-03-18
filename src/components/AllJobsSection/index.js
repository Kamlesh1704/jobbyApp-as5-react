import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GoSearch} from 'react-icons/go'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'
import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstaint = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllJobsSection extends Component {
  state = {
    jobList: [],
    type: [],
    searchQuery: '',
    packagee: [],
    apiStatus: apiStatusConstaint.initial,
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    this.setState({apiStatus: apiStatusConstaint.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {type, searchQuery, packagee} = this.state
    const typeString = type.join(',')
    const packageeString = packagee.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeString}&minimum_package=${packageeString}&search=${searchQuery}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        id: each.id,
        rating: each.rating,
        location: each.location,
        title: each.title,
      }))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstaint.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  renderingList = () => {
    const {jobList} = this.state
    return (
      <ul>
        {jobList.map(each => (
          <JobCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderNoJob = () => (
    <div className="no-job-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-img"
      />
      <h1 className="nojob">No Jobs Found</h1>
      <p className="no-job-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  updateTypeFilter = employmentTypeId => {
    const {type} = this.state
    if (type.includes(employmentTypeId)) {
      this.setState(
        prevState => ({
          type: prevState.type.filter(
            eachType => eachType !== employmentTypeId,
          ),
        }),
        () => {
          this.getJobList()
        },
      )
    } else {
      this.setState(
        prevState => ({
          type: [...prevState.type, employmentTypeId],
        }),
        () => {
          this.getJobList()
        },
      )
    }
  }

  updateSalaryFilter = salaryRangeId => {
    const {packagee} = this.state
    if (packagee.includes(salaryRangeId)) {
      this.setState(
        prevState => ({
          packagee: prevState.packagee.filter(each => each !== salaryRangeId),
        }),
        () => {
          this.getJobList()
        },
      )
    } else {
      this.setState(
        prevState => ({packagee: [...prevState.packagee, salaryRangeId]}),
        () => {
          this.getJobList()
        },
      )
    }
  }

  onTypeSearch = event => {
    this.setState({searchQuery: event.target.value})
  }

  onSearch = () => {
    this.getJobList()
    this.setState({searchQuery: ''})
  }

  renderList = () => {
    const {jobList} = this.state
    const lengthOfList = jobList.length
    return (
      <div className="class">
        <div>
          <div className="inputandseach">
            <label htmlFor="searchInput">Search:</label>
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onTypeSearch}
            />
            <button
              aria-label="close"
              type="button"
              onClick={this.onSearch}
              className="search-btn"
            >
              <GoSearch className="search" />
            </button>
          </div>
          {lengthOfList !== 0 && this.renderingList()}
          {lengthOfList === 0 && this.renderNoJob()}
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <div className="inputandseach">
        <input type="search" className="search-input" placeholder="Search" />
        <GoSearch className="search" />
      </div>
      <div className="div-failure">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failureimg"
        />
        <h1 className="oops">Oops! Something Went Wrong</h1>
        <p className="we">
          We cannot seem to find the page you are looking for
        </p>
        <button
          className="retry-button"
          type="button"
          onClick={this.getJobList}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoading = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderJobListFunc = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstaint.success:
        return this.renderList()
      case apiStatusConstaint.failure:
        return this.renderFailure()
      case apiStatusConstaint.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="div-all-wala">
        <div className="profile-filter">
          <Profile />
          <div className="filtergrp">
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              updateSalaryFilter={this.updateSalaryFilter}
              updateTypeFilter={this.updateTypeFilter}
            />
          </div>
        </div>
        <div>{this.renderJobListFunc()}</div>
      </div>
    )
  }
}

export default AllJobsSection
