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

## Identité native

- Le nom affiché sur iOS et Android est `Studymeal`.
- Le schéma de lien profond est `studymeal://`.
- L’icône iOS et web utilise `assets/studymeal-icon.png`.
- Android utilise la même icône et son calque transparent
  `assets/studymeal-icon-foreground.png` pour l’icône adaptative.
- L’écran de lancement reprend le symbole Studymeal sur fond crème.

L’icône et le splash screen ne s’affichent pas fidèlement dans Expo Go. Ils se
vérifient dans une preview build ou une production build.

## Qualité et delivery

```bash
npm run quality
docker compose run --rm quality
```

Docker valide le JavaScript/TypeScript de manière reproductible. Il ne remplace pas le simulateur iOS ou l’émulateur Android, qui nécessitent les outils natifs de leurs plateformes.

Les conventions de tickets, labels et relations sont dans `docs/github-workflow.md`. Le premier backlog est dans `docs/backlog-initial.md`.

La procédure Sentry et les emplacements sûrs des variables sont dans `docs/sentry-setup.md`.
