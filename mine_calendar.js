$(document).ready(function () {
    initial_set_up();
    change_month();
});

// globals
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var d = new Date();
var current_month = d.getMonth();
var current_year = d.getFullYear();

function initial_set_up() {
    var selected_month = $('#selected_month');

    var current_month_and_year = months[current_month] + ' ' + current_year;

    selected_month.html(current_month_and_year);

    load_days_of_month(current_year, current_month);
}

function change_month() {
    var back = $('#month_back');
    var forward = $('#month_forward');

    var selected_month = $('#selected_month');

    back.on('click', function (event) {
        event.preventDefault();
        current_month -= 1;

        if(current_month == -1)
        {
            current_month = 11;
            current_year -= 1;
        }

        var current_month_and_year = months[current_month] + ' ' + current_year;
        selected_month.html(current_month_and_year);
        load_days_of_month(current_year, current_month);
    });

    forward.on('click', function (event) {
        event.preventDefault();
        current_month += 1;

        if(current_month == 12)
        {
            current_month = 0;
            current_year += 1;
        }

        var current_month_and_year = months[current_month] + ' ' + current_year;
        selected_month.html(current_month_and_year);
        load_days_of_month(current_year, current_month);
    });
}

function load_days_of_month(year, month) {
    var firstDay = new Date(year, month, 1).getDay();

    var days_in_current_month = daysInMonth(month, year);
    var days_in_last_month = daysInMonth(month - 1, year);
    var day_counter = 1;
    var current_day_counter = 1;
    var reverse_day_counter = 1;
    var number_of_rows = 0;
    var days = [];
    var table_body = $('#calendar_body');
    var table_body_content = '';

    if(firstDay == 0 && month != 1)
    {
        number_of_rows = 6;
    }
    else if(firstDay == 1 && month == 1)
    {
        number_of_rows = 4;
    }
    else{
        number_of_rows = 5;
    }

    if(firstDay == 0)
    {
        firstDay = 7;
    }

    for(var i = 1; i <= number_of_rows * 7; i++)
    {
        if(i < firstDay)
        {
            var day_number_1 = daysInMonth(month - 1, year) - (firstDay - 1) + reverse_day_counter;
            var day_date_1 = new Date(year, month - 1, days_in_last_month - (firstDay - 1) + reverse_day_counter);
            days.push([day_number_1, day_date_1, false]);
            reverse_day_counter += 1;
        }
        else if(i >= days_in_current_month + firstDay)
        {
            var day_number_2 = day_counter;
            var day_date_2 = new Date(year, month + 1, day_counter);
            days.push([day_number_2, day_date_2, false]);
            day_counter += 1;
        }
        else{
            var day_number_3 = new Date(year, month, current_day_counter).getDate();
            var date_number_3 = new Date(year, month, current_day_counter);
            days.push([day_number_3, date_number_3, true]);
            current_day_counter += 1;
        }
    }

    style_days_and_add_content(table_body_content, days, table_body, number_of_rows);

}

function style_days_and_add_content(table_body_content, days, table_body, number_of_rows)
{
    var counter = 0;

    for(var j = 0; j < number_of_rows; j++)
    {
        table_body_content += '<tr>';

        for(var k = 0; k < 7; k++)
        {
            if(days[counter][1].toDateString() == new Date().toDateString())
            {
                table_body_content += '<td  class="current-day" data="' + days[counter][1] +'">' + days[counter][0] + '</td>';
                counter += 1;
            }
            else if(!days[counter][2])
            {
                table_body_content += '<td class="not-current-month-days" data="' + days[counter][1] +'">' + days[counter][0] + '</td>';
                counter += 1;
            }
            else{
                table_body_content += '<td class="current-month-days" data="' + days[counter][1] +'">' + days[counter][0] + '</td>';
                counter += 1;
            }
        }

        table_body_content += '</tr>';
    }

    table_body.html(table_body_content);
}

function daysInMonth(month,year) {
    return new Date(year, month + 1, 0).getDate();
}

