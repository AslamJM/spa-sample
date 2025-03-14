/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AboutImport } from './routes/about'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthOrgsIndexImport } from './routes/_auth/orgs.index'
import { Route as AuthFormsIndexImport } from './routes/_auth/forms/index'
import { Route as PubFormIdImport } from './routes/pub/form.$id'
import { Route as AuthOrgsIdImport } from './routes/_auth/orgs.$id'
import { Route as AuthFormsIdIndexImport } from './routes/_auth/forms/$id.index'
import { Route as AuthOrgsIdSettingsImport } from './routes/_auth/orgs.$id.settings'
import { Route as AuthOrgsIdLevelImport } from './routes/_auth/orgs.$id.level'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthOrgsIndexRoute = AuthOrgsIndexImport.update({
  id: '/orgs/',
  path: '/orgs/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthFormsIndexRoute = AuthFormsIndexImport.update({
  id: '/forms/',
  path: '/forms/',
  getParentRoute: () => AuthRoute,
} as any)

const PubFormIdRoute = PubFormIdImport.update({
  id: '/pub/form/$id',
  path: '/pub/form/$id',
  getParentRoute: () => rootRoute,
} as any)

const AuthOrgsIdRoute = AuthOrgsIdImport.update({
  id: '/orgs/$id',
  path: '/orgs/$id',
  getParentRoute: () => AuthRoute,
} as any)

const AuthFormsIdIndexRoute = AuthFormsIdIndexImport.update({
  id: '/forms/$id/',
  path: '/forms/$id/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthOrgsIdSettingsRoute = AuthOrgsIdSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthOrgsIdRoute,
} as any)

