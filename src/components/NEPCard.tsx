
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type LanguageKey = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn';

const translations: Record<LanguageKey, {
  slogan_top: string;
  party_name: string;
  card_type: string;
  label_name: string;
  label_father: string;
  label_id: string;
  bottom_slogan: string;
  back_top_text: string;
  label_district: string;
  district: string;
  label_state: string;
  state: string;
  label_constitution: string;
  constitution: string;
  label_address: string;
  office_address: string;
  sig_label: string;
  label_phone: string;
  phone: string;
  label_email: string;
  email: string;
  label_website: string;
  website: string;
  office_address_short: string;
}> = {
  en: {
    slogan_top: 'Once a Soldier, Always a Servant of the Nation',
    party_name: 'NATIONAL EX SERVICEMEN PARTY',
    card_type: 'Membership Card',
    label_name: 'Name',
    label_father: "Father's Name",
    label_id: 'ID No',
    bottom_slogan: 'Discipline, Integrity, Service',
    back_top_text: 'One goal: Freedom and Service to the Nation!',
    label_district: 'District:',
    district: 'Chennai',
    label_state: 'State:',
    state: 'Tamil Nadu',
    label_constitution: 'Constitution:',
    constitution: 'Indian Constitution',
    label_address: 'Address:',
    office_address: 'National Ex-Servicemen Party\nA4, Vishwaa Pride Apartment, Nookampalayam Main Road,\nPerumbakkam, Chennai - 600100, Tamil Nadu, India',
    sig_label: 'President',
    label_phone: 'Phone',
    phone: '+91 91761 01115, +91 91761 02229',
    label_email: 'Email',
    email: 'allindianep@gmail.com',
    label_website: 'Website',
    website: 'www.allindianep.com',
    office_address_short: 'National Ex-Servicemen Party — A4, Vishwaa Pride Apartment, Nookampalayam Main Road, Perumbakkam, Chennai - 600100'
  },
  ta: {
    slogan_top: 'பாரத எல்லையைக் காத்தோம், இனி மக்களை காப்போம்.',
    party_name: 'தேசிய முன்னாள் இராணுவ வீரர்கள் கட்சி NATIONAL EX SERVICEMEN PARTY (NEP)',
    card_type: 'உறுப்பினர் அட்டை',
    label_name: 'பெயர்',
    label_father: 'தந்தையின் பெயர்',
    label_id: 'அடையாள எண்',
    bottom_slogan: 'அரும்பு, நேர்மை, சேவை',
    back_top_text: 'ஒரே இலக்கு: விடுதலை மற்றும் நாட்டிற்கான சேவை!',
    label_district: 'மாவட்டம்:',
    district: 'சென்னை',
    label_state: 'மாநிலம்:',
    state: 'தமிழ்நாடு',
    label_constitution: 'அரசியல் சாசனம்:',
    constitution: 'இந்திய அரசியல் சாசனம்',
    label_address: 'முகவரி:',
    office_address: 'நேஷனல் எக்ஸ்-சேவிஸ்மென் பார்டி\nA4, விஷ்வா பிரைட் அபார்ட்மெண்ட், நூகம்பாளையம் மென் ரோடு,\nபெரும்பாக்கம், சென்னை - 600100, தமிழ்நாடு, இந்தியா',
    sig_label: 'தலைவர்',
    label_phone: 'தொலைபேசி',
    phone: '+91 91761 01115, +91 91761 02229',
    label_email: 'மின்னஞ்சல்',
    email: 'allindianep@gmail.com',
    label_website: 'இணையதளம்',
    website: 'www.allindianep.com',
    office_address_short: 'நேஷனல் எக்ஸ்-செவிஸ்மென் பார்டி — A4, விஷ்வா பிரைட் அபார்ட்மெண்ட், பெரும்பாக்கம், சென்னை - 600100'
  },
  hi: {
    slogan_top: 'एक सैनिक, हमेशा राष्ट्र का सेवक',
    party_name: 'नेशनल एक्स-सर्विसमेन पार्टी',
    card_type: 'सदस्यता पत्र',
    label_name: 'नाम',
    label_father: 'पिता का नाम',
    label_id: 'आईडी नंबर',
    bottom_slogan: 'अनुशासन, ईमानदारी, सेवा',
    back_top_text: 'एक लक्ष्य: राष्ट्र की आज़ादी और सेवा!',
    label_district: 'ज़िला:',
    district: 'चेन्नई',
    label_state: 'राज्य:',
    state: 'तमिलनाडु',
    label_constitution: 'संविधान:',
    constitution: 'भारतीय संविधान',
    label_address: 'पता:',
    office_address: 'नेशनल एक्स-सर्विसमेन पार्टी\nA4, Vishwaa Pride Apartment, Nookampalayam Main Road,\nPerumbakkam, Chennai - 600100, Tamil Nadu, India',
    sig_label: 'अध्यक्ष',
    label_phone: 'फोन',
    phone: '+91 91761 01115, +91 91761 02229',
    label_email: 'ईमेल',
    email: 'allindianep@gmail.com',
    label_website: 'वेबसाइट',
    website: 'www.allindianep.com',
    office_address_short: 'नेशनल एक्स-सर्विसमेन पार्टी — A4, Vishwaa Pride Apartment, Perumbakkam, Chennai - 600100'
  },
  te: {
    slogan_top: 'ఒక సైనికుడైతే, ఎప్పుడూ దేశ సేవకుడు',
    party_name: 'నేషనల్ ఎక్స్-సర్వీస్మెన్ పార్టీ',
    card_type: 'సభ్యత్వ కార్డు',
    label_name: 'పేరు',
    label_father: 'తండ్రి పేరు',
    label_id: 'ఐడి నం',
    bottom_slogan: 'శ్రద్ధ, నిజాయితీ, సేవ',
    back_top_text: 'ఒక లక్ష్యం: స్వాతంత్ర్యం మరియు దేశ సేవ!',
    label_district: 'జిల్లా:',
    district: 'చెన్నై',
    label_state: 'రాష్ట్రం:',
    state: 'తమిళనాడు',
    label_constitution: 'రూపాయ్యచే:',
    constitution: 'భారత రూపాయ్య',
    label_address: 'చిరునామా:',
    office_address: 'నేషనల్ ఎక్స్-సర్వీస్మెన్ పార్టీ\nA4, Vishwaa Pride Apartment, Nookampalayam Main Road,\nPerumbakkam, Chennai - 600100, Tamil Nadu, India',
    sig_label: ' అధ్యక్షుడు',
    label_phone: 'ఫోన్',
    phone: '+91 91761 01115, +91 91761 02229',
    label_email: 'ఇమెయిల్',
    email: 'allindianep@gmail.com',
    label_website: 'వెబ్‌సైట్',
    website: 'www.allindianep.com',
    office_address_short: 'నేషనల్ ఎక్స్-సర్వీస్మెన్ పార్టీ — A4, Vishwaa Pride Apartment, Perumbakkam, Chennai - 600100'
  },
  ml: {
    slogan_top: 'ഒരു സൈനികൻ ആണെങ്കിൽ, എല്ലായ്പ്പോഴും ദേശത്തിന്റെ സേവകൻ',
    party_name: 'നാഷണൽ എക്‌സ്-സെർവീസ്മെൻ പാർട്ടി',
    card_type: 'എല്ലാം മെമ്പർഷിപ്പ് കാർഡ്',
    label_name: 'പേര്',
    label_father: 'പിതാവിന്റെ പേര്',
    label_id: 'ഐഡി നമ്പർ',
    bottom_slogan: 'ശിഷ്യത്വം, നൈതികത, സേവനം',
    back_top_text: 'ഒറ്റ ലക്ഷ്യം: സ്വാതന്ത്ര്യവും രാജ്യസേവനവും!',
    label_district: 'ജില്ല:',
    district: 'ചെന്നൈ',
    label_state: 'സംസ്ഥാനം:',
    state: 'തമിഴ്നാട്',
    label_constitution: 'ഭരണഘടന:',
    constitution: 'ഇന്ത്യൻ ഭരണഘടന',
    label_address: 'വിലാസം:',
    office_address: 'നാഷണൽ എക്‌സ്-സെർവീസ്മെൻ പാർട്ടി\nA4, Vishwaa Pride Apartment, Nookampalayam Main Road,\nPerumbakkam, Chennai - 600100, Tamil Nadu, India',
    sig_label: 'പ്രസ Ident',
    label_phone: 'ഫോൺ',
    phone: '+91 91761 01115, +91 91761 02229',
    label_email: 'ഇമെയിൽ',
    email: 'allindianep@gmail.com',
    label_website: 'വെബ്‌സൈറ്റ്',
    website: 'www.allindianep.com',
    office_address_short: 'നാഷണൽ എക്‌സ്-സെർവീസ്മെൻ പാർട്ടി — A4, Vishwaa Pride Apartment, Perumbakkam, Chennai - 600100'
  },
  kn: {
    slogan_top: 'ಒಬ್ಬ ಉಭಯ, ಯಾವಾಗಲೂ ರಾಷ್ಟ್ರದ ಸೇವಕ',
    party_name: 'ನ್ಯಾಷನಲ್ ಎಕ್ಸ್-ಸರ್ವೀಸ್‌ಮನ್ ಪಕ್ಷ',
    card_type: 'ಸದಸ್ಯತಾ ಕಾರ್ಡು',
    label_name: 'ಹೆಸರು',
    label_father: 'ತಂದೆ ಹೆಸರು',
    label_id: 'ಐಡಿ ಸಂಖ್ಯೆ',
    bottom_slogan: 'ಶಿಸ್ತಿನತೆ, ಪ್ರಾಮಾಣಿಕತೆ, ಸೇವೆ',
    back_top_text: 'ಒಂದು ಗುರಿ: ಸ್ವಾತಂತ್ರ್ಯ ಮತ್ತು ರಾಷ್ಟ್ರ ಸೇವೆ!',
    label_district: 'ಜಿಲ್ಲೆ:',
    district: 'ಚೆನ್ನೈ',
    label_state: 'ರಾಜ್ಯ:',
    state: 'ತಮಿಳುನಾಡು',
    label_constitution: 'ಸಂವಿಧಾನ:',
    constitution: 'ಭಾರತೀಯ ಸಂವಿಧಾನ',
    label_address: 'ವಿಳಾಸ:',
    office_address: 'ನ್ಯಾಷನಲ್ ಎಕ್ಸ್-ಸರ್ವೀಸ್‌ಮನ್ ಪಕ್ಷ\nA4, Vishwaa Pride Apartment, Nookampalayam Main Road,\nPerumbakkam, Chennai - 600100, Tamil Nadu, India',
    sig_label: 'ಪ್ರೆಸಿಡೆಂಟ್',
    label_phone: 'ಫೋನ್',
    phone: '+91 91761 01115, +91 91761 02229',
    label_email: 'ಇಮೇಲ್',
    email: 'allindianep@gmail.com',
    label_website: 'ವೆಬ್‌ಸೈಟ್',
    website: 'www.allindianep.com',
    office_address_short: 'ನ್ಯಾಷನಲ್ ಎಕ್ಸ್-ಸರ್ವೀಸ್‌ಮನ್ ಪಕ್ಷ — A4, Vishwaa Pride Apartment, Perumbakkam, Chennai - 600100'
  }
};

