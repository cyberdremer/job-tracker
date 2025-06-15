import { Heading, Tooltip } from "@chakra-ui/react";

import {
  PieChart,
  BarChart,
  ResponsiveContainer,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Rectangle,
  Text,
  Sankey,
} from "recharts";

const getStatusCounts = (jobEntries) => {
  const counts = {};
  jobEntries.forEach((entry) => {
    counts[entry.status] = (counts[entry.status] || 0) + 1;
  });
  return Object.entries(counts).map(([status, count]) => ({
    status,
    count,
  }));
};
const JobEntryBarChart = ({ jobEntries }) => {
  const data = getStatusCounts(jobEntries);
  if (!data.length)
    return (
      <>
        <Heading>No Data To Display!</Heading>
      </>
    );
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
          <XAxis dataKey="status"></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend></Legend>
          <Bar dataKey="count" fill="none">
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLOR_MAP[entry.status.toUpperCase()]}
                ></Cell>
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];
const COLOR_MAP = {
  APPLYING: "blue",
  INTERVIEWING: "orange",
  REJECTED: "red",
  ACCEPTED: "green",
  CLOSED: "gray",
  AWAITING: "purple",
  APPLIED: "teal",
};
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >{`${(percent * 100).toFixed(0)}%`}</text>
    </>
  );
};

const JobEntryPieChart = ({ jobEntries }) => {
  const data = getStatusCounts(jobEntries);
  if (!data.length) return <Heading>No Data To Display</Heading>;
  return (
    <>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart width={800} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            outerRadius={80}
            dataKey="count"
            nameKey="status"
          >
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLOR_MAP[entry.status.toUpperCase()]}
                ></Cell>
              );
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export { JobEntryBarChart, JobEntryPieChart };
