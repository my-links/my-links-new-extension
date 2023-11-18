import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import "webextension-polyfill";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

const CTX_MENU_ID = '__ctx-menu-my-links-id';

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log(details);
  chrome.tabs.query({active: true, lastFocusedWindow: true}, async (tabs) => {
    const url = tabs[0].url;
    console.log(url);

    chrome.contextMenus.create({
      title: 'Ajouter cette page à une catégorie',
      contexts: ['all'],
      id: CTX_MENU_ID,
    });

    const remoteUrl = await remoteUrlStorage.get();
    const {categories} = await fetch(`${remoteUrl}/api/category`).then((req) =>
      req.json()
    );
    console.log(categories);

    categories.forEach((category: any) => {
      chrome.contextMenus.create({
        title: category.name,
        contexts: ['all'],
        id: category.id.toString(),
        parentId: CTX_MENU_ID,
      });
    });
  });
});
chrome.runtime.onUpdateAvailable.addListener(() => chrome.runtime.reload());

chrome.contextMenus.onClicked.addListener(addToCategory);

async function addToCategory(
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab | undefined
) {
  const request = await fetch(BASE_URL + '/api/link/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: tab?.title,
      url: tab?.url,
      favorite: false,
      categoryId: info.menuItemId,
    }),
  });

  if (!request.ok) {
    showNotification({
      title: 'Erreur',
      message:
        "Une erreur est survenue lors de l'ajout du lien dans la catégorie",
    });
    return console.error(
      "Une erreur est survenue lors de l'ajout du lien dans la catégorie"
    );
  }

  const data = await request.json();
  console.log(data);
  showNotification({title: 'Succèss', message: 'Lien ajouté'});
}

function showNotification({
                            title,
                            message,
                          }: {
  title: string;
  message: string;
}) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: BASE_URL + '/favicon.ico',
    title,
    message,
  });
}
