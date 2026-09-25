export interface Tool<TArgs, TResult> {
  name: string;
  description: string;
  run(args: TArgs): Promise<TResult>;
}
