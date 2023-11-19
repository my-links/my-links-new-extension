import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import "webextension-polyfill";
import { makeRequest } from "@src/lib/makeRequest";
import remoteUrlStorage from "@src/shared/storages/remoteUrlStorage";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

const CTX_MENU_ID = "__ctx-menu-my-links-id";

chrome.runtime.onInstalled.addListener(async () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
    const url = tabs[0].url;
    console.log(url);

    chrome.contextMenus.create({
      title: "Ajouter cette page à une catégorie",
      contexts: ["all"],
      id: CTX_MENU_ID,
    });

    const { categories } = await makeRequest<{ categories: Category[] }>({
      path: "api/category",
    });
    console.log(categories);
    chrome.action.setBadgeText({ text: categories.length.toString() });

    categories.forEach((category: Category) => {
      chrome.contextMenus.create({
        title: category.name,
        contexts: ["all"],
        id: category.id.toString(),
        parentId: CTX_MENU_ID,
      });
    });
  });
});
chrome.runtime.onUpdateAvailable.addListener(() => chrome.runtime.reload());

chrome.contextMenus?.onClicked.addListener(addToCategory);

async function addToCategory(
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab | undefined,
) {
  try {
    await makeRequest({
      path: "api/link",
      method: "POST",
      body: {
        name: tab?.title || tab?.url,
        url: tab?.url,
        favorite: false,
        categoryId: info.menuItemId,
      },
    });
    showNotification({ title: "Succès", message: "Lien ajouté" });
  } catch (error) {
    showNotification({
      title: "Erreur",
      message: error,
    });
    console.error(error);
  }
}

async function showNotification({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const remoteUrl = await remoteUrlStorage.get();
  chrome.notifications.create({
    type: "basic",
    iconUrl: `${remoteUrl}favicon.png`,
    title,
    message,
  });
}
