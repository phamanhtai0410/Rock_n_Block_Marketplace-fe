import { Collection } from 'modules/collection/pages/Collection';
import { EditCollection } from 'modules/collection/pages/EditCollection';
import { Create } from 'modules/create/pages/Create';
import { CreateCollection } from 'modules/create/pages/CreateCollection';
import { CreateNft } from 'modules/create/pages/CreateNft';
import { AddCategory } from 'modules/games/pages/AddCategory';
import { AddCollections } from 'modules/games/pages/AddCollections';
import { AddSubcategory } from 'modules/games/pages/AddSubcategory';
import { Category } from 'modules/games/pages/Category';
import { EditCategory } from 'modules/games/pages/EditCategory';
import { EditGame } from 'modules/games/pages/EditGame';
import { Game } from 'modules/games/pages/Game';
import { Games } from 'modules/games/pages/Games';
import { ListGame } from 'modules/games/pages/ListGame';
import { Mixed } from 'modules/games/pages/Mixed';
import { Subcategory } from 'modules/games/pages/Subcategory';
import { Home } from 'modules/landing/pages/Home';
import { NotFound } from 'modules/landing/pages/NotFound';
import { Pricing } from 'modules/landing/pages/Pricing';
import { TermsOfService } from 'modules/landing/pages/TermsOfService';
import { Explore } from 'modules/nft/pages/Explore';
import { Nft } from 'modules/nft/pages/Nft';
import { Activity } from 'modules/profile/pages/Activity';
import { EditProfile } from 'modules/profile/pages/EditProfile';
import { Followers } from 'modules/profile/pages/Followers';
import { Following } from 'modules/profile/pages/Following';
import { Profile } from 'modules/profile/pages/Profile';
import { CategoryPathProps, SubcategoryPathProps, WithQueryNetwork } from 'types';
import { encodedURIString } from 'utils/encodedURIString';

export enum Modules {
  landing = 'landing',
  create = 'create',
  nft = 'nft',
  collection = 'collection',
  profile = 'profile',
  other = 'other',
  games = 'games',
}

