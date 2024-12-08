// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// interface CourseSection {
//   title: string;
//   lectures: string[];
// }

// interface CourseReview {
//   name: string;
//   rating: number;
//   comment: string;
//   avatar: string;
// }

// @Component({
//   selector: 'app-course-landing',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './course-landing.component.html',
//   styleUrl: './course-landing.component.css'
// })
// export class CourseLandingComponent implements OnInit {
//   course = {
//     title: 'Complete Web Development Masterclass',
//     description: 'A comprehensive course covering everything you need to become a full-stack web developer. Learn modern technologies and build real-world projects from scratch.',
//     instructor: 'John Doe',
//     rating: 4.7,
//     students: 15420,
//     duration: '32 hours',
//     level: 'Intermediate',
//     images: [
//       'https://programmerblog.net/wp-content/uploads/2021/02/what-is-front-end-development-3.png',
//       'https://miro.medium.com/v2/resize:fit:1200/0*z_DF_FSFt1maLKZi.png',
//       'https://d3mxt5v3yxgcsr.cloudfront.net/courses/7541/course_7541_image.jpg'
//     ],
//     videoUrl: '/assets/course-intro-video.mp4'
//   };

//   curriculum: CourseSection[] = [
//     {
//       title: 'Introduction to Web Development',
//       lectures: [
//         'Course Overview',
//         'Setting Up Development Environment',
//         'Understanding Web Technologies'
//       ]
//     },
//     {
//       title: 'HTML & CSS Fundamentals',
//       lectures: [
//         'HTML5 Semantic Structure',
//         'CSS Styling Techniques',
//         'Responsive Design Principles'
//       ]
//     },
//     {
//       title: 'JavaScript Essentials',
//       lectures: [
//         'JavaScript Basics',
//         'DOM Manipulation',
//         'Event Handling',
//         'Async Programming'
//       ]
//     },
//     {
//       title: 'Angular Framework',
//       lectures: [
//         'Angular Basics',
//         'Components & Modules',
//         'Services & Dependency Injection',
//         'Routing'
//       ]
//     }
//   ];

//   constructor() { }

//   ngOnInit(): void { }

//   startLearning(): void {
//     console.log('Starting course...');
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface CourseSection {
  title: string;
  lectures: string[];
  duration?: string;
}

interface SimilarCourse {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  thumbnail: string;
  price: number;
}

interface CourseReview {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

@Component({
  selector: 'app-course-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-landing.component.html',
  styleUrl: './course-landing.component.css'
})
export class CourseLandingComponent implements OnInit {
  course = {
    title: 'Complete Web Development Masterclass',
    description: 'A comprehensive course covering everything you need to become a full-stack web developer. Learn modern technologies and build real-world projects from scratch.',
    longDescription: `
      Embark on a transformative journey into web development with our comprehensive Masterclass. This course is meticulously designed to take you from a beginner to a professional web developer, equipping you with in-demand skills in the ever-evolving digital landscape.

      Key Learning Outcomes:
      • Master full-stack web development from scratch
      • Build 5+ real-world projects for your professional portfolio
      • Learn industry-standard technologies and best practices
      • Gain hands-on experience with modern web frameworks
      • Understand both front-end and back-end development principles

      What Sets This Course Apart:
      • Taught by industry professionals with 10+ years of experience
      • Comprehensive curriculum covering all essential web technologies
      • Interactive coding challenges and project-based learning
      • Lifetime access to course materials and updates
      • Career guidance and job preparation resources
    `,
    keyHighlights: [
      'Complete Full-Stack Development Training',
      '32 Hours of Hands-on Video Content',
      'Real-World Project Implementations',
      'Lifetime Course Access',
      'Certificate of Completion'
    ],
    instructor: 'John Doe',
    instructorBio: 'Senior Web Development Architect with 15+ years of experience in building scalable web applications. Previously led development teams at Google and Netflix.',
    rating: 4.7,
    students: 15420,
    duration: '32 hours',
    level: 'Intermediate',
    price: 49.99,
    discountedPrice: 19.99,
    images: [
      'https://programmerblog.net/wp-content/uploads/2021/02/what-is-front-end-development-3.png',
      'https://miro.medium.com/v2/resize:fit:1200/0*z_DF_FSFt1maLKZi.png',
      'https://d3mxt5v3yxgcsr.cloudfront.net/courses/7541/course_7541_image.jpg'
    ],
    videoUrl: '/assets/course-intro-video.mp4'
  };

  curriculum: CourseSection[] = [
    {
      title: 'Introduction to Web Development',
      duration: '2 hours',
      lectures: [
        'Course Overview',
        'Setting Up Development Environment',
        'Understanding Web Technologies',
        'Modern Web Landscape Overview'
      ]
    },
    {
      title: 'HTML & CSS Fundamentals',
      duration: '5 hours',
      lectures: [
        'HTML5 Semantic Structure',
        'CSS Styling Techniques',
        'Responsive Design Principles',
        'Flexbox and Grid Layouts',
        'CSS Preprocessors Introduction'
      ]
    },
    {
      title: 'JavaScript Essentials',
      duration: '8 hours',
      lectures: [
        'JavaScript Basics',
        'DOM Manipulation',
        'Event Handling',
        'Async Programming',
        'ES6+ Features',
        'Error Handling and Debugging'
      ]
    },
    {
      title: 'Angular Framework',
      duration: '10 hours',
      lectures: [
        'Angular Basics',
        'Components & Modules',
        'Services & Dependency Injection',
        'Routing',
        'State Management',
        'Angular Forms',
        'HTTP Requests and Interceptors'
      ]
    },
    {
      title: 'Final Project Development',
      duration: '7 hours',
      lectures: [
        'Full-Stack Project Planning',
        'Backend Integration',
        'Deployment Strategies',
        'Performance Optimization',
        'Project Showcase and Review'
      ]
    }
  ];

  similarCourses: SimilarCourse[] = [
    {
      id: 1,
      title: 'React.js Complete Guide',
      instructor: 'Emily Wong',
      rating: 4.6,
      students: 12500,
      thumbnail: 'https://media.licdn.com/dms/image/D4D12AQF5LKYv_4CoYw/article-cover_image-shrink_600_2000/0/1695497781676?e=2147483647&v=beta&t=tteldlPjtNEDAZPN_r4TXLk8VBTpoJxPzGIBD88t4bg',
      price: 6744.99
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      instructor: 'Michael Chen',
      rating: 4.5,
      students: 9800,
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/0*8yleeYR1g-nLSHJj',
      price: 3339.99
    },
    {
      id: 3,
      title: 'Full-Stack JavaScript Bootcamp',
      instructor: 'Sarah Rodriguez',
      rating: 4.8,
      students: 18200,
      thumbnail: 'https://www.spec-india.com/wp-content/uploads/2020/06/Full_Stack.png',
      price: 12559.99
    }
  ];

  courseReviews: CourseReview[] = [
    {
      name: 'Alex Thompson',
      rating: 5,
      comment: 'Incredible course! Transformed my coding skills from beginner to professional level.',
      avatar: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      date: '2 weeks ago'
    },
    {
      name: 'Jessica Liu',
      rating: 4.5,
      comment: 'Comprehensive and well-structured. The projects are challenging and realistic.',
      avatar: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      date: '1 month ago'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  startLearning(): void {
    // Navigate to first lecture or learning platform
    console.log('Starting course...');
  }

  enrollCourse(): void {
    // Handle course enrollment logic
    console.log('Enrolling in course...');
  }
}