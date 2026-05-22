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
    <div
      style={{
        padding: '40px',

        background: '#f5f7fb',

        minHeight: '100vh'
      }}
    >
      <h1>
        Analytics Dashboard
      </h1>

      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
            'repeat(auto-fit, minmax(250px, 1fr))',

          gap: '20px',

          marginTop: '30px'
        }}
      >
        <div
          style={{
            background: 'white',

            padding: '25px',

            borderRadius: '12px'
          }}
        >
          <h2>
            Total Datasets
          </h2>

          <h1>
            {stats.totalDatasets}
          </h1>
        </div>

        <div
          style={{
            background: 'white',

            padding: '25px',

            borderRadius: '12px'
          }}
        >
          <h2>
            Total Users
          </h2>

          <h1>
            {stats.totalUsers}
          </h1>
        </div>

        <div
          style={{
            background: 'white',

            padding: '25px',

            borderRadius: '12px'
          }}
        >
          <h2>
            Categories
          </h2>

          <h1>
            {stats.totalCategories}
          </h1>
        </div>
      </div>

      <div
        style={{
          background: 'white',

          marginTop: '40px',

          padding: '30px',

          borderRadius: '12px',

          height: '400px'
        }}
      >
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

      <div
        style={{
          background: 'white',

          marginTop: '40px',

          padding: '30px',

          borderRadius: '12px'
        }}
      >
        <h2>
          Recent Uploads
        </h2>

        {stats.recentDatasets.map(
          (dataset) => (

          <div
            key={dataset.id}

            style={{
              padding: '15px 0',

              borderBottom:
                '1px solid #eee'
            }}
          >
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