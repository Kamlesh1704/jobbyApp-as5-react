import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-div">
      <div className="div-1">
        <h1 className="heading">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="para">
          Millions of people are searching for jobs,salary <br />
          information,company reviews ,Find the job that fits your <br />
          abilities and potential
        </p>
        <Link to="/jobs">
          <button type="button" className="find-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
