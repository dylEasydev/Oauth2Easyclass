# Service d'authentification oauth2 du site d'E-learning [easyclass.edu](https://easyclass.edu)

## Description  du projet
Dans l'optique de mettre sur pied une architecture **micro-service** , nous avons décidé
de réaliser la partie backend du site en plusieur service à realisation indépendante .

Le choix d'un serveur d'authentification **Oauth2** est dû à sa facilitée d'utilisation 
dans une architecture micro-service. Il permet à des clients (***dans notre cas d'autres services***) d'avoir des jeton **jwt** (json web token) , donnant accès au end-point securisé d'autres services.

Si vous voulez appronfondir sur le sujet des serveur Oauth2 veuillez vous reférez [ici](https://www.oauth.net).

## objectif du projet
L'objectif principale du projet est de mettre sur pied , une **API REST** , avec des end-point pour la création de compte étudiant , enseignant et administrateur.

D'un autre côté d'implementer les octroi **password** , **refresh_token** et **authorization_code** d'un serveur Oauth2 .

Celà etant dit beaucoup d'autres options s'ajoute comme la generation d'un code de verification , pour valider l'adresse fourni par l'utilisateur.

Il est aussi question pour moi de populariser l'architecture **orienté objets** lors de
l'implementation d'une **API REST**.

## Prérequis
Avant de se lancer à coeur joie vers le demarage de se projet rassurez vous d'avoir :
- **nodejs** et **npm** d'installer sur votre ordinateur.
* un **SGBD**(sytème de gestion de base de donnée) dans notre **postgresql** et **mysql**
> [!IMPORTANT]
> vous pouvez utiliser un autre SGBD il vous suffit juste d'installer sont driver
> et de verifier s'il est pris en charge par [sequelize](https://sequelize.org)

+ possèder git et savoir faire de pull `git pull` ou des **fork**

## installation
Pour lancer le projet il faut tous d'abord installer les dependences .
ouvrez le terminal et deplacez vous au dossier où vous avez effectué le pull.
et  lancer `npm install`

## configuration

Créer un fichier `.env`à la racine du projet puis copiez le code si dessous à l'interieur .

```js

PORT = 3000
DB_NAME = //nom de la base de donnée
DB_HOST = localhost
DB_DRIVER = //postgres , mysql ,...
DB_PASSWORD = //mots de passe de l'utilisateur de la BD
DB_USER = //nom de l'utilisateur de la BD
NODE_ENV = developemnent
HOSTNAME = 127.0.0.1
COMPANING_MAIl = 
PASSWORD_MAIL= 
PRIVATE_KEY = 
ADMIN_NAME = //nom de l'admin de base
ADMIN_PASS = // mots de passe de l'admin

```

Généré les clés pour securiséle serveur HTTP/2 . Vous auriez besionde [openssl]() .

```
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365  -in server.csr -signkey server.key -out server.crt
```

j'ai rencontré quelques soucis avec le fichier de declartion de types de 
la dépendances `@node-oauth/express-oauth-server` j'ai dù le modifier .
le chemin d'accès de ce fichier est : 
> `node_modules/@node-oauth/oauth2-server/index.d.ts`

references [ici](/config.md) pour le fichier modifier . 
## demarage du serveur
ouvrez le terminal et lancez la commande `npm run dev` .

pour les adepte de javascripts vous pouvez compiler grâce à la commande `npm build`.
Puis lancer le serveur avec la commande `node -r dotenv/config ./dist/server/index.js`

## exemple d'utilisation
```js
import axios from 'axios';
const axiosRequest = axios.create({
    baseURL:'https://localhost:3000/',
    timeout:3000
});
const newStudent = axiosRequest.post('/sign/student').then((response)=>{
    return response.data;
})
```
## Documentation
la documentation est à l'adresse https://127.0.0.1:3000/docs .
son fichier html [ici](/docs/index.html) à enrichir si vous voulez bien . 

## conctact
Mon addresse: 
> easyclassgroup@gmail.com
