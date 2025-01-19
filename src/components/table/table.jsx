/* eslint-disable react/prop-types */
function Table({ currentProjects }) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {currentProjects?.map((project) => (
          <tr key={project["s.no"]}>
            <td>{project["s.no"]}</td>
            <td>{project["percentage.funded"]}</td>
            <td>{project["amt.pledged"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
