function Projects() {
  const projects = [
    {
      id: 1,
      title: 'AI Research',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Medical Data Analysis',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Climate Research',
      status: 'Pending'
    }
  ];

  return (
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        Research Projects
      </h1>

      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow:
                '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h3>
              {project.title}
            </h3>

            <p>
              Status:
              {' '}
              {project.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;