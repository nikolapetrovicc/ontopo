export function useFormatters() {

    const getPersonText = (num: any) => {
        if (num === 1) return 'osoba';
        if (num >= 2 && num <= 4) return 'osobe';
        return 'osoba';
    };

    const formatDate = (date: any) => {
        if (!date) return '';
        const dateObj = new Date(date);

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'long'
        };
        return dateObj.toLocaleDateString('sr-Latn-RS', options);
    };

    const isSameDate = (date1: any, date2: any) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const formatTime = (timeStr: string): string => {
        console.log("timestr", timeStr);

        if (!timeStr || timeStr.length !== 4) {
            return timeStr;
        }

        const hours = timeStr.substring(0, 2);
        const minutes = timeStr.substring(2, 4);

        return `${hours}:${minutes}`;
    }

    return {
        getPersonText,
        formatDate,
        isSameDate,
        formatTime
    };
}