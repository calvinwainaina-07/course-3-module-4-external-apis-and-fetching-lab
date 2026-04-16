// Selecting DOM elements
const stateInput = document.querySelector('#state-input');
const getAlertsBtn = document.querySelector('#get-alerts-btn');
const alertsContainer = document.querySelector('#alerts-container');
const errorMessage = document.querySelector('#error-message');

// Task 2, Step 1: Fetch Alerts
async function fetchWeatherAlerts(state) {
    // CORRECTED URL: Added api., the correct path, and the $ sign
    const url = `https://api.weather.gov/alerts/active?area=${state}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather alerts. Please check the state code.');
        }

        const data = await response.json();
        displayAlerts(data, state);
        
        // Task 2, Step 4: Clear errors on success
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

    } catch (error) {
        // Task 2, Step 4: Handle errors
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
        alertsContainer.innerHTML = ''; 
    }
}

// Task 2, Step 2: Display Alerts
function displayAlerts(data, state) {
    const features = data.features;
    const count = features.length;
    
    // Clear previous results (Task 2, Step 3)
    alertsContainer.innerHTML = '';

    // Create Summary Header
    const summary = document.createElement('h2');
    summary.textContent = `Current watches, warnings, and advisories for ${state}: ${count}`;
    alertsContainer.appendChild(summary);

    // Create List of Headlines
    const list = document.createElement('ul');
    features.forEach(alert => {
        const listItem = document.createElement('li');
        listItem.textContent = alert.properties.headline;
        list.appendChild(listItem);
    });
    
    alertsContainer.appendChild(list);
}

// Event Listener for the Button
getAlertsBtn.addEventListener('click', () => {
    const state = stateInput.value.trim().toUpperCase();

    if (!state) {
        errorMessage.textContent = "Please enter a state abbreviation.";
        errorMessage.style.display = 'block';
        return;
    }

    fetchWeatherAlerts(state);
    
    // Task 2, Step 3: Clear input field
    stateInput.value = '';
});
