'use client';

import { useLanguage } from "@/context/language-context";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface PolicyLeader {
  id: string;
  name: string;
  nameInTamil: string;
  title: string;
  titleInTamil: string;
  image: string;
}

export function PolicyLeaders() {
  const { t } = useLanguage();

  const leaders: PolicyLeader[] = [
    {
      id: 1,
      name: "Policy Leader Name",
      nameInTamil: "கொள்கை தலைவர் பெயர்",
      title: "Position Title",
      titleInTamil: "பொறுப்பு பெயர்",
      image: "/policy-leader-1.jpg",
    },
    {
      id: 2,
      name: "Policy Leader Name",
      nameInTamil: "கொள்கை தலைவர் பெயர்",
      title: "Position Title",
      titleInTamil: "பொறுப்பு பெயர்",
      image: "/policy-leader-2.jpg",
    },
    {
      id: 3,
      name: "Policy Leader Name",
      nameInTamil: "கொள்கை தலைவர் பெயர்",
      title: "Position Title",
      titleInTamil: "பொறுப்பு பெயர்",
      image: "/policy-leader-3.jpg",
    },
    {
      id: 4,
      name: "Policy Leader Name",
      nameInTamil: "கொள்கை தலைவர் பெயர்",
      title: "Position Title",
      titleInTamil: "பொறுப்பு பெயர்",
      image: "/policy-leader-4.jpg",
    },
  ];

  return (
    <section id="policy-leaders" className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            {t('policy_leaders_title') || 'Policy Leaders'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('policy_leaders_subtitle') || 'Meet our visionary policy leaders driving the party forward'}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            கொள்கை தலைவர்கள் - நாட்டின் ভविष्यत् দिशा निर्देशन करते हैं
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <Card 
              key={leader.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-primary/20"
            >
              <div className="relative h-64 md:h-72 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                {leader.image && leader.image !== "/policy-leader-1.jpg" ? (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/30 rounded-full mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Photo</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 text-center space-y-3 bg-white">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{leader.name}</h3>
                  <p className="text-sm text-foreground font-medium">{leader.nameInTamil}</p>
                </div>
                <div className="border-t border-primary/20 pt-3">
                  <p className="text-sm font-semibold text-primary">{leader.title}</p>
                  <p className="text-sm text-secondary font-medium">{leader.titleInTamil}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
            {t('policy_leaders_vision') || 'Our Policy Vision'}
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            {t('policy_leaders_vision_text') || 'Our policy leaders work collaboratively to develop comprehensive strategies that serve the nation and strengthen our party\\'s vision for a better future.'}
          </p>
        </div>
      </div>
    </section>
  );
}
