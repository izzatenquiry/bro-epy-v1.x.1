import React from 'react';
import { 
    CheckCircleIcon, XIcon, InformationCircleIcon, KeyIcon, CreditCardIcon, LightbulbIcon,
    ImageIcon, VideoIcon, MegaphoneIcon, RobotIcon, LibraryIcon, SettingsIcon,
    GalleryIcon, AlertTriangleIcon
} from '../Icons';
import { getTranslations } from '../../services/translations';
import { type Language } from '../../types';

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }> = ({ title, children, icon: Icon }) => (
    <div className="py-6 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0">
        <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-4 sm:text-2xl flex items-center gap-3">
            {Icon && <Icon className="w-6 h-6 text-primary-500 flex-shrink-0" />}
            {title}
        </h3>
        <div className="space-y-4 text-neutral-600 dark:text-neutral-300">{children}</div>
    </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-6">
        <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-2">{title}</h4>
        <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
);

interface GetStartedViewProps {}

const GetStartedView: React.FC<GetStartedViewProps> = () => {
    // Assuming a default or context-provided language
    const language: Language = 'en'; 
    const T = getTranslations(language).getStartedPage;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-left mb-10">
                <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl" dangerouslySetInnerHTML={{ __html: T.mainTitle }} />
                <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400" dangerouslySetInnerHTML={{ __html: T.mainSubtitle }} />
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-lg shadow-lg">
                <Section title={T.section1.title} icon={InformationCircleIcon}>
                    <p dangerouslySetInnerHTML={{ __html: T.section1.p1 }} />
                    <ul className="list-disc pl-5 space-y-2">
                        {T.section1.ul.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                    </ul>
                    <p dangerouslySetInnerHTML={{ __html: T.section1.p2 }} />
                </Section>

                <Section title={T.section2.title} icon={KeyIcon}>
                    <SubSection title={T.section2.sub1_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section2.sub1_p1 }} />
                    </SubSection>
                    <SubSection title={T.section2.sub2_title}>
                        <p className="font-semibold text-green-600 dark:text-green-400" dangerouslySetInnerHTML={{ __html: T.section2.sub2_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section2.sub2_p2 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section2.sub2_p3 }} />
                    </SubSection>
                </Section>
                
                <Section title={T.section3.title} icon={CreditCardIcon}>
                    <p className="font-semibold" dangerouslySetInnerHTML={{ __html: T.section3.p1 }} />
                    <ul className="list-disc pl-5 space-y-2">
                        {T.section3.ul.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                    </ul>
                </Section>
                
                <Section title={T.section4.title} icon={LightbulbIcon}>
                    <p dangerouslySetInnerHTML={{ __html: T.section4.p1 }} />
                    <ul className="list-disc pl-5 space-y-2">
                        {T.section4.ul.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                    </ul>
                </Section>
                
                <Section title={T.section5.title} icon={ImageIcon}>
                    <p dangerouslySetInnerHTML={{ __html: T.section5.p1 }} />
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-green-300 dark:border-green-700 rounded-lg bg-green-50 dark:bg-green-900/20">
                            <h5 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5" />
                                {T.section5.canDoTitle}
                            </h5>
                            <ul className="list-disc pl-5 space-y-1 mt-3 text-sm">
                                {T.section5.canDo.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                            </ul>
                        </div>
                        <div className="p-4 border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
                            <h5 className="font-bold text-red-800 dark:text-red-300 flex items-center gap-2">
                                <XIcon className="w-5 h-5" />
                                {T.section5.cannotDoTitle}
                            </h5>
                            <ul className="list-disc pl-5 space-y-1 mt-3 text-sm">
                                {T.section5.cannotDo.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                            </ul>
                        </div>
                    </div>
                     <SubSection title={T.section5.safetyFiltersTitle}>
                        <p dangerouslySetInnerHTML={{ __html: T.section5.safetyFiltersP1 }} />
                         <ul className="list-disc pl-5 space-y-2">
                            {T.section5.safetyFiltersUl.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                        <p dangerouslySetInnerHTML={{ __html: T.section5.safetyFiltersP2 }} />
                    </SubSection>
                </Section>

                <Section title={T.section6.title} icon={VideoIcon}>
                    <p dangerouslySetInnerHTML={{ __html: T.section6.p1 }} />
                    <SubSection title={T.section6.sub1_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub1_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub1_p2 }} />
                    </SubSection>
                    <SubSection title={T.section6.sub2_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub2_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub2_p2 }} />
                    </SubSection>
                    <SubSection title={T.section6.sub3_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub3_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub3_p2 }} />
                    </SubSection>
                    <SubSection title={T.section6.sub4_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub4_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section6.sub4_p2 }} />
                    </SubSection>
                </Section>
                
                <Section title={T.section7.title} icon={MegaphoneIcon}>
                    <p dangerouslySetInnerHTML={{ __html: T.section7.p1 }} />
                    <SubSection title={T.section7.sub1_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section7.sub1_p1 }} />
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            {T.section7.sub1_ul.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                    </SubSection>
                    <SubSection title={T.section7.sub2_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section7.sub2_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section7.sub2_p2 }} />
                    </SubSection>
                    <SubSection title={T.section7.sub3_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section7.sub3_p1 }} />
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                            {T.section7.sub3_ol.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ol>
                    </SubSection>
                    <SubSection title={T.section7.sub4_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section7.sub4_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section7.sub4_p2 }} />
                    </SubSection>
                </Section>
                
                <Section title={T.section8.title} icon={LibraryIcon}>
                    <p dangerouslySetInnerHTML={{ __html: T.section8.p1 }} />
                    <SubSection title={T.section8.sub1_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section8.sub1_p1 }} />
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            {T.section8.sub1_ul.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                        <p dangerouslySetInnerHTML={{ __html: T.section8.sub1_p2 }} />
                    </SubSection>
                </Section>
                
                <Section title={T.section9.title} icon={SettingsIcon}>
                    <SubSection title={T.section9.sub1_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section9.sub1_p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: T.section9.sub1_p2 }} />
                    </SubSection>
                    <SubSection title={T.section9.sub2_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section9.sub2_p1 }} />
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                           {T.section9.sub2_ul.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                        <p dangerouslySetInnerHTML={{ __html: T.section9.sub2_p2 }} />
                    </SubSection>
                </Section>
                
                <Section title={T.section10.title} icon={GalleryIcon}>
                    <SubSection title={T.section10.sub1_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section10.sub1_p1 }} />
                    </SubSection>
                    <SubSection title={T.section10.sub2_title}>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                           {T.section10.sub2_ul.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ul>
                    </SubSection>
                    <SubSection title={T.section10.sub3_title}>
                        <p dangerouslySetInnerHTML={{ __html: T.section10.sub3_p1 }} />
                    </SubSection>
                </Section>
                
                <div className="mt-8 text-center text-lg text-neutral-600 dark:text-neutral-300">
                    <p dangerouslySetInnerHTML={{ __html: T.conclusion }} />
                </div>
            </div>
        </div>
    );
};

export { GetStartedView };