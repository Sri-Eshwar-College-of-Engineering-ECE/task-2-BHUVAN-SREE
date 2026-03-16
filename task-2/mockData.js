// Mock data for the application

export const users = [
  {
    id: 1,
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    enrolledCourses: [1, 2]
  },
  {
    id: 2,
    name: 'Jane Teacher',
    email: 'teacher@example.com',
    role: 'teacher',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    teachingCourses: [1, 3]
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://mui.com/static/images/avatar/3.jpg'
  }
];

export const courses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn React from scratch',
    teacher: 'Jane Teacher',
    category: 'Programming',
    duration: '8 weeks',
    enrolledStudents: 25,
    progress: 60,
    image: 'https://source.unsplash.com/random/800x600/?react',
    lessons: [
      { id: 1, title: 'Introduction to React', duration: '30 min', completed: true },
      { id: 2, title: 'Components and Props', duration: '45 min', completed: true },
      { id: 3, title: 'State and Lifecycle', duration: '50 min', completed: false },
      { id: 4, title: 'Hooks Overview', duration: '40 min', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Master JavaScript concepts',
    teacher: 'John Smith',
    category: 'Programming',
    duration: '6 weeks',
    enrolledStudents: 18,
    progress: 30,
    image: 'https://source.unsplash.com/random/800x600/?javascript',
    lessons: [
      { id: 1, title: 'Closures', duration: '35 min', completed: true },
      { id: 2, title: 'Prototypes', duration: '40 min', completed: false },
      { id: 3, title: 'Async/Await', duration: '45 min', completed: false }
    ]
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Learn design fundamentals',
    teacher: 'Jane Teacher',
    category: 'Design',
    duration: '4 weeks',
    enrolledStudents: 15,
    progress: 0,
    image: 'https://source.unsplash.com/random/800x600/?design',
    lessons: [
      { id: 1, title: 'Color Theory', duration: '30 min', completed: false },
      { id: 2, title: 'Typography', duration: '35 min', completed: false }
    ]
  },
  {
    id: 4,
    title: 'Python for Data Science',
    description: 'Learn Python for data analysis',
    teacher: 'Mike Johnson',
    category: 'Data Science',
    duration: '10 weeks',
    enrolledStudents: 32,
    progress: 0,
    image: 'https://source.unsplash.com/random/800x600/?python',
    lessons: [
      { id: 1, title: 'Python Basics', duration: '45 min', completed: false },
      { id: 2, title: 'NumPy', duration: '50 min', completed: false },
      { id: 3, title: 'Pandas', duration: '55 min', completed: false }
    ]
  }
];

export const announcements = [
  {
    id: 1,
    title: 'New Course Available',
    content: 'Check out our new React course!',
    date: '2024-01-15',
    author: 'Admin'
  },
  {
    id: 2,
    title: 'Maintenance Notice',
    content: 'System will be down for maintenance on Sunday',
    date: '2024-01-14',
    author: 'System'
  }
];

export const statistics = {
  student: {
    totalCourses: 2,
    completedCourses: 1,
    totalHours: 45,
    averageGrade: 85
  },
  teacher: {
    totalStudents: 40,
    activeCourses: 2,
    totalCourses: 3,
    averageRating: 4.5
  },
  admin: {
    totalUsers: 150,
    totalCourses: 25,
    activeStudents: 120,
    revenue: 25000
  }
};