import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components from Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Define your component
const BarChart = ({ chartData }) => {
    if (!chartData) {
        return <p>Loading chart data...</p>;
    }
    // 1. Define the data for the chart
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: chartData.datasetLabel || 'Data Series',
                data: chartData.values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for the bars
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // 2. Define the options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position the legend
            },
            title: {
                display: true,
                text: 'Desde anexo 2', // Chart title
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Start the Y-axis at zero
            },
        },
    };

    // 3. Render the Bar component
    return (
        <div style={{ width: '600px', height: '400px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;