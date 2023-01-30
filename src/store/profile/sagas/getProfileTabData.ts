import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { PaginateToken } from 'types/api/PaginateToken';
import { ProfileState, ProfileTab } from 'types/store';
import { camelize } from 'utils';

import { getProfileTabData } from '../actions';
import actionTypes from '../actionTypes';
import { updateProfileTabData } from '../reducer';
import profileSelector from '../selectors';

export function* getProfileTabDataSaga({
  payload: { profileId, profileTab, page, itemsPerPage, network },
}: {
  payload: ReturnType<typeof getProfileTabData>['payload'];
}) {
  const { profileTabData }: ProfileState = yield select(profileSelector.getProfile);
  const currentProfileTabData = profileTabData[profileTab];

  const { data } = yield* call(() =>
    /* choose endpoint: if game tab active ? getOwnedGames : search */
    baseApi[profileTab === 6 ? 'getOwnedGames' : 'search']({
      page,
      itemsPerPage,
      network,
      ...{
        [ProfileTab.Owned]: { owner: profileId },
        [ProfileTab.ForSale]: { owner: profileId, onAnySale: true },
        [ProfileTab.Bided]: { bidsBy: profileId },
        [ProfileTab.Favorites]: { likedBy: profileId },
        [ProfileTab.Collections]: { type: 'collections', creator: profileId },
        [ProfileTab.Sold]: { soldBy: profileId },
        [ProfileTab.Games]: { userId: profileId },
      }[profileTab],
    }),
  );

  const camelizedProdileDataTabResponse = camelize<PaginateToken>(data);

  const isConcat = Number(page) > 1;

  const updatedResults = isConcat
    ? [
        ...(currentProfileTabData?.results?.length ? currentProfileTabData.results : []),
        ...(camelizedProdileDataTabResponse?.results?.length ? camelizedProdileDataTabResponse.results : []),
      ]
    : camelizedProdileDataTabResponse.results;

  yield* put(
    updateProfileTabData({
      [profileTab]: {
        ...camelizedProdileDataTabResponse,
        results: updatedResults,
      },
    }),
  );
}

export function* watchGetProfileTabData() {
  yield* takeLatest(actionTypes.GET_PROFILE_TAB_DATA, wrap(getProfileTabDataSaga));
}
