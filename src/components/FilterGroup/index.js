import './index.css'

const FilterGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    updateTypeFilter,
    updateSalaryFilter,
  } = props

  const onclikedType = employmentTypeId => {
    updateTypeFilter(employmentTypeId)
  }

  const onclikedRange = salaryRangeId => {
    updateSalaryFilter(salaryRangeId)
  }

  return (
    <div className="divvv">
      <p className="type">Type of Employment</p>
      <ul>
        {employmentTypesList.map(each => (
          <li className="label-div" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              onChange={() => onclikedType(each.employmentTypeId)}
            />
            <label htmlFor={each.employmentTypeId} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr />
      <p>Salary Range</p>
      <ul>
        {salaryRangesList.map(each => (
          <li className="label-div-2" key={each.salaryRangeId}>
            <input
              type="checkbox"
              id={each.salaryRangeId}
              onChange={() => onclikedRange(each.salaryRangeId)}
            />
            <label htmlFor={each.salaryRangeId} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FilterGroup