const AuthOrgsIdLevelRoute = AuthOrgsIdLevelImport.update({
  id: '/level',
  path: '/level',
  getParentRoute: () => AuthOrgsIdRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/orgs/$id': {
      id: '/_auth/orgs/$id'
      path: '/orgs/$id'
      fullPath: '/orgs/$id'
      preLoaderRoute: typeof AuthOrgsIdImport
      parentRoute: typeof AuthImport
    }
    '/pub/form/$id': {
      id: '/pub/form/$id'
      path: '/pub/form/$id'
      fullPath: '/pub/form/$id'
      preLoaderRoute: typeof PubFormIdImport
      parentRoute: typeof rootRoute
    }
    '/_auth/forms/': {
      id: '/_auth/forms/'
      path: '/forms'
      fullPath: '/forms'
      preLoaderRoute: typeof AuthFormsIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/orgs/': {
      id: '/_auth/orgs/'
      path: '/orgs'
      fullPath: '/orgs'
      preLoaderRoute: typeof AuthOrgsIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/orgs/$id/level': {
      id: '/_auth/orgs/$id/level'
      path: '/level'
      fullPath: '/orgs/$id/level'
      preLoaderRoute: typeof AuthOrgsIdLevelImport
      parentRoute: typeof AuthOrgsIdImport
    }
    '/_auth/orgs/$id/settings': {
      id: '/_auth/orgs/$id/settings'
      path: '/settings'
      fullPath: '/orgs/$id/settings'
      preLoaderRoute: typeof AuthOrgsIdSettingsImport
      parentRoute: typeof AuthOrgsIdImport
    }
    '/_auth/forms/$id/': {
      id: '/_auth/forms/$id/'
      path: '/forms/$id'
      fullPath: '/forms/$id'
      preLoaderRoute: typeof AuthFormsIdIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthOrgsIdRouteChildren {
  AuthOrgsIdLevelRoute: typeof AuthOrgsIdLevelRoute
  AuthOrgsIdSettingsRoute: typeof AuthOrgsIdSettingsRoute
}

const AuthOrgsIdRouteChildren: AuthOrgsIdRouteChildren = {
  AuthOrgsIdLevelRoute: AuthOrgsIdLevelRoute,
  AuthOrgsIdSettingsRoute: AuthOrgsIdSettingsRoute,
}

const AuthOrgsIdRouteWithChildren = AuthOrgsIdRoute._addFileChildren(
  AuthOrgsIdRouteChildren,
)

interface AuthRouteChildren {
  AuthOrgsIdRoute: typeof AuthOrgsIdRouteWithChildren
  AuthFormsIndexRoute: typeof AuthFormsIndexRoute
  AuthOrgsIndexRoute: typeof AuthOrgsIndexRoute
  AuthFormsIdIndexRoute: typeof AuthFormsIdIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthOrgsIdRoute: AuthOrgsIdRouteWithChildren,
  AuthFormsIndexRoute: AuthFormsIndexRoute,
  AuthOrgsIndexRoute: AuthOrgsIndexRoute,
  AuthFormsIdIndexRoute: AuthFormsIdIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/orgs/$id': typeof AuthOrgsIdRouteWithChildren
  '/pub/form/$id': typeof PubFormIdRoute
  '/forms': typeof AuthFormsIndexRoute
  '/orgs': typeof AuthOrgsIndexRoute
  '/orgs/$id/level': typeof AuthOrgsIdLevelRoute
  '/orgs/$id/settings': typeof AuthOrgsIdSettingsRoute
  '/forms/$id': typeof AuthFormsIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/orgs/$id': typeof AuthOrgsIdRouteWithChildren
  '/pub/form/$id': typeof PubFormIdRoute
  '/forms': typeof AuthFormsIndexRoute
  '/orgs': typeof AuthOrgsIndexRoute
  '/orgs/$id/level': typeof AuthOrgsIdLevelRoute
  '/orgs/$id/settings': typeof AuthOrgsIdSettingsRoute
  '/forms/$id': typeof AuthFormsIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/_auth/orgs/$id': typeof AuthOrgsIdRouteWithChildren
  '/pub/form/$id': typeof PubFormIdRoute
  '/_auth/forms/': typeof AuthFormsIndexRoute
  '/_auth/orgs/': typeof AuthOrgsIndexRoute
  '/_auth/orgs/$id/level': typeof AuthOrgsIdLevelRoute
  '/_auth/orgs/$id/settings': typeof AuthOrgsIdSettingsRoute
  '/_auth/forms/$id/': typeof AuthFormsIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/about'
    | '/login'
    | '/orgs/$id'
    | '/pub/form/$id'
    | '/forms'
    | '/orgs'
    | '/orgs/$id/level'
    | '/orgs/$id/settings'
    | '/forms/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/about'
    | '/login'
    | '/orgs/$id'
    | '/pub/form/$id'
    | '/forms'
    | '/orgs'
    | '/orgs/$id/level'
    | '/orgs/$id/settings'
    | '/forms/$id'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/about'
    | '/login'
    | '/_auth/orgs/$id'
    | '/pub/form/$id'
    | '/_auth/forms/'
    | '/_auth/orgs/'
    | '/_auth/orgs/$id/level'
    | '/_auth/orgs/$id/settings'
    | '/_auth/forms/$id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  AboutRoute: typeof AboutRoute
  LoginRoute: typeof LoginRoute
  PubFormIdRoute: typeof PubFormIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  AboutRoute: AboutRoute,
  LoginRoute: LoginRoute,
  PubFormIdRoute: PubFormIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/about",
        "/login",
        "/pub/form/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/orgs/$id",
        "/_auth/forms/",
        "/_auth/orgs/",
        "/_auth/forms/$id/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/orgs/$id": {
      "filePath": "_auth/orgs.$id.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/orgs/$id/level",
        "/_auth/orgs/$id/settings"
      ]
    },
    "/pub/form/$id": {
      "filePath": "pub/form.$id.tsx"
    },
    "/_auth/forms/": {
      "filePath": "_auth/forms/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/orgs/": {
      "filePath": "_auth/orgs.index.tsx",
      "parent": "/_auth"
    },
    "/_auth/orgs/$id/level": {
      "filePath": "_auth/orgs.$id.level.tsx",
      "parent": "/_auth/orgs/$id"
    },
    "/_auth/orgs/$id/settings": {
      "filePath": "_auth/orgs.$id.settings.tsx",
      "parent": "/_auth/orgs/$id"
    },
    "/_auth/forms/$id/": {
      "filePath": "_auth/forms/$id.index.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