export const routes = {
  home: {
    dirName: 'Home',
    root: {
      title: 'Home',
      path: '/',
      component: <Home />,
      isNavItem: false,
      module: Modules.landing,
    },
  },
  termsOfService: {
    dirName: 'TermsOfService',
    root: {
      title: 'Terms Of Service',
      path: '/terms-of-service',
      component: <TermsOfService />,
      isNavItem: false,
      module: Modules.landing,
    },
  },
  create: {
    dirName: 'Create',
    root: {
      title: 'Create',
      path: '/create',
      isProtected: true,
      component: <Create />,
      isNavItem: true,
      module: Modules.create,
    },
    nft: {
      dirName: 'CreateNft',
      root: {
        title: 'Create Nft',
        path: '/create/nft',
        component: <CreateNft />,
        isNavItem: true,
        module: Modules.create,
      },
    },
    collection: {
      dirName: 'CreateCollection',
      root: {
        title: 'Create Collection',
        path: '/create/collection',
        component: <CreateCollection />,
        isNavItem: true,
        module: Modules.create,
      },
    },
  },
  explore: {
    dirName: 'Explore',
    root: {
      title: 'Explore',
      path: '/explore',
      component: <Explore />,
      isNavItem: true,
      module: Modules.nft,
    },
  },
  nft: {
    dirName: 'Nft',
    root: {
      title: 'Nft',
      path: '/nft/:id',
      getPath: (id: number) => encodedURIString`/nft/${id}`,
      component: <Nft />,
      isNavItem: false,
      module: Modules.nft,
    },
  },
  collections: {
    dirName: 'Collection',
    root: {
      title: 'Collection',
      path: '/collections/:id',
      getPath: (id: number | string) => encodedURIString`/collections/${id}`,
      component: <Collection />,
      isNavItem: false,
      isDynamic: true,
      module: Modules.collection,
    },
  },
  edit: {
    dirName: 'EditCollection',
    root: {
      title: 'Edit Collection',
      path: '/collections/:id/edit',
      getPath: (id: number) => encodedURIString`/collections/${id}/edit`,
      component: <EditCollection />,
      isNavItem: false,
      isDynamic: true,
      module: Modules.collection,
    },
  },
  activity: {
    dirName: 'Activity',
    root: {
      title: 'Activity',
      path: '/activity',
      isProtected: true,
      component: <Activity />,
      isNavItem: false,
      module: Modules.profile,
    },
  },
  notFound: {
    dirName: 'NotFound',
    root: {
      title: 'Not found',
      path: '/404',
      component: <NotFound />,
      isNavItem: false,
      module: Modules.landing,
    },
  },
  followers: {
    dirName: 'Followers',
    root: {
      title: 'Followers',
      path: '/followers/:userId',
      getPath: (id: number | string) => encodedURIString`/followers/${id}`,
      component: <Followers />,
      isDynamic: true,
      isNavItem: false,
      isProtected: true,
      module: Modules.profile,
    },
  },
  following: {
    dirName: 'Following',
    root: {
      title: 'Following',
      path: '/following/:userId',
      getPath: (id: number | string) => encodedURIString`/following/${id}`,
      component: <Following />,
      isDynamic: true,
      isNavItem: false,
      isProtected: true,
      module: Modules.profile,
    },
  },
  profile: {
    dirName: 'Profile',
    root: {
      title: 'Profile',
      path: '/profile/:id',
      getPath: (id: number | string) => `/profile/${id}`,
      component: <Profile />,
      isNavItem: false,
      isDynamic: true,
      module: Modules.profile,
    },
  },
  pricing: {
    dirName: 'Pricing',
    root: {
      title: 'Pricing',
      path: '/pricing/:id',
      getPath: (id: number) => `/pricing/${id}`,
      component: <Pricing />,
      isNavItem: false,
      module: Modules.landing,
    },
  },
  editProfile: {
    dirName: 'EditProfile',
    root: {
      title: 'Edit Profile',
      path: '/profile/edit',
      isProtected: true,
      component: <EditProfile />,
      isNavItem: false,
      module: Modules.profile,
    },
  },
  games: {
    dirName: 'Games',
    root: {
      title: 'Games',
      path: '/games',
      component: <Games />,
      isNavItem: true,
      module: Modules.games,
    },
    game: {
      dirName: 'Game',
      root: {
        title: 'Game',
        path: '/games/game/:id/',
        getPath: (id: string, network: string) => encodedURIString`/games/game/${id}?network=${network}`,
        component: <Game />,
        isNavItem: true,
        isVisibleDynamic: true,
        isDynamic: true,
        module: Modules.games,
      },
      editGame: {
        dirName: 'EditGame',
        root: {
          title: 'Edit Game',
          path: '/games/game/:id/edit-game',
          getPath: (id: string, network: string) => encodedURIString`/games/game/${id}/edit-game?network=${network}`,
          component: <EditGame />,
          isNavItem: true,
          isProtected: true,
          isVisibleDynamic: true,
          isDynamic: false,
          module: Modules.games,
        },
      },
      addNewCategory: {
        dirName: 'AddCategory',
        root: {
          title: 'Add Category',
          path: '/games/game/:id/add-new-category',
          getPath: (id: string, network: string) =>
            encodedURIString`/games/game/${id}/add-new-category?network=${network}`,
          component: <AddCategory />,
          isNavItem: true,
          isVisibleDynamic: true,
          isProtected: true,
          isDynamic: false,
          module: Modules.games,
        },
      },
      editCategory: {
        dirName: 'EditCategory',
        root: {
          title: 'Edit Category',
          path: '/games/game/:gameId/edit-category/:categoryId',
          getPath: ({ gameName, categoryName, network }) =>
            encodedURIString`/games/game/${gameName}/edit-category/${categoryName}?network=${network}`,
          component: <EditCategory />,
          isNavItem: true,
          isVisibleDynamic: true,
          isProtected: true,
          isDynamic: false,
          module: Modules.games,
        },
      },
      category: {
        dirName: 'Category',
        root: {
          title: 'Category',
          path: '/games/game/:gameId/category/:categoryId',
          getPath: ({ gameId, categoryId, network }: CategoryPathProps & WithQueryNetwork) =>
            encodedURIString`/games/game/${gameId}/category/${categoryId}?network=${network}`,
          component: <Category />,
          isNavItem: true,
          isVisibleDynamic: true,
          isDynamic: true,
          module: Modules.games,
        },
        addNewSubcategory: {
          dirName: 'AddSubcategory',
          root: {
            title: 'Add Subcategory',
            path: '/games/game/:gameId/category/:categoryId/add-new-subcategory',
            getPath: ({ gameId, categoryId, network }: CategoryPathProps & WithQueryNetwork) =>
              encodedURIString`/games/game/${gameId}/category/${categoryId}/add-new-subcategory?network=${network}`,
            component: <AddSubcategory />,
            isNavItem: true,
            isVisibleDynamic: true,
            isProtected: true,
            isDynamic: false,
            module: Modules.games,
          },
        },
        subcategory: {
          dirName: 'Subcategory',
          root: {
            title: 'Subcategory',
            path: '/games/game/:gameId/category/:categoryId/subcategory/:subcategoryId',
            getPath: ({ gameId, categoryId, subcategoryId, network }: SubcategoryPathProps) =>
              encodedURIString`/games/game/${gameId}/category/${categoryId}/subcategory/${subcategoryId}?network=${network}`,
            component: <Subcategory />,
            isNavItem: true,
            isVisibleDynamic: true,
            isDynamic: true,
            module: Modules.games,
          },
          addGameCollection: {
            dirName: 'AddCollections',
            root: {
              title: 'Add Game Collection',
              path: '/games/game/:gameId/category/:categoryId/subcategory/:subcategoryId/add-game-collection',
              getPath: ({ gameId, categoryId, subcategoryId, network }: SubcategoryPathProps) =>
                encodedURIString`/games/game/${gameId}/category/${categoryId}/subcategory/${subcategoryId}/add-game-collection?network=${network}`,
              component: <AddCollections />,
              isNavItem: true,
              isVisibleDynamic: true,
              isProtected: true,
              isDynamic: false,
              module: Modules.games,
            },
          },
        },
      },
    },
    listGame: {
      dirName: 'ListGame',
      root: {
        title: 'List Game',
        isProtected: true,
        path: '/games/list-game',
        component: <ListGame />,
        isNavItem: true,
        module: Modules.games,
      },
    },
  },
  mixedCollections: {
    dirName: 'Mixed',
    root: {
      title: 'Mixed Collections',
      path: '/mixed-collections/:collectionId',
      getPath: (collectionId) => encodedURIString`/mixed-collections/${collectionId}`,
      component: <Mixed />,
      isNavItem: true,
      isDynamic: true,
      module: Modules.games,
    },
  },
};
