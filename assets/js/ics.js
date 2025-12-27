/* Simple ICS Generator */
var ics = function (uidDomain, prodId) {
    'use strict';
    if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
        console.log('Unsupported Browser'); return;
    }
    var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
    var calendarEvents = [];
    var calendarStart = ['BEGIN:VCALENDAR', 'PRODID:' + (prodId || 'Calendar'), 'VERSION:2.0', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:ActiveMission', 'X-WR-TIMEZONE:America/Phoenix'].join(SEPARATOR);
    var calendarEnd = SEPARATOR + 'END:VCALENDAR';
    return {
        addEvent: function (subject, description, location, begin, end) {
            var start_date = new Date(begin); var end_date = new Date(end);
            var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
            var start_month = ("00" + ((start_date.getMonth() + 1).toString())).slice(-2);
            var start_day = ("00" + ((start_date.getDate()).toString())).slice(-2);
            var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
            var end_month = ("00" + ((end_date.getMonth() + 1).toString())).slice(-2);
            var end_day = ("00" + ((end_date.getDate()).toString())).slice(-2);
            var start_time = start_year + start_month + start_day;
            var end_time = end_year + end_month + end_day;
            var calendarEvent = ['BEGIN:VEVENT', 'UID:' + calendarEvents.length + "@" + (uidDomain || 'localhost'), 'CLASS:PUBLIC', 'DESCRIPTION:' + description, 'DTSTART;VALUE=DATE:' + start_time, 'DTEND;VALUE=DATE:' + end_time, 'LOCATION:' + location, 'SUMMARY;LANGUAGE=en-us:' + subject, 'TRANSP:TRANSPARENT', 'END:VEVENT'].join(SEPARATOR);
            calendarEvents.push(calendarEvent);
            return calendarEvent;
        },
        download: function (filename, ext) {
            if (calendarEvents.length < 1) return false;
            ext = (typeof ext !== 'undefined') ? ext : '.ics';
            filename = (typeof filename !== 'undefined') ? filename : 'calendar';
            var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
            var blob;
            if (navigator.userAgent.indexOf('MSIE 10') === -1) { blob = new Blob([calendar]); } else { var bb = new BlobBuilder(); bb.append(calendar); blob = bb.getBlob('text/x-vCalendar;charset=' + document.characterSet); }
            var link = document.createElement("a"); link.href = window.URL.createObjectURL(blob); link.download = filename + ext; document.body.appendChild(link); link.click(); document.body.removeChild(link);
        }
    };
};