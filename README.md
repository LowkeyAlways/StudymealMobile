# Studymeal Mobile

Application iOS et Android qui aide les étudiants à trouver des lieux de restauration abordables, solidaires et CROUS, à consulter des itinéraires et à partager l'affluence des lieux.

Construite avec **React Native**, **Expo**, **Expo Router** et **TypeScript**.

## Fonctionnalités actuelles

- Carte interactive des lieux avec recherche, filtres, regroupement des marqueurs et détails d'un lieu.
- Itinéraires à pied, à vélo et en voiture, calculés avec Mapbox Directions.
- Ouverture d'une navigation guidée dans Plans ou Google Maps.
- Position de l'utilisateur et recentrage sur la carte.
- Favoris sauvegardés localement et accessibles depuis le profil.
- Préférences locales : campus, budget, catégories et notifications.
- Fil de bons plans étudiants : restauration et loisirs.
- Connexion par e-mail/mot de passe et Google avec Supabase.
- Signalement d'affluence : fluide, modérée ou chargée.

## Prérequis

- [Node.js 22](https://nodejs.org/) et npm.
- Xcode et un simulateur iOS pour exécuter l'application sur iOS.
- Android Studio et un émulateur Android pour Android.
- Docker Desktop, uniquement pour le contrôle qualité conteneurisé.

Pour vérifier les versions installées :

```bash
node --version
npm --version
docker --version
```

## Installation

Clone le dépôt, puis installe les dépendances :

```bash
git clone https://github.com/LowkeyAlways/StudymealMobile.git
cd StudymealMobile
npm install
```

Crée ensuite ton fichier de configuration locale :

```bash
cp .env.example .env.local
```

Renseigne les variables nécessaires dans `.env.local`. Ce fichier ne doit jamais être envoyé sur GitHub.

```dotenv
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=
GOOGLE_MAPS_ANDROID_API_KEY=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

`GOOGLE_MAPS_ANDROID_API_KEY` est nécessaire pour afficher la carte dans une build Android. Les clés préfixées par `EXPO_PUBLIC_` sont visibles dans l'application : elles doivent uniquement identifier des services protégés par leurs propres règles d'accès, notamment les règles RLS de Supabase.

## Lancer l'application

Démarre le serveur Expo :

```bash
npm start
```

Puis ouvre l'application dans le simulateur, l'émulateur ou un appareil de développement.

### iOS

```bash
npm run ios
```

Pour cibler un iPhone physique connecté au Mac :

```bash
npm run ios -- --device
```

### Android

Lance d'abord un émulateur depuis Android Studio, puis :

```bash
npm run android
```

### Web

Le rendu web peut aider à vérifier l'interface, mais les cartes natives et certaines interactions doivent être validées sur iOS ou Android.

```bash
npm run web
```

## Contrôle qualité

Avant chaque commit ou pull request, lance les vérifications locales :

```bash
npm run quality
```

Cette commande exécute :

```bash
npm run typecheck
npm run lint
```

Le contrôle peut aussi être reproduit dans Docker :

```bash
docker compose run --rm quality
```

Docker garantit le type-check et le lint dans un environnement Node 22 isolé. Il ne remplace pas les tests manuels dans le simulateur iOS, l'émulateur Android ou un appareil physique.

## Intégration continue

Le workflow GitHub Actions `.github/workflows/quality.yml` s'exécute sur chaque pull request et chaque push vers `main`. Il vérifie :

1. l'installation reproductible avec `npm ci --legacy-peer-deps` ;
2. le type-check TypeScript ;
3. le lint Expo ;
4. l'image Docker et son contrôle qualité.

Une pull request ne doit être fusionnée que lorsque cette vérification est verte.

## Builds de distribution

Le projet utilise EAS Build. Les profils sont définis dans `eas.json` :

- `preview` : build interne Android au format APK ;
- `production` : build destinée aux stores.

Exemples :

```bash
npx eas-cli@latest build --platform android --profile preview
npx eas-cli@latest build --platform android --profile production
npx eas-cli@latest build --platform ios --profile production
```

Les variables de production et de preview doivent être configurées dans EAS, sans les enregistrer dans le dépôt.

## Structure du projet

```text
src/
├── app/          # Routes Expo Router et layouts de navigation
├── components/   # Composants réutilisables
├── contexts/     # États globaux : auth, favoris, préférences
├── data/         # Données locales de démonstration
├── screens/      # Écrans et logique de présentation
├── services/     # API : Supabase, itinéraires, localisation, affluence
├── styles/       # Thème et styles séparés par domaine
└── types/        # Types TypeScript partagés
```

Les routes principales sont :

- `src/app/(tabs)/index.tsx` : accueil ;
- `src/app/(tabs)/map.tsx` : découverte des lieux ;
- `src/app/(tabs)/favorites.tsx` : bons plans ;
- `src/app/(tabs)/profile.tsx` : profil, favoris et préférences.

## Identité native et liens profonds

- Nom affiché : `Studymeal`.
- Schéma de lien profond : `studymeal://`.
- Icône : `assets/studymeal-icon.png`.
- Splash screen : identité Studymeal sur fond crème.

L'icône et le splash screen sont fidèlement validés dans une development build, une preview build ou une production build, pas uniquement dans Expo Go.

## Sécurité et données

- Ne commite jamais `.env.local`, les tokens Mapbox, les clés Google Maps ou les secrets Sentry.
- La clé Supabase publique ne remplace pas les règles de sécurité : les tables exposées doivent être protégées par Row Level Security (RLS).
- La localisation est demandée seulement lorsque l'utilisateur la déclenche.

## Organisation GitHub

Le travail produit est suivi dans le projet GitHub **Studymeal — Product roadmap** avec des issues, sous-issues, labels et relations.

- Conventions de tickets, labels et relations : [`docs/github-workflow.md`](docs/github-workflow.md)
- Backlog initial : [`docs/backlog-initial.md`](docs/backlog-initial.md)
- Procédure Sentry : [`docs/sentry-setup.md`](docs/sentry-setup.md)

## Flux de contribution

1. Crée une branche depuis `main`.
2. Associe ton travail à une issue GitHub.
3. Implémente une modification ciblée.
4. Lance `npm run quality` et teste sur la plateforme concernée.
5. Crée un commit clair en anglais, puis une pull request.
6. Passe l'issue en **In review**, ajoute le hash du commit et la validation réalisée.

Exemple :

```bash
git checkout -b feat/example
git add src/
git commit -m "feat(map): add example interaction"
git push -u origin feat/example
```
