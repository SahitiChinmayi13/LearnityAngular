import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.css']
})
export class CourseVideoComponent implements OnInit {
  courseVideos: { [key: string]: any } = {
    'SLM001': {
      title: 'Strategic Leadership & Management',
      videos: [
        {
          title: 'Introduction to Strategic Leadership',
          url: 'assets/admincourse1.mp4'
        }
      ]
    },
    'BAE002': {
      title: 'Business Analytics for Executives',
      videos: [
        {
          title: 'Introduction to Business Analytics',
          url: 'assets/admincourse2.mp4'  // Add your second video file here
        }
      ]
    },
    'CFM003': {
      title: 'Corporate Finance Management',
      videos: [
        {
          title: 'Introduction to Corporate Finance',
          url: 'assets/admincourse3.mp4'  // Add your third video file here
        }
      ]
    }
  };

  currentCourse: any;
  currentVideo: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const courseId = params['id'];
      this.currentCourse = this.courseVideos[courseId];
      if (this.currentCourse && this.currentCourse.videos.length > 0) {
        this.setVideo(this.currentCourse.videos[0].url);
      }
    });
  }

  setVideo(url: string) {
    this.currentVideo = url;
    console.log('Playing video:', url);
  }
}