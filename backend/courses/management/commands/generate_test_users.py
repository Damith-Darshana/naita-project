from django.core.management.base import BaseCommand
from users.models import User
from faker import Faker

class Command(BaseCommand):
    help = 'Generates test student users'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='Number of students to create')

    def handle(self, *args, **options):
        fake = Faker()
        for i in range(options['count']):
            User.objects.create_user(
                username=f'student{i+1}',
                password='testpass123',
                user_type=3,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                phone=fake.phone_number()[:15]
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {options["count"]} test students'))