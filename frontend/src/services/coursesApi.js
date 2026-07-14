const starterCourses = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    code: 'CS201',
    description:
      'Learn arrays, linked lists, stacks, queues, trees, graphs, hashing, recursion, sorting, searching, and algorithm design.',
    duration: '16 Weeks',
    modules: 12,
    difficulty: 'Intermediate',
    progress: 68,
    semester: '4th',
    credits: 4,
    gpa: '3.4',
    instructor: 'Prof. Ananya Rao',
  },
  {
    id: 2,
    title: 'Operating Systems',
    code: 'CS301',
    description:
      'Study process management, CPU scheduling, memory management, deadlocks, synchronization, virtual memory, and file systems.',
    duration: '16 Weeks',
    modules: 10,
    difficulty: 'Intermediate',
    progress: 54,
    semester: '5th',
    credits: 4,
    gpa: '3.1',
    instructor: 'Prof. Daniel Kim',
  },
  {
    id: 3,
    title: 'Database Management Systems',
    code: 'CS302',
    description:
      'Learn ER models, SQL, normalization, transactions, indexing, functional dependency, and database design.',
    duration: '14 Weeks',
    modules: 11,
    difficulty: 'Intermediate',
    progress: 73,
    semester: '5th',
    credits: 4,
    gpa: '3.6',
    instructor: 'Prof. Nisha Verma',
  },
  {
    id: 4,
    title: 'Computer Networks',
    code: 'CS303',
    description:
      'Understand the OSI model, TCP/IP, routing, switching, HTTP, DNS, wireless communication, and network security.',
    duration: '15 Weeks',
    modules: 10,
    difficulty: 'Intermediate',
    progress: 41,
    semester: '6th',
    credits: 4,
    gpa: '3.0',
    instructor: 'Prof. Liam Carter',
  },
  {
    id: 5,
    title: 'Object-Oriented Programming',
    code: 'CS102',
    description:
      'Learn Java, OOP principles, inheritance, polymorphism, abstraction, encapsulation, interfaces, and exception handling.',
    duration: '14 Weeks',
    modules: 9,
    difficulty: 'Beginner',
    progress: 82,
    semester: '2nd',
    credits: 3,
    gpa: '3.8',
    instructor: 'Prof. Sara Thomas',
  },
  {
    id: 6,
    title: 'Software Engineering',
    code: 'CS401',
    description:
      'Learn software development life cycle, Agile, Scrum, UML, design patterns, testing, and project management.',
    duration: '15 Weeks',
    modules: 8,
    difficulty: 'Intermediate',
    progress: 63,
    semester: '7th',
    credits: 4,
    gpa: '3.3',
    instructor: 'Prof. Marcus Bell',
  },
]

export async function fetchCourses() {
  return starterCourses
}

export async function fetchCourseById(id) {
  const course = starterCourses.find((item) => item.id === Number(id))

  if (!course) {
    throw new Error('Unable to load the selected course.')
  }

  return course
}
