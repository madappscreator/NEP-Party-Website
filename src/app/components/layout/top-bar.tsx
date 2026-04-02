import { LanguageSwitcher } from "../shared/language-switcher";

export function TopBar() {
    return (
        <div className="fixed top-0 z-50 w-full h-10 bg-primary text-primary-foreground flex items-center justify-center text-sm">
            <div className="container flex items-center justify-between">
                <p className="font-medium">
                    <span className="hidden sm:inline">सेवा • अनुशासन • राष्ट्र प्रथम</span>
                    <span className="sm:hidden">Service • Discipline • Nation First</span>
                    <span className="hidden sm:inline"> • Service • Discipline • Nation First</span>
                </p>
                <div className="md:hidden">
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    )
}
