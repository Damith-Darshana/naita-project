from django.core.management.base import BaseCommand
from courses.models import CourseOffering
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Deactivates old course offerings'

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=30,
            help='Deactivate offerings ended more than X days ago'
        )

    def handle(self, *args, **options):
        threshold = date.today() - timedelta(days=options['days'])
        count = CourseOffering.objects.filter(
            end_date__lt=threshold,
            is_active=True
        ).update(is_active=False)
        
        self.stdout.write(self.style.SUCCESS(
            f"Deactivated {count} old course offerings"
        ))