interface MemberProfile {
  name: string;
  fatherName: string | null;
  phone: string;
  photoUrl: string | null;
  district: string;
  state: string;
  constituency?: string;
  address?: string;
  membershipType: string;
  membershipId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'pending' | 'active' | 'rejected';
  membershipValidUntil: string | null;
  wing?: string;
}

interface NEPCardProps {
  member: MemberProfile;
}

const NEPCard: React.FC<NEPCardProps> = ({ member }) => {
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const [qrCodeValue, setQrCodeValue] = useState<string>('');
  const [currentLang, setCurrentLang] = useState<LanguageKey>('ta');
  const cardRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang] || translations.ta;

  useEffect(() => {
    const qrData = JSON.stringify({
      membershipId: member.membershipId,
      name: member.name,
      phone: member.phone,
      district: member.district,
      state: member.state,
    });
    setQrCodeValue(qrData);
  }, [member]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card Side Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCurrentSide('front')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentSide === 'front'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Front Side
        </button>
        <button
          onClick={() => setCurrentSide('back')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentSide === 'back'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Back Side
        </button>
      </div>

      {/* Card Container */}
      <div
        ref={cardRef}
        className={`nep-card ${currentSide === 'back' ? 'back' : ''} relative`}
        style={{
          width: '700px',
          height: '420px',
          background: 'linear-gradient(135deg, #647020, #7f9e4a)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          borderRadius: '6px',
          overflow: currentSide === 'back' ? 'visible' : 'hidden',
          position: 'relative',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("/card/background.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 0.2,
            zIndex: 0,
          }}
        />

        {currentSide === 'front' ? (
          <>
            {/* Front Side - Top Row */}
            <div
              className="top-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px 22px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#39B5E8',
                position: 'relative',
                zIndex: 10,
              }}
            >
              <img
                src="/card/netaji.png"
                alt="NEP Logo"
                className="top-icon-left"
                style={{
                  height: '96px',
                  width: '96px',
                  objectFit: 'cover',
                  marginRight: '22px',
                  marginLeft: '8px',
                }}
              />
              <div className="party-title-container" style={{ flexGrow: 1, textAlign: 'center' }}>
                <p className="slogan-top" style={{ fontSize: '20px',fontWeight: 800, color: '#000', margin: '0 0 6px 0' }}>
                  தேசிய முன்னாள் இராணுவ வீரர்கள் கட்சி 
                </p>
                <h1 className="party-name" style={{ color: '#000', margin: '2px 0', fontSize: '20px', fontWeight: 800, letterSpacing: '1px' }}>
                  NATIONAL EX SERVICEMEN PARTY (NEP)
                </h1>
                <p className="card-type" style={{ fontSize: '15px', margin: 0, color: '#000', fontWeight: 600 }}>
                  உறுப்பினர் அட்டை/ MEMBER CARD
                </p>
              </div>
            </div>

            {/* Front Side - Middle Row */}
            <div
              className="middle-row"
              style={{
                display: 'flex',
                padding: '18px 26px',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 10,
              }}
            >
              {/* Member Info */}
              <div className="info-fields" style={{ marginTop: '0px', width: '68%', marginRight: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
                <div className="field" style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="label" style={{ fontWeight: 700, color: '#222', fontSize: '13px' }}>உறுப்பினர் எண்/ID:</span>
                  <span className="value" style={{ fontWeight: 800, color: '#ffffff', fontSize: '15px' }}>{member.membershipId}</span>
                </div>
                <div className="field" style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="label" style={{ fontWeight: 700, color: '#222', fontSize: '13px' }}>பெயர்/Name:</span>
                  <span className="value" style={{ fontWeight: 800, color: '#ffffff', fontSize: '15px' }}>{member.name}</span>
                </div>
                <div className="field" style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="label" style={{ fontWeight: 700, color: '#222', fontSize: '13px' }}>தந்தையின் பெயர்/Father:</span>
                  <span className="value" style={{ fontWeight: 800, color: '#ffffff', fontSize: '15px' }}>{member.fatherName || 'N/A'}</span>
                </div>
                <div className="field" style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="label" style={{ fontWeight: 700, color: '#222', fontSize: '13px' }}>பிரிவு/Wing:</span>
                  <span className="value" style={{ fontWeight: 800, color: '#ffffff', fontSize: '15px' }}>{member.wing || 'N/A'}</span>
                </div>
              </div>

              {/* Member Photo */}
              <div
                className="member-photo-box"
                style={{
                  width: '150px',
                  height: '180px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                }}
              >
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    No Photo
                  </div>
                )}
              </div>
            </div>

            {/* Front Side - Bottom Banner */}
            <div
              className="bottom-banner"
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                background: 'white',
                color: 'black',
                height: '66px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                zIndex: 10,
              }}
            >
              <img
                src="/card/logo.jpg"
                alt="Netaji"
                className="bottom-logo"
                style={{
                  height: '46px',
                  background: 'transparent',
                  borderRadius: 0,
                  padding: '3px',
                  boxShadow: '0 2px 6px rgba(189, 148, 148, 0.04)',
                  marginLeft: '8px',
                }}
              />
              <p className="bottom-slogan" style={{ fontSize: '15px', marginLeft: '18px', fontWeight: 700 }}>
              ஒரே தேசம் ஒரே மக்கள் ஒரே கட்சி - ONE NATION ONE PEOPLE ONE PARTY
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Back Side - Top Text */}
            <div
              className="top-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px 22px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#39B5E8',
                position: 'relative',
                zIndex: 10,
              }}
            >
              <img
                src="/card/netaji.png"
                alt="NEP Logo"
                className="top-icon-left"
                style={{
                  height: '96px',
                  width: '96px',
                  objectFit: 'cover',
                  marginRight: '22px',
                  marginLeft: '8px',
                }}
              />
              <div className="party-title-container" style={{ flexGrow: 1, textAlign: 'center' }}>
                <p className="slogan-top" style={{ fontSize: '20px',fontWeight: 800, color: '#000', margin: '0 0 6px 0' }}>
                  தேசிய முன்னாள் இராணுவ வீரர்கள் கட்சி 
                </p>
                <h1 className="party-name" style={{ color: '#000', margin: '2px 0', fontSize: '20px', fontWeight: 800, letterSpacing: '1px' }}>
                  NATIONAL EX SERVICEMEN PARTY (NEP)
                </h1>
              </div>
            </div>

            {/* Back Side - Details */}
            <div
              className="back-details"
              style={{
                display: 'flex',
                padding: '6px 26px',
                gap: '24px',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 10,
              }}
            >
             
              {/* Address Fields */}
              <div
                className="address-fields"
                style={{
                  fontSize: '11px',
                  lineHeight: 1.4,
                  width: 'calc(100% - 220px)',
                  color: '#222',
                  paddingTop: '6px',
                }}
              >
                <p style={{ margin: '4px 0' }}><strong>முகவரி/Address:</strong></p>
                <p style={{ margin: '4px 0' }}>{member.name}</p>
                <p style={{ margin: '4px 0' }}>{member.district}, {member.state}</p>
                <p style={{ margin: '4px 0' }}>{member.address}</p>
                <p className="address-text" style={{ marginTop: '8px' }}>
                  <strong>கட்சி அலுவலக முகவரி/ Party Office Address:</strong><br />
                  <strong style={{ fontSize: '10px' }}>National Ex-Servicemen Party</strong><br />
                  A4, Vishwaa Pride Apartment, Nookampalayam Main Road,<br />
                  Perumbakkam, Chennai - 600100, Tamil Nadu, India<br />
                  <strong style={{ fontSize: '10px', marginTop: '4px', display: 'block' }}>நேஷனல் எக்ஸ்-சேவிஸ்மென் பார்டி</strong>
                  A4, விஷ்வா பிரைட் அபார்ட்மெண்ட், நூகம்பாளையம் மென் ரோடு,<br />
                  பெரும்பாக்கம், சென்னை தமிழ்நாடு, இந்தியா - 600100.
                </p>
              </div>

               {/* QR Code */}
              <div className="qr-section" style={{ width: '110px', display: 'flex', justifyContent: 'center', background: '#fff', padding: '6px' }}>
                <QRCodeSVG value={qrCodeValue} size={92} includeMargin={false} />
              </div>
            </div>

            {/* Signature Section */}
            <div
              className="signature-section"
              style={{
                position: 'absolute',
                bottom: '66px',
                left: '22px',
                width: 'auto',
              }}
            >
              <img
                src="/card/signature.png"
                alt="Signature"
                className="signature-img"
                style={{ height: '100px', width: 'auto', display: 'block', marginBottom: '-10px' }}
              />
              <p className="sig-label" style={{ borderTop: '1px solid rgba(0,0,0,0.12)', fontSize: '11px', paddingTop: '4px', fontWeight: 700, color: '#111' }}>
                தலைவர் கையொப்பம்/President Signature
              </p>
            </div>

            {/* President Portrait */}
            <img
              src="/card/president.png"
              alt="President"
              className="president-portrait"
              style={{
                position: 'absolute',
                bottom: '66px',
                right: '1px',
                height: '145px',
                opacity: 1,
                width: 'auto',
                zIndex: 12,
              }}
            />

            {/* Footer Banner - Similar to Front Side */}
            <div
              className="bottom-banner"
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                background: 'white',
                color: 'black',
                height: '66px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                zIndex: 10,
              }}
            >
              <img
                src="/card/logo.jpg"
                alt="Netaji"
                className="bottom-logo"
                style={{
                  height: '46px',
                  background: 'transparent',
                  borderRadius: 0,
                  padding: '3px',
                  boxShadow: '0 2px 6px rgba(189, 148, 148, 0.04)',
                  marginLeft: '8px',
                }}
              />
              <div className="footer-contact-info" style={{ marginLeft: '18px', display: 'flex', gap: '30px', fontSize: '9px', fontWeight: 600 }}>
                <span>www.allindianep.com</span>
                <span>allindianep@gmail.com</span>
                <span>+91 9176101115, +91 9176102229</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NEPCard;
