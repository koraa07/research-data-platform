import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Dashboard() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const response =
          await axios.get(
            'http://localhost:5000/api/dashboard/stats'
          );

        setStats(
          response.data.stats
        );

      } catch (error) {

        console.error(error);
      }
    };

  if (!stats) {

    return <h1>Loading...</h1>;
  }

  const user =
  JSON.parse(
    localStorage.getItem('user')
  );

  const chartData = [

    {
      name: 'Datasets',

      value:
        stats.totalDatasets
    },

    {
      name: 'Users',

      value:
        stats.totalUsers
    },

    {
      name: 'Categories',

      value:
        stats.totalCategories
    }
  ];

  return (
    <div className="page-content">
      <h1 className="page-title">Analytics Dashboard</h1>

      <div className="section-card-grid">
        <div className="stat-card">
          <h2>
            Total Datasets
          </h2>

          <h1>
            {stats.totalDatasets}
          </h1>
        </div>

        <div className="stat-card">
          <h2>
            Total Users
          </h2>

          <h1>
            {stats.totalUsers}
          </h1>
        </div>

        <div className="stat-card">
          <h2>
            Categories
          </h2>

          <h1>
            {stats.totalCategories}
          </h1>
        </div>
      </div>

      <div className="card">
        <div className="welcome-card">

  <h1 style={{ margin: 0 }}>
    Welcome back,
    {' '}
    {user?.username}
  </h1>

  <p>
    Manage datasets, collaborate on projects
    and explore research data.
  </p>
</div>
        <h2>
          Platform Statistics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={chartData}
          >
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2>
          Recent Uploads
        </h2>

        {stats.recentDatasets.map(
          (dataset) => (

          <div key={dataset.id} className="recent-item">
            <h3>
              {dataset.title}
            </h3>

            <p>
              {dataset.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;