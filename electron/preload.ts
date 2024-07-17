import { ipcRenderer, contextBridge } from 'electron'
import { type } from './modules/life'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  getElement: (type: type | 'ALL') => ipcRenderer.sendSync('fl-get', type),
  pushElement: (type: type, data: any) => ipcRenderer.send('fl-add', type, data),
  removeElement: (type: type, index: number) => ipcRenderer.send('fl-delete', type, index),
  saveElement: () => ipcRenderer.send('fl-save'),
  updateElement: (type: type, index: number, data: any) => ipcRenderer.send('fl-update', type, index, data)
})