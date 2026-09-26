# Studymeal Mobile

Application iOS et Android construite avec React Native, Expo et TypeScript.

## Démarrer

```bash
npm run ios
```

Pour Android :

```bash
npm run android
```

## Structure à connaître

- `src/app/` : les écrans de l’application. Avec Expo Router, chaque fichier devient une route.
- `src/app/_layout.tsx` : le cadre de navigation commun.
- `src/app/index.tsx` : l’écran d’accueil (`/`).

## Prochaine étape

Créer l’écran Carte et les données de démonstration des premiers lieux de Paris Rive Gauche.

## Qualité et delivery

```bash
npm run quality
docker compose run --rm quality
```

Docker valide le JavaScript/TypeScript de manière reproductible. Il ne remplace pas le simulateur iOS ou l’émulateur Android, qui nécessitent les outils natifs de leurs plateformes.

Les conventions de tickets, labels et relations sont dans `docs/github-workflow.md`. Le premier backlog est dans `docs/backlog-initial.md`.

La procédure Sentry et les emplacements sûrs des variables sont dans `docs/sentry-setup.md`.
