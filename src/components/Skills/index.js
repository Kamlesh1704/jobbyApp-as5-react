import './index.css'

const Skills = props => {
  const {details} = props
  const {imageUrl, name} = details
  return (
    <li className="listskills">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="name">{name}</h1>
    </li>
  )
}
export default Skills
