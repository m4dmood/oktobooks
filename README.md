# oktobooks
L'applicazione rappresenta un semplice sistema di tracciamento della lettura di libri. In maniera agevole una volta autenticati nell'applicazione si potranno inserire nuovi titoli e tracciarne lo stato modificandolo con 3 possibili valori (To Read, Reading, Read). I titoli inseriti a sistema potranno essere rimossi tramite l'apposito tasto in corrispondenza di ciascun record.

## Stack del progetto
L'applicazione si struttura in 3 componenti:
- UI sviluppata con Vue.js, grazie al quale si ha una composizione snella nella sintassi e nell'organizzazione dei file
- API sviluppate con NestJS, framework semplice da gestire ma allo stesso tempo solido e affidabile
- Database PostgreSQL per la persistenza dei dati (quest'ultimo operativo in un container dedicato)

## Configurazione e avvio
Per avviare il container che espone il db all'applicazione sarà sufficiente lanciare il seguente comando dalla root del repository:

    $ docker-compose -f db.yml up -d

Questo esporrà il database sulla classica porta 5432.

Il backend segue la prassi di un sorgente basato su Node, quindi potrà essere avviato posizionandosi sotto la directory "okt-api" lanciando i comandi nel seguente ordine:

    $ npm install
    $ npm run start:demo

Nota: è importante utilizzare "start:demo" in quanto questo comando è stato appositamente predisposto per lanciare le migrazioni tramite TyepeORM e solo successivamente avviare il backend, evitando così di dover lanciare manualmente più comandi.

Infine per il frontend occorre spostarsi sotto la directory "okt-fe" e lanciare i seguenti comandi:

    $ npm install
    $ npm run dev

A questo punto l'applicazione sarà operativa e accessibile all'URL "http://localhost:5173".

## Accesso
Raggiungendo l'URL predefinito verrà richiesto il login; questo potrà essere effettuato con le credenziali preventivamente inserite a db.

    Username: admin
    Password: admin1

Dopo il login si verrà reindirizzati alla reading list e l'applicazione sarà utilizzabile.