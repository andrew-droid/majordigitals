# Andrew Ofori — Portfolio

Portfolio professionnel de Andrew Ofori Amponsah — Creative Designer.  
Hébergé sur GitHub Pages.

## Structure des fichiers

```
andrew-portfolio/
├── index.html              ← Page principale (page d'accueil)
├── README.md               ← Ce fichier
└── assets/
    ├── css/
    │   └── style.css       ← Tous les styles (thème, animations, responsive)
    ├── js/
    │   └── main.js         ← Interactions (curseur, scroll reveal, formulaire)
    └── images/             ← Vos photos et visuels de projets
        ├── andrew.jpg              ← Votre photo (hero, droite)
        ├── andrew-profile.jpg      ← Votre photo (section À propos)
        ├── project-djastice.jpg    ← Capture du projet Djastice
        ├── project-church.jpg      ← Capture du site Église du Christ
        ├── project-afro.jpg        ← Visuel Afro Cuisine & Café
        ├── project-catalog.jpg     ← Visuel Catalogue Djastice
        └── project-motion.jpg      ← Visuel Motion Design / Social Media
```

## Déploiement sur GitHub Pages (étapes)

### 1. Créer le dépôt GitHub
- Créez un nouveau dépôt sur github.com
- Nom recommandé : `andrew-portfolio` ou `majordigitals`

### 2. Uploader les fichiers
- Uploadez tous les fichiers **en respectant exactement la structure** ci-dessus
- Le fichier `index.html` doit être à la **racine** du dépôt

### 3. Activer GitHub Pages
- Allez dans `Settings` → `Pages`
- Source : `Deploy from a branch`
- Branch : `main` / `root`
- Cliquez sur **Save**

### 4. Votre site sera en ligne à :
`https://votre-username.github.io/andrew-portfolio/`

## Personnalisation

### Ajouter vos photos
Placez vos images dans `assets/images/` avec les noms exacts listés ci-dessus.
- Format recommandé : JPG ou WebP
- Taille recommandée : 1200×800px minimum pour les projets, 800×1200px pour les portraits

### Modifier le contenu
Tout le contenu est dans `index.html` — modifiable directement.

### Formulaire de contact
Le formulaire affiche actuellement une confirmation visuelle. Pour le rendre fonctionnel avec envoi d'email, vous pouvez intégrer [Formspree](https://formspree.io) (gratuit) :
1. Créez un compte sur formspree.io
2. Créez un formulaire et copiez votre endpoint
3. Dans `index.html`, remplacez `<form id="contact-form">` par `<form id="contact-form" action="https://formspree.io/f/VOTRE_ID" method="POST">`

## Technologies utilisées
- HTML5 / CSS3 / JavaScript Vanilla
- Google Fonts (Playfair Display + DM Sans)
- Aucune dépendance externe — 100% statique, parfait pour GitHub Pages
