from django.core.management.base import BaseCommand
from courses.models import Course, CourseOffering
from datetime import date
import csv

class Command(BaseCommand):
    help = 'Generates a CSV report of active courses and offerings'

    def add_arguments(self, parser):
        parser.add_argument(
            '-output',
            type=str,
            default='course_report.csv',
            help='Output file path'
        )

    def handle(self, *args, **options):
        output_path = options['output']
        with open(output_path, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([
                'Course Code', 'Course Title', 'Category',
                'Duration', 'Fee', 'Description', 'Certification',
                'Upcoming Offerings'
            ])

            for course in Course.objects.filter(is_active=True):
                upcoming = CourseOffering.objects.filter(
                    course=course,
                    start_date__gte=date.today()
                ).count()

                writer.writerow([
                    course.code,
                    course.title,
                    course.category.name if course.category else '',
                    f"{course.duration} {course.duration_unit}",
                    course.fee,
                    course.description[:100] + '...' if course.description else '',  # Truncate long description
                    course.certification,
                    upcoming
                ])

        self.stdout.write(self.style.SUCCESS(
            f"Successfully generated report at {output_path}"
        ))