const mapJobEntry = (job) => {
  return {
    title: job.title,
    dateapplied: new Date(job.dateapplied).toLocaleDateString(),
    id: job.id,
    salary: job.salary,
    location: job.location,
    status: job.status,
    company: job.company,
    link: job.link || ""
  };
};

export default mapJobEntry;
