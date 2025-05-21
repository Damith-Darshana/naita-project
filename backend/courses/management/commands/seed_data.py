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
            {"name": 'Engineering', 'description': 'Engineering and technical courses', 'icon': 'engineering'},
            {"name": 'Information Technology', 'description': 'IT and computing courses', 'icon': 'computer'},
            {"name": 'Business', 'description': 'Business management courses', 'icon': 'business'},
            {"name": 'Hospitality', 'description': 'Hotel and tourism courses', 'icon': 'hotel'},
            {"name": 'Construction', 'description': 'Building and construction courses', 'icon': 'construction'},
        ]
        
        for cat_data in categories:
            category, created = CourseCategory.objects.get_or_create(
                name=cat_data['name'],
                defaults={
                    'description': cat_data['description'],
                    'icon': cat_data['icon']
                }
            )
            if created:
                self.stdout.write(f"Created category: {category.name}")

        # Create sample training centers
        centers = [
            {
                'name': 'Colombo Main Center', 
                'location': 'Colombo',
                'address': '123 Colombo Main Road',
                'contact_number': '0112345678',
                'email': 'contact@colombomain.com',
                'google_map_link': 'https://maps.google.com/colombo'
            },
            {
                'name': 'Kandy Regional Center', 
                'location': 'Kandy',
                'address': '456 Kandy Central Road',
                'contact_number': '0812345678',
                'email': 'contact@kandyregional.com',
                'google_map_link': 'https://maps.google.com/kandy'
            },
            {
                'name': 'Galle District Center', 
                'location': 'Galle',
                'address': '789 Galle Fort Road',
                'contact_number': '0912345678',
                'email': 'contact@galledistrict.com',
                'google_map_link': 'https://maps.google.com/galle'
            },
        ]
        
        for center_data in centers:
            center, created = TrainingCenter.objects.get_or_create(
                name=center_data['name'],
                defaults=center_data
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
                'description': 'Fundamentals of electrical wiring for residential buildings',
                'duration': 3,
                'duration_unit': 'months',
                'fee': 15000.00,
                'registration_fee': 1000.00,
                'certification': 'NAITA Electrical Wiring Certificate',
                'districts': ['Colombo', 'Gampaha', 'Kalutara'],
                'features': ['Hands-on training', 'Industry recognized certification', 'Job placement assistance'],
                'content': [
                    {'title': 'Electrical Fundamentals', 'topics': ['Basic circuits', 'Safety procedures', 'Tools introduction']},
                    {'title': 'Residential Wiring', 'topics': ['Single phase wiring', 'Three phase wiring', 'Meter connections']},
                    {'title': 'Practical Applications', 'topics': ['Fault finding', 'Installation practice', 'Final assessment']}
                ],
                'requirements': ['O/L Mathematics', 'O/L Science', 'Basic English']
            },
            {
                'title': 'Web Development Fundamentals',
                'code': 'WDF-201',
                'category': it,
                'description': 'Introduction to HTML, CSS and JavaScript',
                'duration': 4,
                'duration_unit': 'months',
                'fee': 20000.00,
                'registration_fee': 1500.00,
                'certification': 'NAITA Web Development Certificate',
                'districts': ['Colombo', 'Kandy', 'Galle'],
                'features': ['Project-based learning', 'Portfolio development', 'Freelance training'],
                'content': [
                    {'title': 'HTML & CSS', 'topics': ['Basic tags', 'Styling', 'Layouts']},
                    {'title': 'JavaScript Basics', 'topics': ['Variables', 'Functions', 'DOM manipulation']},
                    {'title': 'Responsive Design', 'topics': ['Media queries', 'Flexbox', 'Bootstrap']}
                ],
                'requirements': ['Basic computer literacy', 'English language skills']
            },
            {
                'title': 'Advanced Python Programming',
                'code': 'APP-301',
                'category': it,
                'description': 'Advanced Python concepts and frameworks',
                'duration': 6,
                'duration_unit': 'months',
                'fee': 25000.00,
                'registration_fee': 2000.00,
                'certification': 'NAITA Advanced Python Certificate',
                'districts': ['Colombo', 'Kandy'],
                'features': ['Django framework', 'REST APIs', 'Database integration'],
                'content': [
                    {'title': 'Python Advanced', 'topics': ['OOP', 'Decorators', 'Generators']},
                    {'title': 'Django Framework', 'topics': ['Models', 'Views', 'Templates']},
                    {'title': 'APIs & Deployment', 'topics': ['REST Framework', 'Authentication', 'AWS Deployment']}
                ],
                'requirements': ['Basic Python knowledge', 'WDF-201 completion recommended']
            },
        ]

        for course_data in courses:
            course, created = Course.objects.get_or_create(
                code=course_data['code'],
                defaults=course_data
            )
            if created:
                self.stdout.write(f"Created course: {course.code} - {course.title}")

        # Create instructor
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

        self.stdout.write(self.style.SUCCESS("Successfully seeded NAITA sample data!"))