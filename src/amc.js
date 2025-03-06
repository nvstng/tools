function daysBetweenDates(date1, date2) {
    const parsedDate1 = new Date(date1);
    const parsedDate2 = new Date(date2);

    const differenceInMs = parsedDate2.getTime() - parsedDate1.getTime();
    return Math.round(differenceInMs / (1000 * 60 * 60 * 24));
}

function expiringInDays(date, numberOfDays, amcStarted) {
    if (!amcStarted) return false;
    if (date === undefined || date === null || date === '') {
        return true;
    }
    const daysBetween = daysBetweenDates(new Date(), date);
    console.log(daysBetween);
    return daysBetween <= numberOfDays;
}

function expired(date, amcStarted) {
    return expiringInDays(date, 0, amcStarted);
}

export {daysBetweenDates, expiringInDays, expired};
