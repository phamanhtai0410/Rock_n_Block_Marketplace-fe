import { fork } from 'redux-saga/effects';

import addCategory from './addCategory';
import addCollections from './addCollections';
import addSubcategory from './addSubcategory';
import deleteCategory from './deleteCategory';
import deleteCollection from './deleteCollection';
import deleteSubcategory from './deleteSubcategory';
import editCategory from './editCategory';
import editGame from './editGame';
import getCategory from './getCategory';
import { watchGetFilterGames } from './getFilterGames';
import getGame from './getGame';
import getGames from './getGames';
import getOwnedGames from './getOwnedGames';
import getSubcategory from './getSubcategory';
import listGame from './listGame';
import updateGame from './updateGame';

export default function* gamesSagas() {
  yield fork(watchGetFilterGames);
  yield fork(getGames);
  yield fork(editGame);
  yield fork(listGame);
  yield fork(getGame);
  yield fork(updateGame);
  yield fork(getCategory);
  yield fork(addCategory);
  yield fork(editCategory);
  yield fork(addSubcategory);
  yield fork(getSubcategory);
  yield fork(addCollections);
  yield fork(deleteCategory);
  yield fork(deleteSubcategory);
  yield fork(deleteCollection);
  yield fork(getOwnedGames);
}
