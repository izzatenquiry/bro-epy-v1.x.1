import { initializeSupabase } from './supabaseClient';

const CONFIG_KEY = 'app_master_config';

export interface TableNameConfig {
    USERS: string;
    TRIAL_USERS: string;
    VEO_AUTH_TOKENS: string;
    MASTER_API_KEYS: string;
    GENERATED_API_KEYS: string;
    ACTIVITY_LOG: string;
    VIRAL_PROMPTS: string;
    PROXY_SERVER_THROTTLE: string;
}

export interface MasterConfig {
    supabaseUrl: string;
    supabaseAnonKey: string;
    veoProxyUrl: string;
    imagenProxyUrl: string;
    tableNames: TableNameConfig;
    customLogoDataUrl?: string;
    customFaviconDataUrl?: string;
    appName: string;
    registrationUrl: string;
    supportUrl: string;
    supportUrlLabel: string;
    proxyServerList: string[];
}

export const DEFAULT_TABLE_NAMES: TableNameConfig = {
    USERS: 'users',
    TRIAL_USERS: 'trial_user',
    VEO_AUTH_TOKENS: 'token_new_active',
    MASTER_API_KEYS: 'master_api_key',
    GENERATED_API_KEYS: 'generated_api_keys',
    ACTIVITY_LOG: 'activity_log',
    VIRAL_PROMPTS: 'prompt_viral_my',
    PROXY_SERVER_THROTTLE: 'proxy_server_throttle',
};

const DEFAULTS: Partial<MasterConfig> = {
    appName: 'AI Content Platform',
    registrationUrl: '#',
    supportUrl: '#',
    supportUrlLabel: 'Support Group',
    proxyServerList: [],
};

export let TABLE_NAMES: TableNameConfig = { ...DEFAULT_TABLE_NAMES };
export let MASTER_CONFIG: Partial<MasterConfig> = { ...DEFAULTS };

export const initializeConfig = (config: MasterConfig): void => {
    try {
        if (!config) {
            throw new Error("Configuration object is missing.");
        }
        
        MASTER_CONFIG = { ...DEFAULTS, ...config };
        
        if (config.supabaseUrl && config.supabaseAnonKey) {
            initializeSupabase(config.supabaseUrl, config.supabaseAnonKey);
        } else {
            console.error("Supabase URL or Anon Key is missing in the configuration.");
        }

        if(config.veoProxyUrl) localStorage.setItem('veoProxyUrl', config.veoProxyUrl);
        if(config.imagenProxyUrl) localStorage.setItem('imagenProxyUrl', config.imagenProxyUrl);

        TABLE_NAMES = { ...DEFAULT_TABLE_NAMES, ...config.tableNames };
        
        console.log("Master configuration loaded from config.js. App name:", MASTER_CONFIG.appName);
        
    } catch (e) {
        console.error("Failed to initialize config from object", e);
        TABLE_NAMES = { ...DEFAULT_TABLE_NAMES };
        MASTER_CONFIG = { ...DEFAULTS };
    }
};
