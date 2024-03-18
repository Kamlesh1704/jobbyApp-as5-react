import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {FaShoppingBag, FaStar} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    title,
    location,
    rating,
    packagePerAnnum,
    jobDescription,
    employmentType,
  } = details
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-itemm">
        <div className="img-divm">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logom"
          />
          <div className="titleandstarm">
            <h1 className="titlem">{title}</h1>
            <div className="rating-starm">
              <FaStar />
              <p className="ratingm">{rating}</p>
            </div>
          </div>
        </div>
        <div className="div-2m">
          <div className="loc-divm">
            <IoLocationSharp />
            <p className="locationnm">{location}</p>
          </div>
          <div className="type-divm">
            <FaShoppingBag />
            <p className="typeem">{employmentType}</p>
          </div>
          <p className="packagem">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="headingm">Description</h1>
        <p className="discriptionm">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
