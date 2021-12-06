
type ThrottledFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;

export default function throttle<T extends (...args: any) => any>(func: T, ms: number): ThrottledFunction<T> {
    let inThrottle: boolean;
    let lastResult: ReturnType<T>;

    return function(this: any): ReturnType<T> {
        const args: any = arguments;
        const context = this;

        console.log(args)

        if (!inThrottle) {
        inThrottle = true;

        setTimeout(() => (inThrottle = false), ms);

        lastResult = func.apply(context, args);
        }

        return lastResult;
    };
}