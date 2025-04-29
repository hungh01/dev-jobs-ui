'use client';
import { useContext } from "react";
import SearchSection from "./components/search-section";
import { ThemeModeContext } from "./providers";
import JobsResult from "./components/jobs-result";
import { JobValue } from "./components/interface/job";
import searchJobs from "./components/actions/search-jobs";

export default function Home() {
  const { jobs, setJobs, loading, setLoading } = useContext(ThemeModeContext);
  return (
    <>
      <SearchSection />
      <JobsResult
        jobs={jobs as JobValue}
        onPageChange={async (newPage) => {
          if (jobs) {
            try {
              setLoading(true);
              const response = await searchJobs(
                jobs.keyword || "",
                jobs.location || "",
                newPage.toString(),
                jobs.pageSize ? jobs.pageSize.toString() : '5',
              );
              setJobs(response);
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          } else {
            throw new Error("Jobs data is not available");
          }
        }}
        loading={loading}
      />
    </>
  );
}

