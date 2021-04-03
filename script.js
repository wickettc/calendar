const calendar = document.querySelector('#calendar');
const selYear = document.querySelector('#select-year');
const selMonth = document.querySelector('#select-month');

let highlightedDay;

for (let i = 1900; i < 2100; i++) {
    let opt = document.createElement('option');
    opt.text = i;
    opt.value = i;
    selYear.appendChild(opt);
}

const createCalendar = (year, month) => {
    let curMonth = new Date(year, month).getMonth();
    let table = document.createElement('table');
    let headerCount = 0;
    let header = table.createTHead();
    let row = header.insertRow();
    while (headerCount < 7) {
        let cell = row.insertCell();
        switch (headerCount) {
            case 0:
                cell.innerHTML = 'Sun';
                break;
            case 1:
                cell.innerHTML = 'Mon';
                break;
            case 2:
                cell.innerHTML = 'Tues';
                break;
            case 3:
                cell.innerHTML = 'Wed';
                break;
            case 4:
                cell.innerHTML = 'Thur';
                break;
            case 5:
                cell.innerHTML = 'Fri';
                break;
            case 6:
                cell.innerHTML = 'Sat';
                break;
            default:
                break;
        }
        headerCount++;
    }
    let tBody = table.createTBody();
    let keepLoop = true;
    let startCal = true;
    let cellCount = 0;
    let dayCount = 1;
    while (keepLoop) {
        let date = new Date(year, month, dayCount);
        if (date.getMonth() === curMonth) {
            if (cellCount === 0) {
                tBody.insertRow();
            }
            let lastRow = table.rows[table.rows.length - 1];
            // add blank cells to begining
            if (startCal && date.getDay() !== 0) {
                let addSpaces = date.getDay();
                for (let i = 0; i < addSpaces; i++) {
                    lastRow.insertCell();
                }
                startCal = false;
                cellCount = addSpaces;
            } else {
                startCal = false;
            }
            let cell = lastRow.insertCell();
            cell.innerHTML = date.getDate();
            cell.dataset.date = date;
            dayCount++;
            if (cellCount === 6) {
                cellCount = 0;
            } else {
                cellCount++;
            }
        } else {
            keepLoop = false;
        }
    }
    calendar.appendChild(table);
    addListenerToDays(calendar);
};

const removeOldCal = (par) => {
    while (par.firstChild) {
        par.removeChild(par.firstChild);
    }
};

const addListenerToDays = (table) => {
    let tds = document.querySelectorAll('td');
    tds.forEach((t) => {
        if (t.dataset.date) {
            t.classList.add('clickable');
            t.addEventListener('click', (e) => {
                highlightDay(e.target);
            });
        }
    });
};

const highlightDay = (day) => {
    if (highlightedDay) {
        highlightedDay.classList.remove('highlight');
    }
    highlightedDay = day;
    console.log(highlightedDay);
    day.classList.add('highlight');
};

let today = new Date();
selYear.value = today.getFullYear();
selMonth.value = today.getMonth();

window.onload = () => {
    createCalendar(today.getFullYear(), today.getMonth());
};

selYear.addEventListener('change', () => {
    removeOldCal(calendar);
    createCalendar(selYear.value, selMonth.value);
});

selMonth.addEventListener('change', () => {
    removeOldCal(calendar);
    createCalendar(selYear.value, selMonth.value);
});
