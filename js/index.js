$(document).ready(function() {
    // Initialize tasks and update task array
    updateTaskArray();
    loadAllTasks();

    // Open the chart
    $('#HomePage .progressBtn').click(function() {
        $('#chart').css("display", "flex");
    });

    // Close the chart
    $('#chart .btn-close').click(function() {
        $('#chart').css("display", "none");
    });

    // Add a new task
    $('#HomePage .taskSection button').click(function() {
        const task = $('#HomePage .taskSection input').val().trim();
        if (!task) {
            alert('Please enter a task!');
            return;
        }

        const taskList = $('#HomePage .taskSection .taskList');
        taskList.append(`
            <div class="taskCard d-flex w-100 justify-content-between">
                <h5 class="m-0">${task}</h5>
                <button class="bg-transparent w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                </button>
            </div>
        `);

        saveTask(task); // Save task to local storage
        $('#HomePage .taskSection input').val(''); // Clear input
    });

    // Select a task
    $('#HomePage .taskSection .taskList').on('click', '.taskCard', function() {
        $('#HomePage #taskName').text($(this).find('h5').text());
    });

    // Delete a task
    $('#HomePage .taskSection .taskList').on('click', '.taskCard button', function() {
        const taskCard = $(this).parent();
        const taskName = taskCard.find('h5').text();

        if ($('#HomePage #taskName').text() === taskName) {
            $('#HomePage #taskName').text('Click a task to focus on');
        }

        taskCard.remove();
        deleteTask(taskName); // Remove from local storage
    });

    // Timer functionality
    let hours = 0, minutes = 0, seconds = 0;
    let interval;

    $('#startBtn').click(function() {
        if ($('#taskName').text() === 'Click a task to focus on') {
            alert('Please select a task to focus on');
            return;
        }
        if (!interval) {
            interval = setInterval(updateStopwatch, 1000); // Updates every second
        }
    });

    function updateStopwatch() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }

    function updateDisplay() {
        $('#hours').text(formatTime(hours));
        $('#minutes').text(formatTime(minutes));
        $('#seconds').text(formatTime(seconds));
    }

    function formatTime(value) {
        return value < 10 ? '0' + value : value;
    }

    $('#stopBtn').click(function() {
        saveTimeAndTask();
        clearInterval(interval);
        interval = null;
        hours = 0;
        minutes = 0;
        seconds = 0;
        updateDisplay();
    });

    function saveTimeAndTask() {
        const taskName = $('#taskName').text();
        const time = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ taskName, time });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskArray() {
        const taskDate = JSON.parse(localStorage.getItem('taskDate')) || "";
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${day}/${month}/${year}`;

        if (taskDate !== currentDate) {
            localStorage.setItem('taskDate', JSON.stringify(currentDate));
            localStorage.setItem('tasks', JSON.stringify([]));
        }
    }

    function loadAllTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            $('#HomePage .taskSection .taskList').append(`
                <div class="taskCard d-flex w-100 justify-content-between">
                    <h5 class="m-0">${task.taskName}</h5>
                    <button class="bg-transparent w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                </button>
                </div>
            `);
        });
    }

    // Function to save tasks in local storage
    function saveTask(taskName) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ taskName });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to delete a task from local storage
    function deleteTask(taskName) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.taskName !== taskName);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
