import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  saveCredentials: (data) => ipcRenderer.invoke('setDatas', data),
  readCredentials: () => ipcRenderer.invoke('getDatas')
};
window.SECRET_KEY = process.env.SECRET_KEY;
// Utiliser les APIs de `contextBridge` pour exposer les APIs Electron
// au renderer seulement si l'isolation du contexte est activée, sinon
// les ajouter simplement au global DOM.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('SECRET_KEY', window.SECRET_KEY); // Ajouter la SECRET_KEY au contexte du renderer
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
  window.SECRET_KEY = process.env.SECRET_KEY; // Ajouter la SECRET_KEY au global DOM
}
