import { useRequestQuery } from "@/requests/generic";

import { Resume, ResumeResponse } from "@/interfaces/resume";
import { useState } from "react";
import { UIResponse } from "@/interfaces/ui";

const ResumeDashboard = () => {
  const [resume, setResumes] = useState<Resume[]>();
  const [responseError, setResponseError] = useState<UIResponse>();
  const [responseSuccess, setResponseSuccess] = useState<UIResponse>();
  const { data, error, isLoading } = useRequestQuery<ResumeResponse>(
    {
      url: "/",
      options: { method: "GET", mode: "cors", credentials: "include" },
    },
    "resumes"
  );
};
