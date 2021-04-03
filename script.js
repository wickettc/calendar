const table = document.querySelector('#cal-table');
const container = document.querySelector('.container');

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
    let cellCount = 0;
    let dayCount = 1;
    while (keepLoop) {
        let date = new Date(year, month, dayCount);
        if (date.getMonth() === curMonth) {
            if (cellCount === 0) {
                tBody.insertRow();
            }
            let lastRow = table.rows[table.rows.length - 1];
            let cell = lastRow.insertCell();
            cell.innerHTML = date.getDate();
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
    container.appendChild(table);
};

createCalendar(2021, 03);
