import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onclickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-div">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-img"
        />
      </Link>
      <ul className="links-div">
        <li className="homelink">
          <Link to="/" className="links">
            Home
          </Link>
        </li>
        <li className="homelink">
          <Link to="/jobs" className="links">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" onClick={onclickLogout} className="logout-button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
