import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface MembershipCardProps {
  member: {
    id: string;
    name: string;
    fatherName: string;
    mobileNumber: string;
    district: string;
    photoUrl?: string;
    membershipId?: string;
  };
  id?: string;
}

export const MembershipCard = React.forwardRef<HTMLDivElement, MembershipCardProps>(
  ({ member, id }, ref) => {
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 1); // Valid for 1 year

    return (
      <div ref={ref} id={id} className="flex flex-col gap-8 p-4 bg-white" style={{ width: '640px', fontFamily: 'Arial, sans-serif' }}>
        
        {/* FRONT SIDE */}
        <div className="w-[600px] h-[350px] rounded-xl overflow-hidden shadow-sm border border-gray-200 relative flex flex-col bg-white">
            {/* Header */}
            <div className="bg-[#0099cc] text-white px-4 py-2 flex items-center gap-3 h-[85px]">
                <div className="h-16 w-16 bg-white rounded-full overflow-hidden flex items-center justify-center border-2 border-white shrink-0">
                    <img src="/NEP Flag.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-black uppercase tracking-tight leading-none mb-1">National Ex Servicemen Party</h1>
                    <p className="text-xs font-medium opacity-90 tracking-wide">Regd. Under Political Party Act</p>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 flex gap-4 relative bg-gradient-to-br from-white to-gray-50">
                {/* Left: Member Photo */}
                <div className="w-[110px] h-[130px] bg-gray-200 rounded-md overflow-hidden border-2 border-gray-400 shadow-sm shrink-0 self-start mt-2">
                    {member.photoUrl ? (
                        <img src={member.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] text-center">No Photo</div>
                    )}
                </div>

                {/* Middle: Details */}
                <div className="flex-1 space-y-1.5 z-10 pt-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#ff9800] text-lg">★</span>
                        <h2 className="text-[#e65100] font-black text-xl uppercase tracking-wide">Identity Card</h2>
                        <span className="text-[#ff9800] text-lg">★</span>
                    </div>

                    <div className="text-sm space-y-1 text-gray-800 font-medium leading-snug">
                        <div className="flex">
                            <span className="w-28 font-bold text-gray-700">Membership ID:</span>
                            <span className="font-bold text-black">{member.membershipId || "PENDING"}</span>
                        </div>
                        <div className="flex">
                            <span className="w-28 font-bold text-gray-700">Name:</span>
                            <span className="uppercase">{member.name}</span>
                        </div>
                        <div className="flex">
                            <span className="w-28 font-bold text-gray-700">S/O, D/O:</span>
                            <span className="uppercase">{member.fatherName}</span>
                        </div>
                        <div className="flex">
                            <span className="w-28 font-bold text-gray-700">Phone:</span>
                            <span>{member.mobileNumber}</span>
                        </div>
                        <div className="flex">
                            <span className="w-28 font-bold text-gray-700">District:</span>
                            <span className="uppercase">{member.district}</span>
                        </div>
                    </div>

                    <div className="mt-2 pt-1">
                        <QRCodeSVG value={`NEP:${member.membershipId || member.id}`} size={55} />
                    </div>
                </div>

                {/* Right: President Photo */}
                <div className="flex flex-col items-center gap-1 shrink-0 mt-2 mr-2">
                    <div className="w-[75px] h-[75px] rounded-full overflow-hidden border-2 border-[#0099cc] shadow-sm">
                        <img src="/NEP President.jpg" alt="President" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-600 text-center uppercase leading-tight">Party<br/>President</span>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#556b2f] text-white px-5 py-2 flex justify-between items-center text-xs h-[35px] font-semibold tracking-wide">
                <span>Membership Type: Basic Membership</span>
                <span>Valid Until: {validUntil.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
        </div>


        {/* BACK SIDE */}
        <div className="w-[600px] h-[350px] rounded-xl overflow-hidden shadow-sm border border-gray-200 relative flex flex-col bg-[#54796d]">
            
            {/* Declaration Header */}
            <div className="py-4 text-center">
                 <div className="flex items-center justify-center gap-2">
                    <span className="text-yellow-400 text-sm">★</span>
                    <h2 className="text-yellow-400 font-black text-xl uppercase tracking-wider">Member Declaration</h2>
                    <span className="text-yellow-400 text-sm">★</span>
                </div>
            </div>

            {/* Declaration Text */}
            <div className="flex-1 px-8 text-white text-center flex flex-col justify-center gap-4">
                <p className="text-xs leading-relaxed text-justify opacity-95 font-medium">
                    I hereby declare that I will abide by the rules, regulations, and constitution of the National Ex Servicemen Party.
                    I will work for the welfare of ex-servicemen, their families, and the general public. I will uphold the values of
                    discipline, integrity, and service to the nation.
                </p>
                <p className="text-xs leading-relaxed text-justify opacity-95 font-medium">
                    I verify that the information provided is true to the best of my knowledge.
                </p>
            </div>

            {/* Info Section */}
            <div className="px-8 pb-4 grid grid-cols-2 gap-8 text-white mt-auto">
                <div className="text-[10px] space-y-1">
                    <h3 className="text-yellow-400 font-bold uppercase text-xs mb-1">Head Office</h3>
                    <p className="font-bold">National Ex Servicemen Party</p>
                    <p>A4, Vishwaa Pride Apartment,</p>
                    <p>Nookampalayam Main Road,</p>
                    <p>Perumbakkam, Chennai - 600100</p>
                    <p>Tamil Nadu, India</p>
                </div>
                <div className="text-[10px] space-y-1 text-right">
                    <h3 className="text-yellow-400 font-bold uppercase text-xs mb-1">Contact Information</h3>
                    <p>Contact: +91 98765 43210</p>
                    <p>Email: contact@allindianep.com</p>
                    <p>Website: www.allindianep.com</p>
                </div>
            </div>

            {/* Signatures */}
            <div className="px-8 pb-6 flex justify-between items-end mt-2">
                 <div className="flex flex-col items-center gap-1">
                     <div className="w-32 h-[1px] bg-white opacity-50 mb-1"></div>
                     <span className="text-white text-[10px] uppercase tracking-wider">Member Signature</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                     {/* Can add signature image here if available */}
                     <div className="w-32 h-[1px] bg-white opacity-50 mb-1"></div>
                     <span className="text-white text-[10px] uppercase tracking-wider">Authorized Signature</span>
                 </div>
            </div>
             {/* Dashed divider line */}
             <div className="absolute bottom-12 w-[90%] left-[5%] border-b border-dashed border-white/30"></div>
        </div>

      </div>
    );
  }
);

MembershipCard.displayName = "MembershipCard";
