import React from 'react';
import ConnectionSettingsPanel from './ConnectionSettingsPanel';
import DynamicLogo from '../common/DynamicLogo';

const FirstTimeSetupView: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <DynamicLogo className="w-48 h-12 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Welcome! Let's Set Up Your Platform.</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                        This is a one-time setup. Please provide the necessary details to connect your application to its services.
                    </p>
                </div>

                <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800">
                    <ConnectionSettingsPanel isFirstTimeSetup={true} />
                </div>
                
                <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400 p-4 bg-neutral-200 dark:bg-neutral-800/50 rounded-lg">
                    <h3 className="font-semibold">What happens next?</h3>
                    <p className="mt-2">
                        After you click "Generate &amp; Download Config File", a file named <code className="font-mono bg-neutral-300 dark:bg-neutral-700 px-1 rounded">config.js</code> will be downloaded.
                    </p>
                    <p className="mt-1">
                        You must upload this file to the root directory of your web server, in the same folder as <code className="font-mono bg-neutral-300 dark:bg-neutral-700 px-1 rounded">index.html</code>.
                    </p>
                    <p className="mt-1">
                        Once uploaded, simply refresh this page, and your application will be live.
                    </p>
                    <p className="mt-4 font-semibold">To re-configure later, you must delete the <code className="font-mono bg-neutral-300 dark:bg-neutral-700 px-1 rounded">config.js</code> file from your server and refresh the page to see this setup screen again.</p>
                </div>
            </div>
        </div>
    );
};

export default FirstTimeSetupView;
