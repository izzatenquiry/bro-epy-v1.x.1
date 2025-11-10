import React, { useState } from 'react';
import { DatabaseIcon, ServerIcon, CheckCircleIcon, AlertTriangleIcon, UploadIcon, TrashIcon } from '../Icons';
import Spinner from '../common/Spinner';
import { DEFAULT_TABLE_NAMES, TableNameConfig } from '../../services/configService';

const generateConfigFileContent = (config: any): string => {
    const configString = JSON.stringify(config, null, 2);
    return `const config = ${configString};\n\nexport default config;`;
};

const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
};

const ConnectionSettingsPanel: React.FC<{ isFirstTimeSetup?: boolean }> = ({ isFirstTimeSetup = false }) => {
    const [config, setConfig] = useState({
        supabaseUrl: '',
        supabaseAnonKey: '',
        veoProxyUrl: '',
        imagenProxyUrl: '',
        appName: 'AI Content Platform',
        registrationUrl: '',
        supportUrl: '',
        supportUrlLabel: 'Support Group',
        proxyServerList: '',
    });
    
    const [tableNames, setTableNames] = useState<TableNameConfig>({...DEFAULT_TABLE_NAMES});
    const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
    const [faviconDataUrl, setFaviconDataUrl] = useState<string | null>(null);
    
    const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState<string | null>(null);

    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };
    
    const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof TableNameConfig, value: string };
        setTableNames(prev => ({...prev, [name]: value}));
    };
    
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setLogoDataUrl(await fileToBase64(file));
    };

    const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFaviconDataUrl(await fileToBase64(file));
    };

    const handleRemoveLogo = () => setLogoDataUrl(null);
    const handleRemoveFavicon = () => setFaviconDataUrl(null);

    const handleGenerateAndDownload = async () => {
        setStatus('generating');
        setMessage('Validating inputs...');

        const requiredFields: (keyof typeof config)[] = ['supabaseUrl', 'supabaseAnonKey', 'veoProxyUrl', 'imagenProxyUrl', 'appName', 'registrationUrl', 'supportUrl'];
        for (const field of requiredFields) {
            if (!config[field]?.trim()) {
                setMessage(`Field '${field}' is required.`);
                setStatus('error');
                return;
            }
        }

        try {
            setMessage('Generating configuration file...');
            
            const finalConfig = {
                ...config,
                proxyServerList: config.proxyServerList.split('\n').map(url => url.trim()).filter(Boolean),
                tableNames,
                customLogoDataUrl: logoDataUrl,
                customFaviconDataUrl: faviconDataUrl,
            };
            
            const fileContent = generateConfigFileContent(finalConfig);
            downloadFile(fileContent, 'config.js', 'application/javascript');
            
            setStatus('success');
            setMessage('config.js has been generated and downloaded. Please upload it to your server root and refresh the page.');

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setMessage(errorMessage);
            setStatus('error');
        }
    };
    
    const tableFields: { key: keyof TableNameConfig, label: string }[] = [
        { key: 'USERS', label: 'Users Table' },
        { key: 'TRIAL_USERS', label: 'Trial Users Table' },
        { key: 'VEO_AUTH_TOKENS', label: 'VEO Auth Tokens Table' },
        { key: 'MASTER_API_KEYS', label: 'Master API Keys Table' },
        { key: 'GENERATED_API_KEYS', label: 'Generated API Keys Table' },
        { key: 'ACTIVITY_LOG', label: 'Activity Log Table' },
        { key: 'VIRAL_PROMPTS', label: 'Viral Prompts Table' },
        { key: 'PROXY_SERVER_THROTTLE', label: 'Proxy Throttle Table' },
    ];

    return (
        <div className="space-y-8">
            {isFirstTimeSetup && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                    Fill in all the details below. This will generate a <code className="font-mono">config.js</code> file for you to place on your server.
                </div>
            )}
            
            {/* Grouped sections */}
            <div className="space-y-6">
                <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Platform Details</h3>
                    <div>
                        <label className="block text-sm font-medium mb-1">Application Name</label>
                        <input name="appName" value={config.appName} onChange={handleConfigChange} className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm"/>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-medium mb-1">Registration URL</label>
                            <input name="registrationUrl" value={config.registrationUrl} onChange={handleConfigChange} className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm"/>
                        </div>
                        <div>
                           <label className="block text-sm font-medium mb-1">Support URL</label>
                            <input name="supportUrl" value={config.supportUrl} onChange={handleConfigChange} className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm"/>
                        </div>
                    </div>
                </div>

                <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Branding &amp; Appearance</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Custom Logo</label>
                            <p className="text-xs text-neutral-500 mb-2">Recommended: SVG/PNG, 5:1 ratio (e.g., 300x60px).</p>
                            <div className="flex items-center gap-4">
                               <label className="cursor-pointer w-40 h-16 bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed rounded-md flex items-center justify-center hover:border-primary-500">
                                   <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                                   {logoDataUrl ? <img src={logoDataUrl} className="max-w-full max-h-full object-contain" /> : <UploadIcon className="w-6 h-6 text-neutral-500"/>}
                               </label>
                               {logoDataUrl && <button onClick={handleRemoveLogo} className="text-sm text-red-500 hover:underline"><TrashIcon className="w-4 h-4"/></button>}
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">Custom Favicon</label>
                            <p className="text-xs text-neutral-500 mb-2">Recommended: 32x32px PNG or ICO.</p>
                            <div className="flex items-center gap-4">
                               <label className="cursor-pointer w-16 h-16 bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed rounded-md flex items-center justify-center hover:border-primary-500">
                                   <input type="file" accept="image/*" className="hidden" onChange={handleFaviconUpload} />
                                   {faviconDataUrl ? <img src={faviconDataUrl} className="w-10 h-10 object-contain" /> : <UploadIcon className="w-6 h-6 text-neutral-500"/>}
                               </label>
                               {faviconDataUrl && <button onClick={handleRemoveFavicon} className="text-sm text-red-500 hover:underline"><TrashIcon className="w-4 h-4"/></button>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 mb-3"><DatabaseIcon className="w-5 h-5"/>Supabase Database</h3>
                    <div>
                        <label className="block text-sm font-medium mb-1">Supabase URL</label>
                        <input name="supabaseUrl" value={config.supabaseUrl} onChange={handleConfigChange} placeholder="https://<your-project-ref>.supabase.co" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Supabase Anon Key</label>
                        <input name="supabaseAnonKey" type="password" value={config.supabaseAnonKey} onChange={handleConfigChange} placeholder="eyJhbGciOi..." className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm"/>
                    </div>
                </div>

                <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 mb-3"><ServerIcon className="w-5 h-5"/>Proxy Servers</h3>
                    <div>
                        <label className="block text-sm font-medium mb-1">Veo Proxy URL</label>
                        <input name="veoProxyUrl" value={config.veoProxyUrl} onChange={handleConfigChange} placeholder="https://veo-proxy.yourdomain.com" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Imagen Proxy URL</label>
                        <input name="imagenProxyUrl" value={config.imagenProxyUrl} onChange={handleConfigChange} placeholder="https://imagen-proxy.yourdomain.com" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Proxy Server List (for Server Selection)</label>
                         <textarea name="proxyServerList" value={config.proxyServerList} onChange={handleConfigChange} placeholder="One URL per line..." rows={3} className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm font-mono"/>
                    </div>
                </div>
                
                 <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 mb-3"><DatabaseIcon className="w-5 h-5"/>Supabase Table Names</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tableFields.map(field => (
                            <div key={field.key}>
                                <label className="block text-sm font-medium mb-1">{field.label}</label>
                                <input name={field.key} value={tableNames[field.key]} onChange={handleTableChange} className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 border rounded-md p-2 text-sm font-mono" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {message && (
                <div className={`p-3 rounded-md text-sm flex items-start gap-2 ${
                    status === 'generating' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' :
                    status === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                    status === 'error' ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' : ''
                }`}>
                    {status === 'success' && <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>}
                    {status === 'error' && <AlertTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>}
                    <p>{message}</p>
                </div>
            )}

            <button
                onClick={handleGenerateAndDownload}
                disabled={status === 'generating'}
                className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex justify-center"
            >
                {status === 'generating' ? <Spinner /> : 'Generate & Download Config File'}
            </button>
        </div>
    );
};

export default ConnectionSettingsPanel;
