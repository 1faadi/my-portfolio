import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I am a full stack developer fueled by a passion for crafting innovative and efficient web solutions. I bring together the power of Laravel on the backend and React on the frontend to create seamless, high-performing applications. From designing responsive interfaces with Tailwind CSS and Bootstrap 5 to optimizing databases with MySQL, I thrive on turning ideas into impactful digital experiences that not only meet but exceed user expectations.`;

export const ABOUT_TEXT = `I am a dedicated full stack developer specializing in building dynamic and scalable web applications. I excel in front-end technologies such as React, JavaScript, and jQuery, paired with strong back-end expertise in Laravel and MySQL. Proficient in using Bootstrap 5 and Tailwind CSS for responsive designs, I aim to deliver innovative solutions that enhance business performance and provide outstanding user experiences. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2023 - Present",
    role: "Associate Software Enginee",
    company: "BXTrack Solutions",
    description: `Contributed to the development and maintenance of web applications using Laravel, React, and MySQL. Assisted in designing and integrating RESTful APIs, ensuring smooth functionality. Collaborated with team members to meet project requirements and deadlines effectively.`,
    technologies: ["Javascript", "React.js", "Laravel", "API Integration"],
  },
  {
    year: "2022 - 2023",
    role: "Laravel Developer",
    company: "Brainiac Creative Solutions",
    description: `Developed web applications using Laravel, ensuring responsive designs. Optimized performance and implemented scalable solutions for various projects.`,
    technologies: ["HTML", "CSS", "JQuery", "PHP", "mySQL", "Laravel"],
  },
  // {
  //   year: "2021 - 2022",
  //   role: "Full Stack Developer",
  //   company: "Facebook",
  //   description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
  //   technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  // },
  // {
  //   year: "2020 - 2021",
  //   role: "Software Engineer",
  //   company: "Paypal",
  //   description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
  //   technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
  // },
];

export const PROJECTS = [
  {
    title: "Hospital Management System",
    image: project1,
    link: "https://github.com/1faadi/HospitalManagementSystem",
    description:
      "Fully functional hospital management system (Laravel). Just add your mail details in .env file to access Email Verification & Password Forgot.",
    technologies: ["HTML", "CSS", "Blade", "Laravel"],
  },
  {
    title: "Books Portal",
    image: project2,
    link: "https://github.com/1faadi/BooksPortal",
    description:
      "Developed a books portal using Laravel, featuring a user-friendly interface for browsing, adding, editing, and deleting books. Implemented CRUD functionality with MySQL database integration, allowing efficient management of book records.",
    technologies: ["HTML", "CSS", "Laravel", "MySQL"],
  },
  {
    title: "County Agency Local Staffing",
    image: project3,
    link: "https://github.com/umer-sheikh/county-laravel",
    description:
      "Developed a county agency management system to enable local staff to assign and monitor goals. The system allows for efficient tracking of progress, setting deadlines, and generating reports, ensuring accountability and improved workflow within the organization.",
    technologies: ["HTML", "CSS", "Javascript", "Laravel", "MySQL"],
  },
  // {
  //   title: "Blogging Platform",
  //   image: project4,
  //   link: "https://project1-link.com",
  //   description:
  //     "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
  //   technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
  // },
];

export const CONTACT = {
  address: "I-8/4 Islamabad ",
  phoneNo: "+92 304 1646924 ",
  email: "fahadnshuu1@gmail.com",
};
