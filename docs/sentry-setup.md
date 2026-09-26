# Mise en place Sentry — Studymeal

## À créer côté Sentry

1. Créer une organisation ou choisir l’organisation existante.
2. Créer le projet `studymeal-mobile` pour **React Native**.
3. Récupérer le DSN du projet.
4. Créer un jeton d’authentification réservé aux builds pour les source maps.

## Où placer les valeurs

- DSN local : `.env.local` sous la clé `EXPO_PUBLIC_SENTRY_DSN`.
- Jeton de build : secret `SENTRY_AUTH_TOKEN` dans GitHub Actions ou EAS ; jamais dans le dépôt.
- Organisation et projet : secrets `SENTRY_ORG` et `SENTRY_PROJECT` dans les pipelines de build.

Le DSN sert à envoyer les erreurs de l’app. Le jeton d’authentification est plus sensible : il ne doit jamais apparaître dans une issue, une PR ou un fichier versionné.

## Critère de validation

Après intégration du SDK, une erreur volontaire en build de développement doit créer un événement dans le projet Sentry `studymeal-mobile`, avec la version de l’app et le système mobile.
