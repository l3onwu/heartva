export const clipText = (text: string, length: number): string => {
    // If text is longer, use ...
    let trailingDots = "";
    if (text.length > length) {
        trailingDots = "...";
    }
    return `${text.slice(0, length)}${trailingDots}`;
};

export const calculatePaceFromDistanceAndTime = (
    distance: number,
    time: number
): number => {
    if (distance === 0 || time === 0) return 0;
    // Rounds to
    return time / (distance / 1000);
};

export const secondsToMinPace = (secondsPace: number): string => {
    // Get full minutes
    const fullMin = Math.floor(secondsPace / 60);
    // Get remainder seconds, rounded to 2dp
    const remainingSeconds = Math.round(secondsPace % 60);
    // Add 0 if seconds is single digit
    let extraDigit = "";
    if (remainingSeconds < 10) extraDigit = "0";
    // Format numbers
    return `${fullMin}.${extraDigit}${remainingSeconds}`;
};