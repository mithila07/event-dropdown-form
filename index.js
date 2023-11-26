const dropdown = document.querySelector('.dropdown__input');
const dropdownPanel = document.querySelector('.dropdown__panel');
const listOfOptions = document.getElementsByTagName('li');
const input = document.getElementById('searchEvent');

const toggleDropdown = (event) => {
    event.stopPropagation();
    dropdownPanel.classList.toggle('opened');
};

const selectOption = (event) => {
    const eventName = event.querySelector('.event-name').textContent;
    input.value += `${eventName}, `;
    dropdownPanel.classList.add('opened');
    updatePlaceholder();
};

document.addEventListener('click', function (event) {
    const closeDropdownFromOutside = dropdownPanel.contains(event.target);
    if (!closeDropdownFromOutside) {
        dropdownPanel.classList.remove('opened');
    }
});

dropdown.addEventListener('click', toggleDropdown);

for (const option of listOfOptions) {
    option.addEventListener('click', selectOption);
}

async function fetchEvents() {
    const response = await fetch(`events.json`);
    const data = await response.json();
    return data;
}

async function populateEventsList() {
    const eventsList = document.getElementById('eventDropdown');
    const data = await fetchEvents();

    for (const event of data) {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', event.id);
        listItem.innerHTML = `<span class="event-name">${event.name}</span><span class="event-date">${event.date}</span>`
        listItem.addEventListener('click', toggleSelection);
        eventsList.appendChild(listItem);
    };

    const listOfOptions = eventsList.getElementsByTagName('li');

    updatePlaceholder();
}

function getSelectedEvents() {
    var selectedEvents = [];
    var eventsList = document.getElementById('eventDropdown');
    var selectedItems = eventsList.querySelectorAll('.selected');

    selectedItems.forEach(item => {
        selectedEvents.push(item.getAttribute('data-id'));
    });

    return selectedEvents;
}

function submitForm() {
    var selectedEvents = getSelectedEvents();
    console.log('Selected Event IDs: ' + selectedEvents.join(','));
}

function filterEvents() {
    var input, filter, eventsList, items, item, i;
    input = document.getElementById('searchEvent');
    filter = input.value.toUpperCase();
    eventsList = document.getElementById('eventDropdown');
    items = eventsList.getElementsByTagName('li');

    for (i = 0; i < items.length; i++) {
        item = items[i];
        const eventText = item.textContent.toUpperCase();
        if (eventText.indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }

    updatePlaceholder();
}

function toggleSelection() {
    this.classList.toggle('selected');
    dropdownPanel.classList.add('opened');

    updatePlaceholder();
}

function updatePlaceholder() {
    var selectedEvents = getSelectedEvents();
    if (selectedEvents.length > 0) {
        input.placeholder = selectedEvents.length + ' items selected';
    } else {
        input.placeholder = 'Search events';
    }
}

populateEventsList();