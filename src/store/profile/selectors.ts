import type { ProfileState, State } from 'types';

const profileSelector = {
  getProfile: (state: State): ProfileState => state.profile,
  getProp:
    <T extends keyof ProfileState>(propKey: T) =>
    (state: State): ProfileState[typeof propKey] =>
      state.profile[propKey],
};

export default profileSelector;
