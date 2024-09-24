$(document).ready(function () {
    // Initialize the chart variable
    let myPieChart;

    $('#HomePage .progressBtn').click(function () {
        $('#chart').css("display", "flex");

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const taskLabels = tasks.map(task => task.taskName);
        const taskDurations = tasks.map(task => {
            if (task.time && typeof task.time === 'string' && task.time.includes(':')) {
                const time = task.time.split(":");
                return parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
            } else {
                // If the time is invalid or undefined, default to 0 seconds
                console.warn(`Invalid time format for task "${task.taskName}", setting duration to 0 seconds.`);
                return 0;
            }
        });

        const chartData = {
            labels: taskLabels,
            datasets: [{
                label: 'Task Duration (seconds)',
                data: taskDurations,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // Destroy the previous chart instance if it exists
        if (myPieChart) {
            myPieChart.destroy();
        }

        // Create and display the new chart
        const ctx = document.getElementById('myPieChart').getContext('2d');
        myPieChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    });
});
