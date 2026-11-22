# Sito Serenissima Immobiliare: come metterlo online

Il sito è fatto di pochi file. Gli immobili stanno in `data/immobili.json`,
e tuo papà li modifica dal pannello `/admin` senza toccare il codice.

```
index.html        → pagina principale
immobile.html     → scheda del singolo immobile
assets/           → grafica e script comuni
data/             → immobili e dati dell'agenzia (li modifica il pannello)
admin/            → pannello di gestione per tuo papà
img/uploads/      → qui finiscono le foto caricate dal pannello
```

Costi: hosting gratuito (GitHub Pages). Il login del pannello passa da DecapBridge:
controlla il prezzo al momento dell'iscrizione.

---

## Passo 1 · Metti i file su GitHub (10 minuti)

1. Crea un account gratuito su https://github.com (lo crei **tu**, non tuo papà).
2. In alto a destra: **+ → New repository**. Nome: `serenissima-sito`. Scegli **Public**. Crea.
3. Nella pagina del repository: **Add file → Upload files**. Trascina **tutto il contenuto**
   della cartella `serenissima-sito` (non la cartella stessa: i file e le cartelle dentro).
   Premi **Commit changes**.

## Passo 2 · Accendi il sito (2 minuti)

1. Nel repository: **Settings → Pages**.
2. In *Build and deployment*: Source **Deploy from a branch**, Branch **main**, cartella **/ (root)**. Salva.
3. Dopo 1–2 minuti il sito è online a `https://TUO-UTENTE.github.io/serenissima-sito/`.
   Aprilo e controlla che si veda tutto.

## Passo 3 · Attiva il login del pannello (15 minuti)

1. Vai su https://decapbridge.com e crea un account.
2. Aggiungi un nuovo sito e collega il repository `serenissima-sito`
   (ti chiederà un token di GitHub: segui le loro istruzioni passo passo).
3. DecapBridge ti mostra alcune righe di configurazione (`repo`, `identity_url`, `gateway_url`…).
4. Su GitHub apri `admin/config.yml`, premi la matita ✏️, e sostituisci il blocco `backend:`
   in cima con quello che ti ha dato DecapBridge. Premi **Commit changes**.
5. Da DecapBridge **invita l'email di tuo papà**. Gli arriva un'email per scegliere la password.

## Passo 4 · Prova il pannello

1. Apri `https://TUO-UTENTE.github.io/serenissima-sito/admin/` ed entra.
2. **Immobili → Elenco immobili → Aggiungi immobile**. Compila, carica una foto, premi **Pubblica**.
3. Dopo 1–2 minuti ricarica il sito: l'immobile c'è. Poi cancellalo (cestino) e ripubblica.

## Passo 5 · Prima di lasciare Q-Web ⚠️

- **Le foto attuali vengono ancora dal vecchio sito.** Quando Q-Web lo spegne, spariscono.
  Prima di quel momento ricarica dal pannello le foto di ogni immobile, il **logo** e le
  **foto grandi in alto** (in *Dati dell'agenzia*).
- **Privacy e cookie policy** puntano ancora al vecchio sito. Serve una pagina privacy
  vostra: quando ce l'hai, metti il link in *Dati dell'agenzia*. Lo stesso per
  condizioni d'affitto e newsletter.

## Passo 6 · Collega il dominio serenissimaonline.it

Il dominio oggi lo gestisce Q-Web. Chiedi loro di **modificare i DNS** (o di trasferirvi il dominio):

| Tipo  | Nome  | Valore                        |
|-------|-------|-------------------------------|
| CNAME | www   | TUO-UTENTE.github.io          |
| A     | @     | 185.199.108.153               |
| A     | @     | 185.199.109.153               |
| A     | @     | 185.199.110.153               |
| A     | @     | 185.199.111.153               |

**Importante: non devono toccare i record MX**, altrimenti smette di funzionare
l'email info@serenissimaonline.it.

Poi su GitHub: **Settings → Pages → Custom domain** → `www.serenissimaonline.it` → Save,
e quando possibile spunta **Enforce HTTPS**. Da quel momento il pannello è su
`https://www.serenissimaonline.it/admin/`.

---

## Per tuo papà, in breve

1. Apri `www.serenissimaonline.it/admin` ed entra con email e password.
2. **Nuovo immobile:** Immobili → Elenco immobili → *Aggiungi immobile* → compila → **Pubblica**.
3. **Affittato/venduto:** apri l'immobile e spegni *Mostra sul sito* → **Pubblica**.
   (Oppure cestino per cancellarlo del tutto.)
4. Il sito si aggiorna da solo in 1–2 minuti.

Le foto dal telefono vanno bene. Se diventano tante e il sito rallenta,
si può aggiungere la compressione automatica.
