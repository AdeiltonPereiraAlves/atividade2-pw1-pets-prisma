export default interface UseCase <IN, OUT> {
    execute(enter: IN): Promise<OUT>
}