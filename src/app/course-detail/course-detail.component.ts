import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courseId!: number;  // We’ll use this to store the course ID from the URL
  course: any;         // Holds the course details (you can replace this with an actual service for fetching course data)
  videoPlayer: HTMLVideoElement | null = null;  // For managing the video player

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the courseId from the route params
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];  // Convert the course ID from string to number
      this.loadCourseDetails();  // Load course data using the courseId
    });
  }

  loadCourseDetails(): void {
    // Mock course data or fetch it from a service based on this.courseId
    this.course = {
      id: this.courseId,
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular framework.',
      videoUrl: 'https://path.to/video.mp4',  // Replace with actual video URL
      progress: 50  // User's progress in the course, as a percentage
    };

    // Initialize the video player once the course data is loaded
    this.videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
  }

  startVideo(): void {
    if (this.videoPlayer) {
      // Set the video to start from the user's saved progress
      const progressTime = (this.course.progress / 100) * this.videoPlayer.duration;
      this.videoPlayer.currentTime = progressTime;  // Start from where the user left off
      this.videoPlayer.play();  // Play the video
    }
  }
}
