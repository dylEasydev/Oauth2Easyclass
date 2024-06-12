Bienvenu sur api oauth2 easyclass qui implemente les octroi suivant.  

client_credentials ,passsword , refresh_token,authorization_code.  

Pour plus d'information sur oauth veillez consulter [oauth.net]oauth.net, je vous
expliquerai comment mettre en route ce serveur.  

prérequis: avoir **node** , **mysqlServer** ou **postgresql** ,créér une base de donnée avec le nom que vous voulez.  

Etape1: recupérer le depôt avec un ```git pull```.  
Pour ceux n'ayant pas git,vous pouvez télecharger archive et décompresser.  

Etape2: ajouter à la racine du dossier auth_service_easyclass/. le fichier  .env
avec les informations suivante.  

```
PORT = 3000//3000 est le port par defaut dans la documentation  

DB_NAME =  

DB_HOST = localhost  

DB_DRIVER = mysql  

DB_PASSWORD =  

DB_USER =  

NODE_ENV = developemnent  

HOSTNAME = localhost  

COMPANING_MAIl =  

PASSWORD_MAIL=  

PRIVATE_KEY =  

ADMIN_NAME =  

ADMIN_PASS =  

```  

Etape3: Lancer la commande npm install pour installer tout les modules neccessaire.  

Etape4: demarrer le serveur de votre base de donnée .  

Etape5: lancer la commande npm run dev .  

Etape6: la documentation des end point ce trouve à l'address http://loclhost:${proccess.env.port}/docs.  
