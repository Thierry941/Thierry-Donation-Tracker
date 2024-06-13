// script.js
document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');
    const donationList = document.getElementById('donationList');

    // Load donations from local storage
    let donations = JSON.parse(localStorage.getItem('donations')) || [];

    // Function to save donations to local storage
    function saveDonations() {
        localStorage.setItem('donations', JSON.stringify(donations));
    }

    // Function to display donations
    function displayDonations() {
        donationList.innerHTML = ''; // Clear existing list
        donations.forEach((donation, index) => {
            const donationItem = document.createElement('div');
            donationItem.classList.add('donation');
            donationItem.innerHTML = `
                <strong>${donation.name}</strong>: $${donation.amount}
                <div>
                    <button class="editBtn" data-index="${index}">Edit</button>
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                </div>
            `;
            donationList.appendChild(donationItem);
        });
    }

    // Function to add a new donation
    function addDonation(name, amount) {
        donations.push({ name, amount });
        saveDonations();
        displayDonations();
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        const donorName = document.getElementById('donorName').value;
        const donationAmount = parseFloat(document.getElementById('donationAmount').value);
        if (donorName && donationAmount) {
            addDonation(donorName, donationAmount);
            donationForm.reset();
        } else {
            alert('Please enter both donor name and donation amount.');
        }
    }

    // Function to delete a donation
    function deleteDonation(index) {
        donations.splice(index, 1);
        saveDonations();
        displayDonations();
    }

    // Function to edit a donation
    function editDonation(index) {
        const donation = donations[index];
        const newName = prompt('Enter new donor name:', donation.name);
        const newAmount = parseFloat(prompt('Enter new donation amount:', donation.amount));
        if (newName && !isNaN(newAmount)) {
            donations[index].name = newName;
            donations[index].amount = newAmount;
            saveDonations();
            displayDonations();
        } else {
            alert('Invalid input. Please try again.');
        }
    }

    // Event listener for form submission
    donationForm.addEventListener('submit', handleSubmit);

    // Event listener for delete and edit buttons
    donationList.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('deleteBtn')) {
            deleteDonation(index);
        } else if (event.target.classList.contains('editBtn')) {
            editDonation(index);
        }
    });

    // Initial display of donations
    displayDonations();
});
