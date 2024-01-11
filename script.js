    // Biến toàn cục để theo dõi tháng và năm hiện tại
    let currentMonth = 0;
    let currentYear = 0;

    // Biến toàn cục để theo dõi số lượng tháng được giảm đi
    let monthOffset = 0;

    // Danh sách các ngày cần bôi màu (định dạng: "YYYY-MM-DD")
    const highlightedDates = [
        "2023-07-20",
        "2023-07-21",
        "2023-07-22",
        "2023-07-23",
        "2023-07-24",
        "2023-07-25",
        "2023-07-26",
        "2023-07-27",
        "2023-07-29",
        "2023-07-31",
        "2023-08-01",
        "2023-08-02",
        "2023-08-04",
        "2023-08-05",
        "2023-08-06",
        "2023-08-07",
        "2023-08-09",
        "2023-08-11",
        "2023-08-13",
        "2023-08-18",
        "2023-08-20",
        "2023-08-25",
        "2023-08-26",
        "2023-08-27",
        "2023-09-01",
        "2023-09-02",
        "2023-09-03",
        "2023-09-04",
        "2023-09-05",
    ];
    const highlighted = [
        "2023-07-30",
        "2023-08-08",
        "2023-08-12",
        "2023-08-14",
    
        "2023-08-16",
        "2023-08-19",
        "2023-08-21",
        "2023-08-22",
        "2023-08-23",
        "2023-08-28",
        "2023-08-29",
        "2023-08-30",

    ];
    const highlightedlunar = [
        "08-02",
        "08-04",
        "10-01",

    ];
    const highlightedluong = [
        "2023-08-07",
        "2023-09-07",

    ];

    // Hàm kiểm tra năm nhuận
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function jdFromDate(dd, mm, yy) {
        var a, y, m, jd;
        a = Math.floor((14 - mm) / 12);
        y = yy + 4800 - a;
        m = mm + 12 * a - 3;
        jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        if (jd < 2299161) {
            jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
        }
        return jd;
    }

    function NewMoon(k) {
        var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
        T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
        T2 = T * T;
        T3 = T2 * T;
        dr = Math.PI / 180;
        Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
        Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
        M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
        Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
        F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
        C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
        C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
        if (T < -11) {
            deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
        } else {
            deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
        }
        JdNew = Jd1 + C1 - deltat;
        return JdNew;
    }

    function SunLongitude(jdn) {
        var T, T2, dr, M, L0, DL, L;
        T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
        T2 = T * T;
        dr = Math.PI / 180; // degree to radian
        M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
        L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
        DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
        L = L0 + DL; // true longitude, degree
        L = L * dr;
        L = L - Math.PI * 2 * (Math.floor(L / (Math.PI * 2))); // Normalize to (0, 2*PI)
        return L;
    }

    function getSunLongitude(dayNumber, timeZone) {
        return Math.floor(SunLongitude(dayNumber - 0.5 - timeZone / 24) / Math.PI * 6);
    }

    function getNewMoonDay(k, timeZone) {
        return Math.floor(NewMoon(k) + 0.5 + timeZone / 24);
    }

    function getLunarMonth11(yy, timeZone) {
        var k, off, nm, sunLong;
        //off = jdFromDate(31, 12, yy) - 2415021.076998695;
        off = jdFromDate(31, 12, yy) - 2415021;
        k = Math.floor(off / 29.530588853);
        nm = getNewMoonDay(k, timeZone);
        sunLong = getSunLongitude(nm, timeZone); // sun longitude at local midnight
        if (sunLong >= 9) {
            nm = getNewMoonDay(k - 1, timeZone);
        }
        return nm;
    }

    function getLeapMonthOffset(a11, timeZone) {
        var k, last, arc, i;
        k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        last = 0;
        i = 1; // We start with the month following lunar month 11
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
        do {
            last = arc;
            i++;
            arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
        } while (arc != last && i < 14);
        return i - 1;
    }

    function convertSolar2Lunar(dd, mm, yy, timeZone) {
        var k, dayNumber, monthStart, a11, b11, lunarDay, lunarMonth, lunarYear, lunarLeap;
        dayNumber = jdFromDate(dd, mm, yy);
        k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
        monthStart = getNewMoonDay(k + 1, timeZone);
        if (monthStart > dayNumber) {
            monthStart = getNewMoonDay(k, timeZone);
        }
        //alert(dayNumber+" -> "+monthStart);
        a11 = getLunarMonth11(yy, timeZone);
        b11 = a11;
        if (a11 >= monthStart) {
            lunarYear = yy;
            a11 = getLunarMonth11(yy - 1, timeZone);
        } else {
            lunarYear = yy + 1;
            b11 = getLunarMonth11(yy + 1, timeZone);
        }
        lunarDay = dayNumber - monthStart + 1;
        diff = Math.floor((monthStart - a11) / 29);
        lunarLeap = 0;
        lunarMonth = diff + 11;
        if (b11 - a11 > 365) {
            leapMonthDiff = getLeapMonthOffset(a11, timeZone);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff == leapMonthDiff) {
                    lunarLeap = 1;
                }
            }
        }
        if (lunarMonth > 12) {
            lunarMonth = lunarMonth - 12;
        }
        if (lunarMonth >= 11 && diff < 4) {
            lunarYear -= 1;
        }
        return new Array(lunarDay, lunarMonth, lunarYear, lunarLeap);
    }

    function isFirstDayOfMonth(date, month, year, timeZone) {
        const lunarDate = convertSolar2Lunar(date, month + 1, year, timeZone);
        return lunarDate[0] === 1;
    }
    
    function isFullMoonDay(date, month, year, timeZone) {
        const lunarDate = convertSolar2Lunar(date, month + 1, year, timeZone);
        return lunarDate[0] === 15;
    }

    // Hàm tạo bảng lịch
    function createCalendar() {
        const calendarContainer = document.getElementById("calendar");
        const today = new Date();
        let year = today.getFullYear() + Math.floor((monthOffset+today.getMonth()) / 12);
        let month = (today.getMonth() + monthOffset) % 12;

        // Kiểm tra nếu tháng hoặc năm bị quay lại năm hoặc năm tiếp theo
        if (month < 0) {
            month += 12;
        } else if (month > 11) {
            month -= 12;
        }

        const months = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ];

        const daysInMonth = [
            31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];

        const firstDayOfMonth = new Date(year, month, 1);
        let startingDay = firstDayOfMonth.getDay();

        // Điều chỉnh ngày bắt đầu của bảng lịch để ngày 1 bắt đầu từ thứ Hai
        startingDay = (startingDay === 0) ? 6 : startingDay - 1;

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Tạo tiêu đề cho bảng lịch
        const headerRow = document.createElement("tr");
        const monthHeader = document.createElement("th");
        monthHeader.colSpan = 7;
        monthHeader.textContent = months[month] + " " + year;
        headerRow.appendChild(monthHeader);
        thead.appendChild(headerRow);

        // Tạo tiêu đề cho các ngày trong tuần
        const daysHeaderRow = document.createElement("tr");
        const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
        for (const day of days) {
            const dayHeader = document.createElement("th");
            dayHeader.textContent = day;
            daysHeaderRow.appendChild(dayHeader);
        }
        thead.appendChild(daysHeaderRow);

        // Thêm dữ liệu cho bảng lịch
        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startingDay) {
                    const emptyCell = document.createElement("td");
                    row.appendChild(emptyCell);
                } else if (date > daysInMonth[month]) {
                    break;
                } else {
                    // Tính toán lịch âm
                    const lunarDate = convertSolar2Lunar(date, month + 1, year, 7.0);

                    // Tạo ô cho lịch dương
                    const cell = document.createElement("td");
                    cell.textContent = date;
                    if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
                        cell.classList.add("today");
                    }

                    // Tạo ô cho lịch âm
                    const lunarCell = document.createElement("div");
                    lunarCell.classList.add("lunar-date");
                    lunarCell.textContent = lunarDate[0] + "/" + lunarDate[1]/* + " " + lunarDate.year*/;

                    // Bổ sung ô của lịch âm vào ô của lịch dương
                    cell.appendChild(lunarCell);

                    // Kiểm tra xem ngày hiện tại có nằm trong danh sách các ngày cần bôi màu không
                    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    if (highlightedDates.includes(formattedDate)) {
                        cell.classList.add("highlighted");
                    }
                    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    if (highlighted.includes(formatted)) {
                        cell.classList.add("highligh");
                    }
                    // Kiểm tra xem ngày hiện tại có nằm trong danh sách các ngày cần bôi màu không
                    const isFirstDay = isFirstDayOfMonth(date, month, year, 7.0);
                    const isFullMoon = isFullMoonDay(date, month, year, 7.0);
                    const lunarFormatted = `${String(lunarDate[1]).padStart(2, '0')}-${String(lunarDate[0]).padStart(2, '0')}`;
                    if (isFirstDay || isFullMoon || highlightedlunar.includes(lunarFormatted)) {
                        lunarCell.classList.add("highlighlunar");
                    }
                    if ( highlightedlunar.includes(lunarFormatted) ) {
                        lunarCell.classList.add("highlighgio");
                        lunarCell.textContent = lunarDate[0] + "/" + lunarDate[1] + "(Giỗ)";
                    }
                    if ( highlightedluong.includes(formatted) ) {
                        cell.classList.add("highlighluong");
                    }
                    row.appendChild(cell);
                    date++;
                }
                
            }
            tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        // Xóa nội dung cũ và thêm bảng lịch mới vào container
        calendarContainer.innerHTML = '';
        calendarContainer.appendChild(table);

        // Cập nhật biến toàn cục để theo dõi tháng và năm hiện tại
        currentMonth = month;
        currentYear = year;
    }

    // Hàm chuyển đến tháng trước
    function prevMonth() {
        monthOffset--;
        createCalendar();
    }

    // Hàm chuyển đến tháng sau
    function nextMonth() {
        monthOffset++;
        createCalendar();
    }

    // Gọi hàm tạo bảng lịch khi trang web được tải
    document.addEventListener("DOMContentLoaded", createCalendar);


