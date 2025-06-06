const jobPostingPrompt = (jobDescription) => {
  return `Analyze the job description and pick out important information a jobseeker might need.

    Text: """
    Job Description: ${jobDescription} 
    """

    The response must be in JSON format which is an array of objects.
    the objects in the array will contain elements called title, salary, location and company.
    If the salary posted is a range, then take the lower bound of the range.
    
    `;
};


export default jobPostingPrompt
