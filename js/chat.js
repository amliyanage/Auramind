$(document).ready(function () {
    //console.log("Document is ready, initializing event listeners...");

    // Initialize the chart variable
    let myPieChart;

    $('#HomePage .progressBtn').click(function () {
        //console.log("Progress button clicked");
        $('#chart').css("display", "flex");
        //console.log("Chart container displayed");

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //console.log("Retrieved tasks from localStorage: ", tasks);

        const taskLabels = tasks.map(task => task.taskName);
        const taskDurations = tasks.map(task => {
            const time = task.time.split(":");
            return parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
        });

        //console.log("Task labels: ", taskLabels);
        //console.log("Task durations (in seconds): ", taskDurations);

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
            //console.log("Destroying previous chart instance...");
            myPieChart.destroy();
        }

        // Create and display the new chart
        const ctx = document.getElementById('myPieChart').getContext('2d');
        //console.log("Creating chart in canvas with ID 'myPieChart'");

        myPieChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });

        //console.log("Chart created successfully");
    });
});
