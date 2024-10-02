export const About = () => {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-md border shadow-md border-space dark:border-offwhite">
      <h2 className="text-xl font-bold text-center">About</h2>
      <div>
        <p>
          Pantheon is a unified tool for Develop for Good staff, volunteers,
          clients, and industry mentors. Currently, the primary value
          proposition of the product is to streamline the process of onboarding
          volunteers, however, in the future, tools which take advantage of
          modern technology such as AI will become available for volunteers and
          clients alike.
        </p>
        <br />
        <div>
          Some of the things you can do here are:
          <ul className="ml-4 list-disc">
            <li>
              Visualizing analytics information about volunteers which can
              reveal insights about demographics, experience, etc.
            </li>
            <li>
              Downloading information about volunteers into portable formats
              such as JSON and TSV
            </li>
            <li>Exporting volunteers to Google Workspace</li>
          </ul>
        </div>
        <br />
        <div>
          More features are planned for the future, such as:
          <ul className="ml-4 list-disc">
            <li>Easy offboarding of volunteers</li>
            <li>
              Automatically adding volunteers to Slack channels, Notion groups,
              and Figma teams
            </li>
            <li>Enhancing the analytics information provided</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
