export class Computations {
    public static secondsElapsed(predicate: Date) {
        const predicateMilliseconds = predicate.getTime();
        const dateMilliseconds = new Date().getTime();
        return (dateMilliseconds - predicateMilliseconds) / 1000;
    }
}