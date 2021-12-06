type DebouncedFunction<T extends (...args: any) => void> = (...args: Parameters<T>) => void;
export default function Debounce<T extends (...args: any[]) => any>(func: T, ms: number): DebouncedFunction<T> {
    let timeout: any = null;

    return function(...args: any[]): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), ms);
    };
}