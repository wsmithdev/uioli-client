import { useState, useEffect } from "react";
// Components
import JoblyApi from "../api";
import Loading from "./Loading";
import JobCard from "./JobCard";
// Context
import UserContext from "../UserContext";
import { useContext } from "react";

const Jobs = ({ apply }) => {
  const user = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getJobsData = async () => {
      try {
        const res = await JoblyApi.getAllJobs();
        setJobs(res);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getJobsData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <ul>
        {jobs.map((job, idx) => {
          return (
            <JobCard
              user={user}
              key={idx}
              job={job}
              apply={(id) => apply(id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Jobs;
