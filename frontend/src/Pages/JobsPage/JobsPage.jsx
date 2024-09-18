import React from 'react'
import { Job } from '../../Components'
import { motion } from 'framer-motion';

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  // retrieve jobs from database as an array, loop through an array and pass each property to `Job` as a prop
  // const jobs = [
  //   {
  //     title: "Backend Developer",
  //     description: "Looking for a Backend Developer for my e-commerce site. The role requires experience with Node.js and MongoDB to build and maintain our backend infrastructure.",
  //     projectType: "ongoing",
  //     experienceLevel: "intermediate",
  //     jobCategory: "Web Development",
  //     budget: 100,
  //     duration: "1 month",
  //     numberOfFreelancers: 1,
  //     skills: ["Node.js", "MongoDB"],
  //   },
  //   {
  //     title: "Frontend Developer",
  //     description: "Seeking a Frontend Developer to create an intuitive user interface for our platform using React and Tailwind CSS.",
  //     projectType: "one-time",
  //     experienceLevel: "expert",
  //     jobCategory: "UI/UX Design",
  //     budget: 200,
  //     duration: "2 weeks",
  //     numberOfFreelancers: 1,
  //     skills: ["React", "Tailwind CSS"],
  //   },
  //   {
  //     title: "Full Stack Developer",
  //     description: "Looking for a Full Stack Developer with experience in both frontend and backend technologies for a long-term project.",
  //     projectType: "ongoing",
  //     experienceLevel: "intermediate",
  //     jobCategory: "Web Development",
  //     budget: 500,
  //     duration: "6 months",
  //     numberOfFreelancers: 2,
  //     skills: ["React", "Node.js", "MongoDB"],
  //   },
  //   {
  //     title: "Mobile App Developer",
  //     description: "Need a developer to build a cross-platform mobile application using React Native for both iOS and Android.",
  //     projectType: "one-time",
  //     experienceLevel: "entry",
  //     jobCategory: "Mobile Development",
  //     budget: 300,
  //     duration: "3 months",
  //     numberOfFreelancers: 1,
  //     skills: ["React Native", "JavaScript"],
  //   },
  //   {
  //     title: "DevOps Engineer",
  //     description: "Hiring a DevOps Engineer to set up and maintain CI/CD pipelines and AWS infrastructure for our application.",
  //     projectType: "ongoing",
  //     experienceLevel: "expert",
  //     jobCategory: "Cloud Computing",
  //     budget: 150,
  //     duration: "2 months",
  //     numberOfFreelancers: 1,
  //     skills: ["AWS", "Docker", "Kubernetes"],
  //   },
  //   {
  //     title: "Data Scientist",
  //     description: "Looking for a Data Scientist with expertise in machine learning algorithms and data analysis using Python.",
  //     projectType: "ongoing",
  //     experienceLevel: "intermediate",
  //     jobCategory: "Data Science",
  //     budget: 350,
  //     duration: "4 months",
  //     numberOfFreelancers: 2,
  //     skills: ["Python", "Machine Learning", "Pandas"],
  //   },
  //   {
  //     title: "UI/UX Designer",
  //     description: "We need a UI/UX designer to revamp our website's user experience, focusing on user flows and interactions.",
  //     projectType: "one-time",
  //     experienceLevel: "intermediate",
  //     jobCategory: "Design",
  //     budget: 250,
  //     duration: "1 month",
  //     numberOfFreelancers: 1,
  //     skills: ["Figma", "Adobe XD", "Wireframing"],
  //   },
  //   {
  //     title: "SEO Specialist",
  //     description: "Looking for an SEO specialist to optimize our website for better ranking and performance across search engines.",
  //     projectType: "ongoing",
  //     experienceLevel: "entry",
  //     jobCategory: "Marketing",
  //     budget: 100,
  //     duration: "6 months",
  //     numberOfFreelancers: 1,
  //     skills: ["SEO", "Google Analytics", "Keyword Research"],
  //   },
  //   {
  //     title: "Content Writer",
  //     description: "Hiring a content writer to create engaging blog posts and articles for our tech platform.",
  //     projectType: "one-time",
  //     experienceLevel: "entry",
  //     jobCategory: "Writing",
  //     budget: 50,
  //     duration: "2 weeks",
  //     numberOfFreelancers: 1,
  //     skills: ["Writing", "SEO", "Blogging"],
  //   },
  //   {
  //     title: "Cybersecurity Analyst",
  //     description: "Looking for a cybersecurity analyst to perform vulnerability assessments and improve our security protocols.",
  //     projectType: "ongoing",
  //     experienceLevel: "expert",
  //     jobCategory: "Cybersecurity",
  //     budget: 400,
  //     duration: "3 months",
  //     numberOfFreelancers: 1,
  //     skills: ["Penetration Testing", "Network Security", "Firewall Configuration"],
  //   }
  // ];

  const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/all-jobs`;

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        const { jobs } = response.data.data;  // Adjust according to actual response structure
        return jobs;
      } else {
        console.error('Failed to fetch jobs:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  };



  useEffect(() => {
    const getJobs = async () => {
      const fetchedJobs = await fetchAllJobs();
      setJobs(fetchedJobs);
    };

    getJobs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {jobs.map(job => <Job key={job.title} job={job} />)}
    </motion.div>
  )
}

export default JobsPage