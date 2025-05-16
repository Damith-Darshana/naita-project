from django.core.management.base import BaseCommand
from courses.models import CourseCategory, Course, TrainingCenter, CourseOffering
from users.models import User
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seeds the database with sample NAITA courses and categories'

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")
        
        # Create sample categories
        categories = [
            {'name': 'Engineering', 'description': 'Engineering and technical courses'},
            {'name': 'Information Technology', 'description': 'IT and computing courses'},
            {'name': 'Business', 'description': 'Business management courses'},
            {'name': 'Hospitality', 'description': 'Hotel and tourism courses'},
            {'name': 'Construction', 'description': 'Building and construction courses'},
        ]
        
        for cat_data in categories:
            category, created = CourseCategory.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            if created:
                self.stdout.write(f"Created category: {category.name}")

        # Create sample training centers
        centers = [
            {'name': 'Colombo Main Center', 'location': 'Colombo'},
            {'name': 'Kandy Regional Center', 'location': 'Kandy'},
            {'name': 'Galle District Center', 'location': 'Galle'},
        ]
        
        for center_data in centers:
            center, created = TrainingCenter.objects.get_or_create(
                name=center_data['name'],
                defaults={
                    'location': center_data['location'],
                    'address': f"123 {center_data['location']} Main Road",
                    'contact_number': '0112345678',
                    'email': f"contact@{center_data['name'].lower().replace(' ', '')}.com"
                }
            )
            if created:
                self.stdout.write(f"Created center: {center.name}")

        # Create sample courses
        engineering = CourseCategory.objects.get(name='Engineering')
        it = CourseCategory.objects.get(name='Information Technology')
        colombo_center = TrainingCenter.objects.get(name='Colombo Main Center')
        
        courses = [
            {
                'title': 'Basic Electrical Wiring',
                'code': 'BEW-101',
                'category': engineering,
                'duration': 3,
                'duration_unit': 'months',
                'fee': 15000.00,
                'description': 'Fundamentals of electrical wiring for residential buildings',
            },
            {
                'title': 'Web Development Fundamentals',
                'code': 'WDF-201',
                'category': it,
                'duration': 4,
                'duration_unit': 'months',
                'fee': 20000.00,
                'description': 'Introduction to HTML, CSS and JavaScript',
            },
            {
                'title': 'Advanced Python Programming',
                'code': 'APP-301',
                'category': it,
                'duration': 6,
                'duration_unit': 'months',
                'fee': 25000.00,
                'description': 'Advanced Python concepts and frameworks',
            },
        ]
        
        for course_data in courses:
            course, created = Course.objects.get_or_create(
                code=course_data['code'],
                defaults=course_data
            )
            if created:
                self.stdout.write(f"Created course: {course.code} - {course.title}")

        # Create instructor if doesn't exist
        try:
            instructor = User.objects.get(username='instructor1')
            self.stdout.write(f"Instructor already exists: {instructor.username}")
        except User.DoesNotExist:
            instructor = User.objects.create_user(
                username='instructor1',
                password='temp123',
                user_type=2,  # Instructor
                first_name='John',
                last_name='Smith',
                email='instructor@naita.lk',
                phone='0771234567'
            )
            self.stdout.write(f"Created instructor: {instructor.username}")

        # Create course offerings
        offerings = [
            {
                'course': Course.objects.get(code='BEW-101'),
                'center': colombo_center,
                'start_date': date.today() + timedelta(days=30),
                'end_date': date.today() + timedelta(days=120),
                'instructor': instructor,
                'schedule': 'Mon, Wed, Fri 6-9 PM',
                'available_seats': 20
            },
            {
                'course': Course.objects.get(code='WDF-201'),
                'center': colombo_center,
                'start_date': date.today() + timedelta(days=45),
                'end_date': date.today() + timedelta(days=165),
                'instructor': instructor,
                'schedule': 'Tue, Thu 5-8 PM',
                'available_seats': 15
            },
        ]
        
        for offering_data in offerings:
            offering, created = CourseOffering.objects.get_or_create(
                course=offering_data['course'],
                center=offering_data['center'],
                start_date=offering_data['start_date'],
                defaults=offering_data
            )
            if created:
                self.stdout.write(f"Created offering for {offering.course.title} starting {offering.start_date}")

        self.stdout.write(self.style.SUCCESS('Successfully seeded NAITA sample data!'))