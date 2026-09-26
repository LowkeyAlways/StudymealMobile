# Backlog initial — Studymeal

Cette liste est prête à devenir des epics GitHub et leurs sub-issues après connexion.

## Epic — M0 : Fondations produit

**Objectif :** disposer d’une application mobile fiable, navigable et observable avant l’intégration des données réelles.

1. **Configurer l’identité native Studymeal** — `type: chore`, `area: mobile`, `priority: p1`, `size: s`.
2. **Créer la navigation d’accueil et la structure d’écrans** — `type: feature`, `area: mobile`, `priority: p1`, `size: s`.
3. **Installer le contrôle qualité Docker et GitHub Actions** — `type: chore`, `area: ci`, `priority: p1`, `size: s`.
4. **Connecter Sentry et valider la remontée d’une erreur de test** — `type: feature`, `area: observability`, `priority: p1`, `size: s`.

Le ticket Sentry est bloqué par la création du projet Sentry et la configuration du DSN.

## Epic — M1 : Carte et lieux pilotes

**Objectif :** permettre à un étudiant de trouver les lieux fiables autour de Grands Moulins / Paris Rive Gauche.

1. **Modéliser un lieu et charger les données de démonstration** — `type: feature`, `area: data`, `priority: p1`, `size: s`.
2. **Afficher la carte et les marqueurs de lieux** — `type: feature`, `area: map`, `priority: p1`, `size: m`; bloqué par le modèle de lieu.
3. **Ajouter filtres budget, catégorie et recherche** — `type: feature`, `area: mobile`, `area: map`, `priority: p1`, `size: m`; bloqué par la carte.
4. **Créer la fiche d’un lieu et le départ vers l’itinéraire** — `type: feature`, `area: mobile`, `priority: p1`, `size: s`; bloqué par la carte.
