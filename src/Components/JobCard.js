import { Card, Button } from "react-bootstrap";
import "./Styles/JobCard.css";

const JobCard = ({ user, job, apply }) => {
  if (!job) return <h1>Loading card</h1>;

  const applied = user.applications.includes(job.id);

  return (
    <div className="job-card-main">
      <Card
        className="mb-2"
        text="white"
        bg="dark"
        style={{ width: "50rem", marginTop: "1rem" }}
      >
        <Card.Header style={{ backgroundColor: "rgb(146,146,146)" }}>
          {job.title}
        </Card.Header>
        <Card.Body>
          <Card.Title>{job.companyName}</Card.Title>
          <Card.Text>
            Salary: ${job.salary}
            <br />
            Equity: {job.equity ? job.equity : "N/A"}
          </Card.Text>
          <Button
            disabled={applied}
            onClick={() => apply(job.id)}
            variant="outline-light"
          >
            {applied ? "Applied" : "Apply"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobCard;
