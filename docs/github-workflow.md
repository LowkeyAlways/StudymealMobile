# Workflow GitHub — Studymeal

## Règle de découpage

Un ticket décrit un résultat vérifiable. Un epic regroupe les tickets qui livrent un même objectif produit. Les tickets enfants sont créés comme **sub-issues** de leur epic dans GitHub.

Chaque pull request ferme un ticket avec `Closes #123`. Une PR ne mélange pas plusieurs résultats indépendants.

## Labels

| Groupe | Labels |
| --- | --- |
| Type | `type: feature`, `type: bug`, `type: chore`, `type: docs`, `type: security` |
| Domaine | `area: mobile`, `area: map`, `area: data`, `area: backend`, `area: observability`, `area: ci` |
| Priorité | `priority: p0`, `priority: p1`, `priority: p2`, `priority: p3` |
| État | `status: triage`, `status: ready`, `status: blocked`, `status: in progress` |
| Estimation | `size: xs`, `size: s`, `size: m`, `size: l` |

## Relations

- **Parent / sub-issue** : découpage d’un epic en livrables.
- **Blocks / blocked by** : lorsqu’un ticket ne peut pas démarrer ou se terminer.
- **Relates to** : pour un sujet connexe sans dépendance.
- **Duplicate of** : pour fermer un doublon sans perdre son historique.

## Définition de prêt

Un ticket est prêt lorsqu’il a un objectif, des critères d’acceptation, une priorité, une taille et ses dépendances explicites.

## Définition de terminé

Le ticket est validé sur le support visé, les contrôles de code passent, la PR est relue et le ticket est fermé automatiquement par la PR.
