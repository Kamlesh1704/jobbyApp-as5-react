import './index.css'

const LifeAtCompany = props => {
  const {details} = props
  const {imageUrl, description} = details
  return (
    <>
      <h1 className="heading">Life at Company</h1>
      <div className="lifeat">
        <p className="description">{description}</p>
        <img src={imageUrl} alt="life at company" className="image-life" />
      </div>
    </>
  )
}
export default LifeAtCompany
