import React from 'react';
import { MASTER_CONFIG } from '../../services/configService';
import { LogoIcon } from '../Icons';

interface DynamicLogoProps {
    className?: string;
}

const DynamicLogo: React.FC<DynamicLogoProps> = ({ className }) => {
    if (MASTER_CONFIG.customLogoDataUrl) {
        return (
            <img 
                src={MASTER_CONFIG.customLogoDataUrl} 
                alt="Custom Logo" 
                className={className}
                style={{ height: '100%', objectFit: 'contain' }}
            />
        );
    }

    return <LogoIcon className={className} />;
};

export default DynamicLogo;