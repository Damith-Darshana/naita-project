import csv
from django.core.management.base import BaseCommand
from courses.models import Course

class Command(BaseCommand):
    help = 'Exports courses to CSV'

    def handle(self, *args, **options):
        with open('courses_export.csv', 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            # Updated header with new fields
            writer.writerow([
                'Code', 'Title', 'Category', 'Duration', 'Fee',
                'Description', 'Prerequisites', 'Learning Outcomes',
                'Certification', 'Is Active'
            ])
            
            for course in Course.objects.all():
                writer.writerow([
                    course.code,
                    course.title,
                    course.category.name if course.category else '',
                    f'{course.duration} {course.duration_unit}',
                    course.fee,
                    course.description,
                    course.prerequisites,
                    course.learning_outcomes,
                    course.certification,
                    course.is_active
                ])
        self.stdout.write(self.style.SUCCESS('Successfully exported courses to CSV'))