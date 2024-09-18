import React from 'react'
import { Mail, User, Building, FileText, Briefcase, Shield } from 'lucide-react'

export default function CompanyProfile({
  companyName = "Acme Corporation",
  pocName = "Jane Smith",
  pocId = "POC-12345",
  companyNtn = "NTN-7890123",
  email = "contact@acme.com",
  bio = "Leading innovation in technology solutions for over a decade.",
  avatar = "/placeholder.svg?height=128&width=128"
}) {
  return (
    <div className="bg-gray-200 px-6 py-12 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          alt={companyName}
          className="rounded-full h-32 w-32 object-cover border-4 border-orange"
          height="128"
          src={avatar}
          style={{
            aspectRatio: "128/128",
            objectFit: "cover",
          }}
          width="128"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-darkBlue">{companyName}</h1>
          <p className="text-lightBlue mt-2">{pocName}</p>
          <p className="text-gray-600 mt-2">{bio}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem icon={<Mail className="text-orange" />} label="Email" value={email} />
        <InfoItem icon={<User className="text-orange" />} label="POC Name" value={pocName} />
        <InfoItem icon={<Shield className="text-orange" />} label="POC ID" value={pocId} />
        <InfoItem icon={<FileText className="text-orange" />} label="Company NTN" value={companyNtn} />
        <InfoItem icon={<Building className="text-orange" />} label="Company Name" value={companyName} />
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2 p-3 bg-white rounded-md shadow">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-darkBlue">{value}</p>
      </div>
    </div>
  )
}