import React from 'react'
import { Phone, Mail, CreditCard, Briefcase, User } from 'lucide-react'

export default function FreelancerProfile({
  fullName = "John Doe",
  email = "john@example.com",
  number = "+1 234 567 8900",
  cnic = "1234-5678901-2",
  skill = "Web Development",
  bankAccount = "**** **** **** 1234",
  companyName = "N/A",
  avatar = "/placeholder.svg?height=128&width=128",
  bio = "Passionate freelancer with 5+ years of experience in web development."
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          alt={fullName}
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
          <h1 className="text-3xl font-bold text-darkBlue">{fullName}</h1>
          <p className="text-lightBlue mt-2">{skill}</p>
          <p className="text-gray-600 mt-2">{bio}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem icon={<Mail className="text-orange" />} label="Email" value={email} />
        <InfoItem icon={<Phone className="text-orange" />} label="Phone" value={number} />
        <InfoItem icon={<User className="text-orange" />} label="CNIC" value={cnic} />
        <InfoItem icon={<CreditCard className="text-orange" />} label="Bank Account" value={bankAccount} />
        <InfoItem icon={<Briefcase className="text-orange" />} label="Company" value={companyName} />
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