import { Helmet } from "react-helmet-async";

const SEOComponent = () => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Sprintify HQ - The Ultimate Agile Sprint & Product Management Tool</title>
      <meta name="description" content="Manage your product sprints, prioritize features, track bugs, and optimize product strategy with Sprintify HQ. Plan, execute, and analyze sprints seamlessly." />
      <meta name="keywords" content="AARRR metrics, sprint simulator, brainstorming, feature prioritization, product goals, product strategy, roadmapping, user research, PRD, market research, bug tracking, epics, user stories, cohort analysis, launch checklist, burndown chart, agile planning, backlog grooming, MVP validation, sprint retrospective, agile execution, agile roadmap, sprint backlog, velocity tracking, lean startup" />
      <meta name="author" content="Sprintify HQ" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Meta Tags (For Social Media) */}
      <meta property="og:title" content="Sprintify HQ - The Ultimate Agile Sprint & Product Management Tool" />
      <meta property="og:description" content="Optimize sprint planning, backlog prioritization, roadmapping, and product execution with Sprintify HQ." />
      <meta property="og:image" content="https://sprintifyhq.com/og-image.jpg" />
      <meta property="og:url" content="https://sprintifyhq.com" />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sprintify HQ - The Ultimate Agile Sprint & Product Management Tool" />
      <meta name="twitter:description" content="Plan and optimize sprints, prioritize features, track bugs, and execute a winning product strategy." />
      <meta name="twitter:image" content="https://sprintifyhq.com/twitter-image.jpg" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#007bff" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  );
};

export default SEOComponent;
