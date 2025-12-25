'use client';

import { QRCodeSVG } from 'qrcode.react';

export interface Member {
  name: string;
  membershipId: string;
  membershipType: string;
  photoUrl?: string;
  district: string;
  state: string;
  mobile: string;
}

export function MembershipCard({ member }: { member: Member }) {
  return (
    <div className="w-[350px] h-[220px] relative rounded-xl overflow-hidden shadow-2xl font-sans text-white select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0093E9] to-[#80D0C7]"></div>
      
      {/* Overlay Pattern/Texture (Optional) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')]"></div>

      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/20 pb-2">
          <img src="/NEP Flag.jpg" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Logo" />
          <div>
            <h2 className="font-bold text-sm leading-tight">NATIONAL EX SERVICEMEN PARTY</h2>
            <p className="text-[10px] opacity-90 tracking-wide">Regd. Under Political Party Act</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-4 mt-2 flex-1">
          {/* Photo */}
          <div className="shrink-0">
            <img 
              src={member.photoUrl || "/placeholder-user.jpg"} 
              className="w-20 h-24 object-cover rounded-md border-2 border-white shadow-md bg-gray-200"
              alt={member.name}
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-1 text-xs">
            <div>
              <p className="opacity-75 text-[10px] uppercase tracking-wider">Name</p>
              <p className="font-bold text-sm truncate">{member.name}</p>
            </div>
            <div>
              <p className="opacity-75 text-[10px] uppercase tracking-wider">Membership ID</p>
              <p className="font-mono font-bold text-yellow-200">{member.membershipId}</p>
            </div>
            <div>
              <p className="opacity-75 text-[10px] uppercase tracking-wider">District</p>
              <p className="font-semibold truncate">{member.district}, {member.state}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col justify-end">
            <div className="bg-white p-1 rounded-md shadow-sm">
              <QRCodeSVG value={`NEP:${member.membershipId}`} size={56} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-2 flex justify-between items-end">
          <div className="bg-black/20 px-2 py-1 rounded text-[10px] font-medium backdrop-blur-sm">
            {member.membershipType}
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium">Party President</p>
            {/* Signature image could go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
