import Image from "next/image";
import { Quote } from "lucide-react";

export function Leadership() {
    const founderImage = "https://picsum.photos/seed/founder/400/400";
    return (
        <section id="leadership" className="bg-muted py-12 md:py-24">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                     <Image
                        src={founderImage}
                        alt="Founder President — Lion. Dr. Suresh Babu"
                        width={400}
                        height={400}
                        className="rounded-lg object-cover shadow-xl"
                        data-ai-hint="portrait man leader"
                    />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary">Founder President — Lion. Dr. Suresh Babu</h3>
                    <p className="text-muted-foreground text-lg">
                        Born and raised in Ranipet district of Tamil Nadu, with patriotism flowing in his blood, he reformulated his own unique policy and joined the Indian Army as a warrior. Through rigorous training and hard work, he served in various departments including DRDO.
                    </p>
                    <div className="border-l-4 border-primary pl-4 py-2 space-y-2">
                        <Quote className="h-8 w-8 text-primary/50" />
                         <p className="text-xl font-medium italic text-foreground">
                            “I have decided to voice the rights of all sections of society beyond caste and religion. He resolved to unite farmers, general public, workers along with ex-servicemen.”
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
