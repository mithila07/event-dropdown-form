const dropdown = document.querySelector('.dropdown__input');
const dropdownPanel = document.querySelector('.dropdown__panel');
const listOfOptions = document.getElementsByTagName('li');
const input = document.getElementById('searchEvent');

const toggleDropdown = (event) => {
    event.stopPropagation();
    dropdownPanel.classList.toggle('opened');
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
