const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const GITHUB_TOKEN = "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"; 
const  REPO_OWNER = "sc-samy" ;
const  REPO_NAME = "Ku" ;
const  BRANCH = "principal" ;
const  FILE_PATH_IN_REPO = "scripts/cmds/" ;
const  MY_UID = "61586092556175" ; // Ton identifiant personnel

module.exports = {​​
  config : {
    nom : "pousser" ,
    version : "1.1" ,
    auteur : "Sαmყ" ,
    compte à rebours : 5 ,
    role : 0 , // On peut mettre 0 car on vérifie l'UID manuellement
    shortDescription : {  fr : "Exporter une commande sur GitHub (Admin uniquement)"  } ,
    catégorie : « propriétaire » ,
    guide : {  fr : "push <nom_du_fichier>"  }
  } ,

  onStart : fonction asynchrone  ( { message , événement , args } ) {    
    // Vérification de sécurité : Seul toi peut l'utiliser
    si  ( événement . senderID !== MY_UID )  {
       message de retour . réponse ( "❌ Désolé, cette commande est réservée uniquement à mon créateur." ) ;
    }

    si  ( ! args [ 0 ] )  {
      retourner  message . reply ( "❌ Usage : `push <nom_du_fichier>` (ex: `push uid`)" ) ;
    }

    const  fileName = args [ 0 ] . endsWith ( '.js' ) ? args [ 0 ] : ` ${ args [ 0 ] } .js` ;
    const  localFilePath = path . join ( __dirname , fileName ) ;

    si  ( ! fs . existsSync ( localFilePath ) )  {
       message de retour . réponse ( `❌ Le fichier \` ${ fileName } \` n'existe pas dans le dossier des commandes.` ) ;
    }

    essayer  {
       message d'attente . réponse ( `⏳ Envoi de \` ${ fileName } \` sur GitHub...` ) ;

      const  fileContent = fs.readFileSync ( localFilePath , ' utf -8' ) ;
      const  contentBase64 = Buffer . from ( fileContent ) . toString ( 'base64' ) ;
      const  url = `https://api.github.com/repos/ ${ REPO_OWNER } / ${ REPO_NAME } /contents/ ${ FILE_PATH_IN_REPO } ${ fileName } ` ;
      
      const  headers = {
        Autorisation : `token ${ GITHUB_TOKEN } ` ,
        Accepter : 'application/vnd.github.v3+json' ,
        'User-Agent' : 'Bot-Script-Uploader'
      } ;

      soit  sha = null ;
      essayer  {
        const  checkResponse = await  axios . get ( url , {  headers , params : {  ref : BRANCH  }  } ) ;
        sha = checkResponse . data . sha ;
      }  catch  ( err )  {  /* Fichier inexistant, on va le créer */  }

      const  corps = {
        message : sha ? `Mise à jour : ${ fileName } ` : `Création : ${ fileName } ` ,
        contenu : contentBase64 ,
        branche : BRANCH
      } ;
      si  ( sha )  corps . sha = sha ;

      await  axios.put ( url , body , { headers } ) ;​​  

       message de retour . réponse ( `✅ \` ${ fileName } \` a bien été synchronisé sur GitHub !` ) ;
    }  catch  ( erreur )  {
      console.erreur ( erreur ) ;​​
       message de retour . réponse ( "❌ Erreur lors de l'envoi sur GitHub." ) ;
    }
  }
} ;

