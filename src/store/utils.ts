import apiActions from 'store/api/actions';
import { all, call, put, SagaGenerator } from 'typed-redux-saga';

export type Args = any[];
export type Fn = (...args: Args) => any;

export const wrap = (fn: Fn, onError?: (error: any) => void) =>
  function* (...args: Args) {
    yield* put(apiActions.request(args[0]?.type));
    try {
      yield* call(fn, ...args);
      yield* put(apiActions.success(args[0]?.type));
    } catch (error) {
      console.error(error);
      yield* put(apiActions.error(args[0]?.type));
      onError?.(error);
    }
  };

export function* anyCombinator(effects: SagaGenerator<any, any>[]) {
  const errors = yield* all(
    effects.map((effect) =>
      call(function* () {
        try {
          yield* effect;
          return null;
        } catch (error) {
          return error;
        }
      }),
    ),
  );

  if (errors.every((error) => error !== null)) {
    throw new AggregateError(errors);
  }
}
