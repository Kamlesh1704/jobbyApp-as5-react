import {IoLocationSharp} from 'react-icons/io5'

import {FaShoppingBag, FaStar} from 'react-icons/fa'

import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    rating,
    location,
    title,
    jobDescription,
    employmentType,
  } = details
  return (
    <li className="similar-card">
      <div className="imgandtitle">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logoo"
        />
        <div className="titleandrating">
          <h1>{title}</h1>
          <div className="star">
            <FaStar className="starr" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <p className="dheading">Description</p>
      <p className="discription">{jobDescription}</p>
      <div className="locc">
        <div className="loc-div">
          <IoLocationSharp className="starr" />
          <p>{location}</p>
        </div>
        <div className="type-div">
          <FaShoppingBag className="starr" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
