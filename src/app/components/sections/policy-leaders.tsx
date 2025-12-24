'use client';

import { useLanguage } from "@/context/language-context";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface PrincipleLeader {
  id: string;
  name: string;
  nameInTamil: string;
  image: string;
  principles: string;
  principlesTamil: string;
}

export function PolicyLeaders() {
  const { t } = useLanguage();
  const [selectedLeader, setSelectedLeader] = useState<PrincipleLeader | null>(null);

  const leaders: PrincipleLeader[] = [
    {
      id: "ambedkar",
      name: "Dr. B. R. Ambedkar",
      nameInTamil: "டாக்டர் பி.ஆர். அம்பேத்கர்",
      image: "/Policy leaders/Ambedkar.jpg",
      principles: "Social justice, equality, constitutional democracy.",
      principlesTamil: "சமூக நீதி, சமத்துவம், அரசியலமைப்பு ஆட்சி."
    },
    {
      id: "netaji",
      name: "Netaji Subhas Chandra Bose",
      nameInTamil: "நேதாஜி சுபாஸ் சந்திர போஸ்",
      image: "/Policy leaders/Netaji.png",
      principles: "Nationalism, courage, sacrifice for freedom.",
      principlesTamil: "தேசபற்று, துணிச்சல், தியாகம்."
    },
    {
      id: "kamarajar",
      name: "K. Kamarajar",
      nameInTamil: "காமராஜர்",
      image: "/Policy leaders/Kamarajar.jpg",
      principles: "Education for all, simple governance, integrity.",
      principlesTamil: "கல்வி, எளிய ஆட்சி, நேர்மை."
    },
    {
      id: "thevar",
      name: "Pasumpon Muthuramalinga Thevar",
      nameInTamil: "பசும்பொன் முத்துராமலிங்க தேவர்",
      image: "/Policy leaders/Muthuramalinga_Thevar.jpg",
      principles: "Tamil pride, leadership, courage.",
      principlesTamil: "தமிழ் அடையாளம், தலைமை, துணிச்சல்."
    },
    {
      id: "kalam",
      name: "Dr. A. P. J. Abdul Kalam",
      nameInTamil: "டாக்டர் அப்துல் கலாம்",
      image: "/Policy leaders/Abdul_Kalam.jpg",
      principles: "Visionary thinking, youth empowerment, science.",
      principlesTamil: "தூரநோக்கு, இளைஞர் சக்தி, அறிவியல்."
    }
  ];

  return (
    <section id="policy-leaders" className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            {t('principle_leaders_title') || 'Principle Leaders'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('policy_leaders_subtitle') || 'Guided by the vision of our great national leaders'}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            கட்சி கொள்கை தலைவர்கள்
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {leaders.map((leader) => (
            <Card 
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-primary/20 group"
            >
              <div className="relative h-64 md:h-72 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
                        View Principles
                    </span>
                </div>
                {leader.image ? (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
              
              <div className="p-4 text-center space-y-2 bg-white">
                <div>
                  <h3 className="font-bold text-lg text-foreground leading-tight">{leader.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium mt-1">{leader.nameInTamil}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedLeader && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 animate-in fade-in duration-200" onClick={() => setSelectedLeader(null)}>
            <div 
              className="bg-white rounded-xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
              >
                ✕
              </button>

              <div className="text-center space-y-6">
                <div className="relative w-32 h-32 mx-auto">
                    <Image
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    fill
                    className="rounded-full object-cover border-4 border-primary/10 shadow-md"
                    />
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-primary">{selectedLeader.name}</h3>
                    <p className="font-medium text-lg text-muted-foreground mt-1">
                    {selectedLeader.nameInTamil}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-3">
                  <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Principles</p>
                      <p className="text-base font-medium text-foreground leading-relaxed">
                        {selectedLeader.principles}
                      </p>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">கொள்கைகள்</p>
                      <p className="text-base font-medium text-secondary leading-relaxed">
                        {selectedLeader.principlesTamil}
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {t('policy_leaders_vision') || 'Our Policy Vision'}
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed mb-6">
            NEP party functions with the objective of implementing the policies of India's great leaders and their sacrifice, integrity, and social vision in today's politics.
          </p>
           <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            NEP கட்சி, இந்தியாவின் மகத்தான தலைவர்களின் கொள்கைகளையும் அவர்களின் தியாகம், நேர்மை, சமூகப் பார்வை ஆகியவற்றையும் இன்றைய அரசியலில் நடைமுறைப்படுத்தும் நோக்கத்துடன் செயல்படுகிறது.
          </p>
        </div>
      </div>
    </section>
  );
}
