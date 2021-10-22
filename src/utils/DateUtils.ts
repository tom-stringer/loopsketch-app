export default class DateUtils {
    static getMonthAndYear = (date: string) => {
        return new Date(date).toLocaleDateString("default", { month: "long", year: "numeric" });
    };
}
