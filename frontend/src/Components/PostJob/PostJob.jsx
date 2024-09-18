import React, { useState } from 'react'
import { Save, DollarSign, Clock, Users } from 'lucide-react'
import { getCurrentCompany } from '../../utils'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const company = getCurrentCompany()

export default function PostJob() {


  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: 'Looking for a',
    description: '',
    projectType: 'one-time',
    experienceLevel: 'entry',
    jobCategory: '',
    skills: [],
    budget: '',
    duration: '',
    numberOfFreelancers: '1',
    postedBy: company._id
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setJobData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim())
    setJobData(prevData => ({
      ...prevData,
      skills
    }))
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API URL
      const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/jobs/post-job`;

      const response = await axios.post(apiUrl, jobData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // If success.
      console.log(response.data);
      setJobData({}); // Reset form data
      // Redirect if using React Router
      navigate("/company-dashboard/jobs-posted")
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };


  return (
    <div className="bg-gray-200 px-6 py-12 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-darkBlue mb-8">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <select
              id="projectType"
              name="projectType"
              value={jobData.projectType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
            >
              <option value="one-time">One-time project</option>
              <option value="ongoing">Ongoing project</option>
            </select>
          </div>

          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={jobData.experienceLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
            >
              <option value="entry">Entry</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700 mb-1">Job Category</label>
          <input
            type="text"
            id="jobCategory"
            name="jobCategory"
            value={jobData.jobCategory}
            onChange={handleChange}
            required
            placeholder="e.g., Web Development, Graphic Design, Content Writing"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={jobData.skills.join(', ')}
            onChange={handleSkillsChange}
            required
            placeholder="e.g., JavaScript, React, Node.js"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="number"
                id="budget"
                name="budget"
                value={jobData.budget}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
              />
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Project Duration</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="duration"
                name="duration"
                value={jobData.duration}
                onChange={handleChange}
                placeholder="e.g., 3 months"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="numberOfFreelancers" className="block text-sm font-medium text-gray-700 mb-1">Number of Freelancers Needed</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="number"
              id="numberOfFreelancers"
              name="numberOfFreelancers"
              value={jobData.numberOfFreelancers}
              onChange={handleChange}
              min="1"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-orange text-white rounded-md hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange transition-colors duration-200"
          >
            <Save className="inline-block mr-2 h-5 w-5" />
            Post Job
          </button>
        </div>
      </form>
    </div>
  )
}