//Gpa
const signInButton = document.querySelector(".signIn button");
function Gpa(){
    let tinchi = document.getElementById('Tinchi').value;
    let diemcu = document.getElementById('Diemcu').value;
    let diemmoi = document.getElementById('Diemmoi').value;
    let tctl = document.getElementById('Tctl').value;
    let gpa = document.getElementById('Gpa').value;

    tinchi = parseFloat(tinchi.replace(',', '.')) || 0;
    diemcu = parseFloat(diemcu.replace(',', '.')) || 0;
    diemmoi = parseFloat(diemmoi.replace(',', '.')) || 0;
    tctl = parseFloat(tctl.replace(',', '.')) || 0;
    gpa = parseFloat(gpa.replace(',', '.')) || 0;

    let result = (diemmoi - diemcu) * tinchi / tctl + gpa;
    let tang = (diemmoi - diemcu) * tinchi / tctl ;
    alert("Gpa mới là: " + result +" Gpa tăng lên là: " +tang);
}

function Tkb(){
    var tkbElement = document.getElementById("tkb");
    var calendaElement = document.getElementById("calenda");
    var gpaElement = document.getElementById("login");
    tkbElement.style.display = "block";
    calendaElement.style.display = "none";
    gpaElement.style.display = "none";
}
function Calenda(){
    var tkbElement = document.getElementById("tkb");
    var calendaElement = document.getElementById("calenda");
    var gpaElement = document.getElementById("login");
    tkbElement.style.display = "none";
    calendaElement.style.display = "block";
    gpaElement.style.display = "none";
}
function gpa(){
    var tkbElement = document.getElementById("tkb");
    var calendaElement = document.getElementById("calenda");
    var gpaElement = document.getElementById("login");
    tkbElement.style.display = "none";
    calendaElement.style.display = "none";
    gpaElement.style.display = "block";
}