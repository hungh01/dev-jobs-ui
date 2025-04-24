'use client';
import { useContext } from "react";
import SearchSection from "./components/search-section";
import { ThemeModeContext } from "./providers";
import JobsResult from "./components/jobs-result";
import { JobValue } from "./components/interface/job";

export default function Home() {
  const { jobs } = useContext(ThemeModeContext);
  return (
    <>
      <SearchSection />
      <JobsResult jobs={jobs as JobValue[]} />
    </>
  );
}

