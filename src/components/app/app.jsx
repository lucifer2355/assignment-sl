import { useEffect, useMemo, useState } from "react";
import { URLs } from "../../utils/urls";
import Pagination from "../pagination";
import Table from "../table";

function App() {
  //*  State */
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(URLs.API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(projects.length / itemsPerPage),
    [projects, itemsPerPage]
  );
  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage]
  );
  const currentProjects = useMemo(
    () => projects.slice(startIndex, startIndex + itemsPerPage),
    [projects, startIndex]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='project-container'>
      <h1 className='title'>Kickstarter Projects</h1>

      <Table currentProjects={currentProjects} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
