import path from 'node:path'
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import os from 'node:os'

const path_url = path.resolve('default.json')

// Verificar si la configuracion existe
const config_path = path.join(os.homedir(), '.Life')

export const checkConfig = {
    dir: () => existsSync(config_path),
    file: () => existsSync(path.join(config_path, 'Life.json'))
}

// Crear la configuracion
export function createConfig() {
    if (!checkConfig.dir()) mkdirSync(config_path)
    if (!checkConfig.file()) copyFileSync(path_url, path.join(config_path, 'Life.json'))
}

// Cargar life.json
export function getLife() {
    const file = readFileSync(path.join(config_path, 'Life.json'), 'utf-8')
    const data: life = JSON.parse(file)
    return data
}

// Guardar life.json
export async function setLife(data: life) {
    await writeFile(path.join(config_path, 'Life.json'), JSON.stringify(data))
}

// Declaracion de tipos e interfaces

export type theme = 'light' | 'dark'
export type language = 'es' | 'en'

export type type = 'notes' | 'tasks' | 'contacts' | 'events'

export interface note {
    title: string,
    content: string,
    date: string
}

//Tasks sistema de tareas
export type complete = 'done' | 'undone' | 'never'

export interface tElement {
    type: 'task' | 'group',
    title?: string,
    date?: string,
    done?: complete,
    childrens?: tElement[]
}

export interface contact {
    names: string,
    lastnames: string,
    phone: string[],
    email: string[],
    address: string
}

export interface event {
    title: string,
    date: string,
    time: {
        start: string,
        end: string
    }
    location: string
}

export interface life {
    life: {
        notes: note[],
        tasks: tElement[],
        contacts: contact[],
        events: event[]
    },
    config: {
        version: string,
        theme: theme,
        language: language,
        vaultPassword: string | null
    }
}