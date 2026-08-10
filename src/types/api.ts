export type Success<T> = {
    ok: true;
    value: T
};

export type Failure<E> = {
    ok: false;
    error: E
}

export type Result<T, E = Error> = Success<T> | Failure<E>

export function ok<T>(value : T) : Result<T>
{
    return {
        ok: true,
        value: value
    };
}

export function err<E>(error: E) : Result<never, E>
{
    return {
        ok: false,
        error: error
    };
}